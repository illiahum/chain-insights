import * as d3 from "d3";

export const useNetworkChart = () => {
  function flatten(root) {
    let colors = ["gold", "peach", "salad", "sky", "lavanda", "pink"];

    const typesColors = {};
    const nodes = [];
    const links = [];

    function recurse(node, parent = null) {
      nodes.push({
        id: node.name,
        label: node.name,
        type: node.type,
        value: node.value,
        data: node.data,
      });

      if (!typesColors.hasOwnProperty(node.type)) {
        typesColors[node.type] = colors.shift();
      }

      if (parent) {
        links.push({
          source: parent.name,
          target: node.name,
          relationType: node.relationType,
        });
      }
      if (node.nodes) {
        node.nodes.forEach((child) => recurse(child, node));
      }
    }

    recurse(root);
    return { nodes, links, typesColors };
  }

  function createChart(
    chartData,
    chartElement,
    width = 442,
    height = 274,
    config = {}
  ) {
    const colors = {
      gold: "#AE9D71",
      peach: "#AE7171",
      salad: "#86AE71",
      sky: "#71AEA7",
      lavanda: "#717BAE",
      pink: "#9E71AE",
    };

    const { nodes, links, typesColors } = flatten(chartData);

    let gLink, gNode;
    let simulation = null;

    const svgSel = d3
      .select(chartElement)
      .attr("viewBox", `0 0 ${width} ${height}`)
      .attr("preserveAspectRatio", "xMidYMid meet");

    // root group for pan/zoom
    const root = svgSel.append("g");

    // links and nodes groups
    gLink = root.append("g").attr("class", "links");
    gNode = root.append("g").attr("class", "nodes");

    // scales
    const valueExtent = d3.extent(nodes, (d) => d.value ?? 1);
    const radius = d3
      .scaleSqrt()
      .domain(valueExtent[0] == null ? [1, 1] : valueExtent)
      .range([64, 128]);

    function radiusRound(d) {
      const r = radius(d);

      return Math.round(r / 24) * 24;
    }

    // simulation
    simulation = d3
      .forceSimulation(nodes)
      .force(
        "link",
        d3
          .forceLink(links)
          .id((d) => d.id)
          .distance((d) => d.distance ?? 120)
          .strength(1.5)
      )
      .force("charge", d3.forceManyBody().strength(-260))
      .force("center", d3.forceCenter(width / 2, height / 2))
      .force(
        "collision",
        d3.forceCollide().radius((d) => radiusRound(d.value) + 45)
      );

    // draw links
    const link = gLink
      .selectAll("line")
      .data(links)
      .enter()
      .append("line")
      .attr("stroke-width", (d) => Math.max(1, d.width ?? 1))
      .attr("stroke-dasharray", (d) => {
        if (d.relationType == "indirect") {
          return "1 4";
        }

        return "";
      })
      .attr("stroke", "#fff")
      .attr("stroke-opacity", 0.5);

    // node groups (g) with circle + text
    let nodeData = null;
    const node = gNode
      .selectAll("g.node")
      .data(nodes, (d) => d.id)
      .enter()
      .append("g")
      .attr("class", "node")
      .attr("data-info", (d) => JSON.stringify(d.data));

    node
      .append("circle")
      .attr("r", (d) => radiusRound(d.value))
      .attr("fill", "#18181A");

    node
      .append("circle")
      .attr("r", (d) => radiusRound(d.value))
      .attr("fill", (d) => colors[typesColors[d.type]])
      .attr("fill-opacity", "0.3")
      .attr("stroke", "#fff")
      .attr("stroke-width", 1)
      .attr("stroke-opacity", 0.2);

    node
      .append("circle")
      .attr("r", (d) => radiusRound(d.value))
      .attr("fill", "url('#buble_radial')")
      .attr("fill-opacity", "0.1");

    node
      .append("circle")
      .attr("r", (d) => radiusRound(d.value))
      .attr("fill", "url('#buble_linear')")
      .attr("fill-opacity", "0.3");

    node
      .append("text")
      .attr("text-anchor", "middle")
      .attr("dominant-baseline", "central")
      .style("pointer-events", "none")
      .style("font-family", "Inter, sans-serif")
      .style("font-size", "12px")
      .style("fill", "#fff")
      .each(function (d) {
        const words = String(d.label ?? d.id).split(/\s+/);
        const lineHeight = 1.1;
        const maxChars = 12;
        let lines = [];
        let cur = "";
        for (const w of words) {
          if ((cur + " " + w).trim().length > maxChars) {
            if (cur) lines.push(cur.trim());
            cur = w;
          } else {
            cur = (cur + " " + w).trim();
          }
        }
        if (cur) lines.push(cur.trim());

        const text = d3.select(this);
        for (let i = 0; i < lines.length; i++) {
          text
            .append("tspan")
            .attr("x", 0)
            .attr("dy", i === 0 ? "0em" : `${lineHeight}em`)
            .text(lines[i]);
        }
      })
      .style("font-size", (d) => Math.max(10, radius(d.value) / 3) + "px");

    node.append("title").text((d) => d.title ?? d.label ?? d.id);

    simulation.on("tick", () => {
      link
        .attr("x1", (d) => d.source.x)
        .attr("y1", (d) => d.source.y)
        .attr("x2", (d) => d.target.x)
        .attr("y2", (d) => d.target.y);

      node.attr("transform", (d) => `translate(${d.x},${d.y})`);
    });
  }

  function updateChart(svgElement, chatBox, viewport, viewportChart) {
    const svgSel = d3.select(svgElement);
    const svgElementRoot = svgSel.select("g");

    const viewportChartSel = d3.select(viewportChart);
    const viewportChartRoot = viewportChartSel.select("g");

    const width = chatBox.clientWidth;
    const height = chatBox.clientHeight;

    const bbox = svgElementRoot.node().getBBox();
    const graphCenterX = bbox.x + bbox.width / 2;
    const graphCenterY = bbox.y + bbox.height / 2;

    const svgCenterX = width / 2;
    const svgCenterY = height / 2;

    const scale = Math.min(width / bbox.width, height / bbox.height) * 2;

    const tx = svgCenterX - graphCenterX * scale;

    const svgWidth = svgElement.querySelector("svg").clientWidth;

    const zoom = d3
      .zoom()
      .scaleExtent([0.1, 4])
      .on("zoom", (event) => {
        const scale = event.transform.k;
        const tx = event.transform.x;
        const ty = event.transform.y;

        const transform = d3.zoomIdentity.translate(tx, ty).scale(scale);

        const viewX = (220 * -tx) / svgWidth;

        d3.select(viewport).style("left", viewX + "px");
        //.style("width", viewWidth * 0.1 + "px");

        svgElementRoot.attr("transform", transform);
      });

    svgSel.call(zoom);

    const initialTransform = d3.zoomIdentity.translate(tx, 0).scale(scale);
    svgSel.call(zoom.transform, initialTransform);

    const initialViewportTransform = (220 * tx) / svgWidth;
    viewportChartRoot.attr(
      "transform",
      `translate(${initialViewportTransform}px, 0)`
    );

    let currentTransform = d3.zoomIdentity;
    const zoomStep = 0.2;

    function zoomIn() {
      const newScale = Math.min(currentTransform.k + zoomStep, 4);
      const transform = d3.zoomIdentity
        .translate(currentTransform.x, currentTransform.y)
        .scale(newScale);

      svgSel.call(zoom.transform, transform);
    }

    function zoomOut() {
      const newScale = Math.max(currentTransform.k - zoomStep, 0.1);
      const transform = d3.zoomIdentity
        .translate(currentTransform.x, currentTransform.y)
        .scale(newScale);

      svgSel.call(zoom.transform, transform);
    }

    return { zoomIn, zoomOut };
  }

  return {
    flatten,
    createChart,
    updateChart,
  };
};
