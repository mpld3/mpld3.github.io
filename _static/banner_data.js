

var banner_data = [{"title": "", "url": "examples/mpld3_logo.html", "thumb": "_images/mpld3_logo.png"}, {"title": "", "url": "examples/heart_path.html", "thumb": "_images/heart_path.png"}, {"title": "", "url": "examples/linked_brush.html", "thumb": "_images/linked_brush.png"}, {"title": "", "url": "examples/networkxd3forcelayout.html", "thumb": "_images/networkxd3forcelayout.png"}, {"title": "", "url": "examples/html_tooltips.html", "thumb": "_images/html_tooltips.png"}, {"title": "", "url": "examples/drag_points.html", "thumb": "_images/drag_points.png"}, {"title": "", "url": "examples/random_walk.html", "thumb": "_images/random_walk.png"}, {"title": "", "url": "examples/custom_plugin.html", "thumb": "_images/custom_plugin.png"}, {"title": "", "url": "examples/scatter_tooltip.html", "thumb": "_images/scatter_tooltip.png"}, {"title": "", "url": "examples/mouse_position.html", "thumb": "_images/mouse_position.png"}, {"title": "", "url": "examples/interactive_legend.html", "thumb": "_images/interactive_legend.png"}];

banner_data.forEach(function(d, i) {
  d.i = i;
});

var height = 150,
    width = 900,
    imageHeight = 150,
    imageWidth = 150,
    zoomfactor = 0.1;

var banner = d3.select(".example-banner");

banner.style("height", height + "px")
      .style("width", width + "px")
      .style("margin-left", "auto")
      .style("margin-right", "auto");

var svg = banner.append("svg")
                .attr("width", width + "px")
                .attr("height", height + "px");

var anchor = svg.append("g")
                  .attr("class", "example-anchor")
                .selectAll("a")
                .data(banner_data.slice(0, 7));

anchor.exit().remove();

var anchor_elements = anchor.enter().append("a")
      .attr("xlink:href", function(d) { return d.url; })
      .attr("xlink:title", function(d) { return d.title; });

anchor_elements.append("svg:image")
      .attr("width", (1 - zoomfactor) * imageWidth)
      .attr("height", (1 - zoomfactor) * imageHeight)
      .attr("xlink:href", function(d){ return d.thumb; })
      .attr("xroot", function(d){return d3.round(imageWidth * (d.i - 0.5));})
      .attr("x", function(d){return d3.round(imageWidth * (d.i - 0.5));})
      .attr("y", d3.round(0.5 * zoomfactor * imageHeight))
      .attr("i", function(d){return d.i;})
     .on("mouseover", function() {
              var img = d3.select(this);
              img.transition()
                    .attr("width", imageWidth)
                    .attr("height", height)
                    .attr("x", img.attr("xroot")
                               - d3.round(0.5 * zoomfactor * imageWidth))
                    .attr("y", 0);
              })
     .on("mouseout", function() {
              var img = d3.select(this);
              img.transition()
                    .attr("width", (1 - zoomfactor) * imageWidth)
                    .attr("height", (1 - zoomfactor) * height)
                    .attr("x", img.attr("xroot"))
                    .attr("y", d3.round(0.5 * zoomfactor * imageHeight));
              });
