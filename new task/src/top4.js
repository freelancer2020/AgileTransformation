import React, { Component } from 'react';
import * as am4core from "@amcharts/amcharts4/core";
import * as am4maps from "@amcharts/amcharts4/maps";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";
import am4geodata_worldLow from "@amcharts/amcharts4-geodata/worldLow";

am4core.useTheme(am4themes_animated);
class Top4 extends Component {
    state = {  }

    componentDidMount() {
        let chart = am4core.create("chartdiv4", am4maps.MapChart);
    
        // Set map definition
chart.geodata = am4geodata_worldLow;

// Set projection
chart.projection = new am4maps.projections.Miller();

// Create map polygon series
var polygonSeries = chart.series.push(new am4maps.MapPolygonSeries());

// Exclude Antartica
polygonSeries.exclude = ["AQ"];

// Make map load polygon (like country names) data from GeoJSON
polygonSeries.useGeodata = true;

// Configure series
var polygonTemplate = polygonSeries.mapPolygons.template;
polygonTemplate.tooltipText = "{name}";
polygonTemplate.fill = am4core.color("lightgrey");

// Create hover state and set alternative fill color
var hs = polygonTemplate.states.create("hover");
hs.properties.fill = am4core.color("#367B25");

// Create active state
var as = polygonTemplate.states.create("active");
as.properties.fill = am4core.color("#7B3625");

// Pre-zoom to a list of countries
var zoomTo = [this.props.country];
chart.events.on("ready", function(ev) {
  
  // Init extrems
  var north, south, west, east;
  
  // Find extreme coordinates for all pre-zoom countries
  for(var i = 0; i < zoomTo.length; i++) {
    var country = polygonSeries.getPolygonById(zoomTo[i]);
    if (north === undefined || (country.north > north)) {
      north = country.north;
    }
    if (south === undefined || (country.south < south)) {
      south = country.south;
    }
    if (west === undefined || (country.west < west)) {
      west = country.west;
    }
    if (east === undefined || (country.east > east)) {
      east = country.east;
    }
    
    country.isActive = true;
  }
  
  // Pre-zoom
  chart.zoomToRectangle(north, east, south, west, 1, true);


});
    
        this.chart = chart;
      }


      componentWillUnmount() {
        if (this.chart) {
          this.chart.dispose();
        }
      }
    
    render() { 
        return(
        <div className="chartdiv4"></div>
        );
    }
}
 
export default Top4;