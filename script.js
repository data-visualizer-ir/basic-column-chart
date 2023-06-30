

// --------------------------------------------------------
// (1) Define Variables
// --------------------------------------------------------

// 
var rootElement = "#my_dataviz";
var api = "https://raw.githubusercontent.com/holtzy/data_to_viz/master/Example_dataset/7_OneCatOneNum_header.csv"


//
var svg_width = 460
var svg_height = 400

const margin = {
    top: 30, 
    right: 30, 
    bottom: 70, 
    left: 60
}

var width = svg_width - (margin.left + margin.right)
var height = svg_height - (margin.top + margin.bottom)


// --------------------------------------------------------
// (2) Fetch Data from API
// --------------------------------------------------------


d3.csv(api).then(data => createColumnChart(data))


// --------------------------------------------------------
// (3) Create Column Chart
// --------------------------------------------------------

function createColumnChart(data) {


    // --------------------------------------
    // (31) create the main SVG tag
    // --------------------------------------

    const svg = d3.select(rootElement)
                .append("svg") 
                    .attr("width", svg_width)
                    .attr("height", svg_height)
                .append("g")
                    .attr("transform", `translate(${margin.left}, ${margin.top})`);

    // --------------------------------------
    // (32) create X-Axis of the SVG
    // --------------------------------------

    // (321) create axis 
    const x = d3.scaleBand()
        .domain(data.map(d => d.Country))
        .range([ 0, width ])
        .padding(0.2);

    // (322) append the axis to the main svg 
    svg.append("g") 
      .attr("transform", `translate(0, ${height})`)
      .call(d3.axisBottom(x))
      .selectAll("text")
        .attr("transform", "translate(-10,0)rotate(-45)")
        .style("text-anchor", "end");
    
        
    // --------------------------------------
    // (33) create Y-Axis of the SVG
    // --------------------------------------
    
    // (331) create axis 
    const y = d3.scaleLinear()
      .domain([0, 13000])
      .range([ height, 0]);

    // (332) append the axis to the main svg
    svg.append("g")
      .call(d3.axisLeft(y));
    
    // --------------------------------------
    // (33) create Rectangles of the SVG
    // --------------------------------------
    
    // create columns
    svg.selectAll()
      .data(data)
      .join("rect")
        .attr("x", d => x(d.Country))
        .attr("y", d => y(d.Value))
        .attr("width", x.bandwidth())
        .attr("height", d => height - y(d.Value))
        .attr("fill", "#69b3a2")
    

}