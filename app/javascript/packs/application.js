// This file is automatically compiled by Webpack, along with any other files
// present in this directory. You're encouraged to place your actual application logic in
// a relevant structure within app/javascript and only use these pack files to reference
// that code so it'll be compiled.

require("@rails/ujs").start()
// require("turbolinks").start()
require("@rails/activestorage").start()
require("channels");
require("jquery")

// Uncomment to copy all static images under ../images to the output folder and reference
// them with the image_pack_tag helper in views (e.g <%= image_pack_tag 'rails.png' %>)
// or the `imagePath` JavaScript helper below.
//
// const images = require.context('../images', true)
// const imagePath = (name) => images(name, true)


// ajax call to load initial json
var loadData = function(){
    $.ajax({
      type: 'GET',
      contentType: 'application/json; charset=utf-8',
      url: '/votes',
      dataType: 'json',
      success: function(data){
        drawBarPlot(data);
      },
      failure: function(result){
        error();
      }
    });
  };

// ajax call to refresh json
var updateData = function(){
    $.ajax({
      type: 'GET',
      contentType: 'application/json; charset=utf-8',
      url: '/votes',
      dataType: 'json',
      success: function(data){
        updatePage(data);
      },
      failure: function(result){
          console.log('error');
        error();
      }
    });
  };


function error() {
    console.log("Something went wrong!");
}

// set plot parameters
var barWidth = 20;
var colors = ['red', 'blue'];
var plotHeight = 300;

// draw bar plot
function drawBarPlot(data){

// define linear y-axis scale
var yScale = d3.scale.linear()
     .domain([0, d3.max(data)])
     .range([0, (plotHeight - 50)]);

d3.select("#plot")
.selectAll("rect")
.data(data)
.enter()
.append("rect")
.attr("width", barWidth)
.attr("height", function(d){ return yScale(d); })
.attr("fill", function(d, i) {
return colors[i];
})
.attr("x", function(d, i){
return (i * 100) + 90; // horizontal location of bars
})
.attr("y", function(d){ 
return plotHeight - yScale(d); // scale bars within plotting area
});
}
// define updateBarPlot() function
function updateBarPlot(data){

    var yScale = d3.scale.linear()
                   .domain([0, d3.max(data)])
                   .range([0, (plotHeight - 50)]);
  
    d3.select("#plot")
      .selectAll("rect")
      .data(data)
      .transition()
      .attr("height", function(d){ return yScale(d); })
      .attr("y", function(d){
          return plotHeight - yScale(d);
      });
  }

  // update vote counters 
function updateVoteCounters(data){
    $("#red-count").html(data[0]);
    $("#blue-count").html(data[1]);
  }
  
  // update page (plot and counters)
  function updatePage(data){
    updateBarPlot(data);
    updateVoteCounters(data);
  }
  

// load data on page load
$(document).ready(function(){ 
loadData(); 
setInterval(function(){
    updateData();
  }, 3000); 
}); 
