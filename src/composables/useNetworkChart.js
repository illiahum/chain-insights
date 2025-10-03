import * as d3 from "d3";

export const useNetworkChart = () => {
  function flatten(root) {
    let colors = ["gold", "peach", "salad", "sky", "lavanda", "pink"];

    const typesColors = {};
    const nodes = root.objects;
    const links = root.links;

    nodes.forEach((node) => {
      if (!typesColors.hasOwnProperty(node.type)) {
        typesColors[node.type] = colors.shift();
      }
    });

    return { nodes, links, typesColors };
  }

  function createChart(
    chartData,
    chartElement,
    isRenderingVar,
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
      .range([12, 32]);

    function radiusRound(d) {
      const r = radius(d);

      return Math.round(r / 4) * 2;
    }

    // simulation
    simulation = d3
      .forceSimulation(nodes)
      .force(
        "link",
        d3
          .forceLink(links)
          .id((d) => d.id)
          .distance((d) =>
            Math.max(
              100,
              radiusRound(d.source?.value ?? 1) +
                radiusRound(d.target?.value ?? 1) +
                20
            )
          )
      )
      .force("charge", d3.forceManyBody().strength(-30 - nodes.length / 20))
      .force("center", d3.forceCenter(width / 2, height / 2))
      .force(
        "collision",
        d3.forceCollide().radius((d) => radiusRound(d.value) + 40)
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
      .append("text")
      .attr("text-anchor", "middle")
      .attr("y", (d) => radiusRound(d.value) + 12)
      .style("pointer-events", "none")
      .style("font-family", "Inter, sans-serif")
      .style("font-size", (d) => Math.max(10, radiusRound(d.value) / 3) + "px")
      .style("fill", "#fff")
      .each(function (d) {
        const words = String(d.label ?? d.id).split(/\s+/);
        const maxChars = 12;
        const lineHeight = 1.1;
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
      });

    node.append("title").text((d) => d.title ?? d.label ?? d.id);

    simulation.alpha(1).restart();

    simulation.on("tick", () => {
      link
        .attr("x1", (d) => d.source.x)
        .attr("y1", (d) => d.source.y)
        .attr("x2", (d) => d.target.x)
        .attr("y2", (d) => d.target.y);

      node.attr("transform", (d) => `translate(${d.x},${d.y})`);
    });

    simulation.on("end", () => {
      const xExtent = d3.extent(nodes, (d) => d.x);
      const yExtent = d3.extent(nodes, (d) => d.y);

      const minX = xExtent[0] - 100;
      const maxX = xExtent[1] + 100;
      const minY = yExtent[0] - 100;
      const maxY = yExtent[1] + 100;

      const width = maxX - minX;
      const height = maxY - minY;

      svgSel.attr("viewBox", `${minX} ${minY} ${width} ${height}`);

      isRenderingVar.value = false;
    });
  }

  function updateChart(svgElement, chatBox, viewport, viewportChart) {
    const svgSel = d3.select(svgElement);
    const svgRoot = svgSel.select("g");

    const viewportChartSel = d3.select(viewportChart);
    const viewportRoot = viewportChartSel.select("g");

    const width = chatBox.clientWidth;
    const height = chatBox.clientHeight;

    // bounding box графа
    const bbox = svgRoot.node().getBBox();
    const graphCenterX = bbox.x + bbox.width / 2;
    const graphCenterY = bbox.y + bbox.height / 2;
    const svgCenterX = width / 2;
    const svgCenterY = height / 2;

    // початковий масштаб і трансляція
    const scale = Math.min(width / bbox.width, height / bbox.height) * 0.9;
    const initialTransform = d3.zoomIdentity
      .translate(
        svgCenterX - graphCenterX * scale,
        svgCenterY - graphCenterY * scale
      )
      .scale(scale);

    let currentTransform = initialTransform;

    const miniWidth = viewportChart.clientWidth;
    const miniHeight = viewportChart.clientHeight;

    const scaleX = miniWidth / bbox.width;
    const scaleY = miniHeight / bbox.height;
    const miniScale = Math.min(scaleX, scaleY);

    const zoom = d3
      .zoom()
      .scaleExtent([0.1, 24])
      .on("zoom", (event) => {
        currentTransform = event.transform;

        svgRoot.attr("transform", currentTransform);

        updateMiniViewport();
      });

    svgSel.call(zoom).call(zoom.transform, initialTransform);

    function updateMiniViewport() {
      const svgClientWidth = svgElement.clientWidth;
      const svgClientHeight = svgElement.clientHeight;

      const viewWidth = svgClientWidth / currentTransform.k;
      const viewHeight = svgClientHeight / currentTransform.k;

      const viewX = -currentTransform.x / currentTransform.k;
      const viewY = -currentTransform.y / currentTransform.k;

      d3.select(viewport)
        .style("left", viewX * miniScale + "px")
        .style("top", viewY * miniScale + "px")
        .style("width", viewWidth * miniScale + "px")
        .style("height", viewHeight * miniScale + "px");
    }

    updateMiniViewport();

    const zoomStep = 0.2;

    function zoomIn() {
      const newScale = Math.min(currentTransform.k + zoomStep, 24);
      const transform = d3.zoomIdentity
        .translate(currentTransform.x, currentTransform.y)
        .scale(newScale);
      svgSel.transition().duration(200).call(zoom.transform, transform);
    }

    function zoomOut() {
      const newScale = Math.max(currentTransform.k - zoomStep, 0.1);
      const transform = d3.zoomIdentity
        .translate(currentTransform.x, currentTransform.y)
        .scale(newScale);
      svgSel.transition().duration(200).call(zoom.transform, transform);
    }

    return { zoomIn, zoomOut };
  }

  return {
    flatten,
    createChart,
    updateChart,
  };
};
