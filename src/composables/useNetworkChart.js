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

  function createChart(chartData, chartElement, width = 442, height = 274) {
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
      .attr("preserveAspectRatio", "xMidYMid meet")
      .style("width", "100%")
      .style("height", "100%");

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
      .range([32, 48]);

    const color = d3.scaleOrdinal(d3.schemeTableau10);

    // simulation
    simulation = d3
      .forceSimulation(nodes)
      .force(
        "link",
        d3
          .forceLink(links)
          .id((d) => d.id)
          .distance((d) => d.distance ?? 120)
          .strength(2)
      )
      .force("charge", d3.forceManyBody().strength(-120))
      .force("center", d3.forceCenter(width / 2, height / 2))
      .force(
        "collision",
        d3.forceCollide().radius((d) => radius(d.value) + 8)
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
    const node = gNode
      .selectAll("g.node")
      .data(nodes, (d) => d.id)
      .enter()
      .append("g")
      .attr("class", "node");

    node
      .append("circle")
      .attr("r", (d) => radius(d.value))
      .attr("fill", "#18181A");

    node
      .append("circle")
      .attr("r", (d) => radius(d.value))
      .attr("fill", (d) => colors[typesColors[d.type]])
      .attr("fill-opacity", "0.3")
      .attr("stroke", "#fff")
      .attr("stroke-width", 1)
      .attr("stroke-opacity", 0.2);

    node
      .append("circle")
      .attr("r", (d) => radius(d.value))
      .attr("fill", "url('#buble_radial')")
      .attr("fill-opacity", "0.1");

    node
      .append("circle")
      .attr("r", (d) => radius(d.value))
      .attr("fill", "url('#buble_linear')")
      .attr("fill-opacity", "0.3");

    // center text using tspans for simple wrapping
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
        const lineHeight = 1.1; // em
        const maxChars = 12; // naive wrap limit per line
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

    // tooltip (title) fallback
    node.append("title").text((d) => d.title ?? d.label ?? d.id);

    simulation.on("tick", () => {
      link
        .attr("x1", (d) => d.source.x)
        .attr("y1", (d) => d.source.y)
        .attr("x2", (d) => d.target.x)
        .attr("y2", (d) => d.target.y);

      node.attr("transform", (d) => `translate(${d.x},${d.y})`);
    });

    // zoom
    // zoomBehavior = d3
    //   .zoom()
    //   .scaleExtent([0.2, 4])
    //   .on("zoom", (event) => {
    //     root.attr("transform", event.transform);
    //   });

    //svgSel.call(zoomBehavior);

    // double-click to center and zoom
    //svgSel.on("dblclick.zoom", null);
    // svgSel.on("dblclick", (event) => {
    //   const [mx, my] = d3.pointer(event);
    //   svgSel
    //     .transition()
    //     .duration(600)
    //     .call(
    //       zoomBehavior.transform,
    //       d3.zoomIdentity.translate(width / 2 - mx, height / 2 - my).scale(1.2)
    //     );
    // });
  }

  return {
    flatten,
    createChart,
  };
};
