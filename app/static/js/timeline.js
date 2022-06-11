console.log("inside timeline js")
const config = {
  width: 580,
  barHeight: 100,
  barWidth: 6,
  barGap: 5,
  barRadius: 4,
  lang: "tr",
  min: new Date(2004, 11, 24).valueOf(),
  max: new Date(2017, 11, 24).valueOf(),
  prettify: function (ts) {
    return new Date(ts).toLocaleDateString("en", {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  }
};

// x scale for time
var x = d3.scaleTime()
    .domain([config.min, config.max])
    .range([0, config.width])
    .clamp(true);

// y scale for histogram
var y = d3.scaleLinear()
    .range([config.barHeight, 0]);

////////// histogram set up //////////
var histogram = d3.histogram()
    .value(d => d.date)
    .domain(x.domain())
    .thresholds(config.width/(config.barWidth+config.barGap));
console.log(histogram)

var svg = d3.select("#histview")
    .append("svg")
    .attr("width", config.width)
    .attr("height", config.barHeight);
console.log(svg)
var hist = svg.append("g")
    .attr("class", "histogram");

d3.csv("https://gist.githubusercontent.com/oguzhaninan/ae7466169c06d9c145e028ff398b6eb3/raw/be32fbc76953c349c9c695e98a69f1a46d775375/example.csv", prepare, function(data) {
  console.log("Got the data");
  // group data for bars
  var bins = histogram(data);

  // y domain based on binned data
  y.domain([0, d3.max(bins, d => d.length)]);

  var bar = hist.selectAll(".bar")
      .data(bins)
      .enter()
      .append("g")
      .attr("class", "bar")
      .attr("transform", d => `translate(${x(d.x0)}, ${y(d.length)})`);

  bar.append("rect")
      .attr("class", "bar")
      .attr("x", 1)
      .attr("rx", config.barRadius)
      .attr("width", config.barWidth)
      .attr("height", d => config.barHeight - y(d.length))
      .attr("fill", '#0091ff');
});

var parseDate = d3.timeParse("%d-%b-%y");
function prepare(d) {
  d.date = parseDate(d.date);
  d.value = +d.value;
  return d;
}

$("#slider").ionRangeSlider({
  skin: "round",
  type: "single",
  step: 1,
  min: config.min,
  max: config.max,
  force_edges: true,
  drag_interval: true,
  prettify: config.prettify,
  onChange: function(val) {
    d3.selectAll(".bar")
      .attr("fill", d => d.x0 < val.to && d.x0 > val.from ? '#0091ff' : '#d8d8d8');
    if (config.onChange) {
      config.onChange(val);
    }
  }
});

