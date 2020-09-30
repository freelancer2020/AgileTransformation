'use strict';

// test task........
const container = document.getElementById('con'); // Map container background.

// Themes begin
am4core.useTheme(am4themes_animated);
// Themes end

// Create map instance
var chart = am4core.create(container, am4maps.MapChart);

//Top five countries
var mapData = [
  
  {"id": "US", "name": "USA", "value": 5, "color": "red", "loca": "green", "altra": "royalblue"},
  {"id": "GB", "name": "UK", "value": 5, "color": "black", "altra": "royalblue"},
  {"id": "AU", "name": "Australia", "value": 5, "color": "black", "altra": "royalblue"},
  {"id": "JP", "name": "Japan", "value": 5, "color": "black", "altra": "royalblue" },
  {"id": "DE", "name": "Germany", "value": 5, "color": "black", "altra": "royalblue" },

  {"id": "IT", "name": "Italy", "value": 5, "color": "black", "altra": "royalblue" },
  {"id": "ES", "name": "Spain", "value": 5, "color": "black", "altra": "royalblue" },
  {"id": "CA", "name": "Canada", "value": 5, "color": "black", "altra": "royalblue" },
  {"id": "FR", "name": "France", "value": 5, "color": "black", "altra": "royalblue" },
  {"id": "IN", "name": "India", "value": 5, "color": "black", "altra": "royalblue" },

  {"id": "BR", "name": "Brazil", "value": 5, "color": "black", "altra": "royalblue" },
  {"id": "SG", "name": "Singapore", "value": 5, "color": "black", "altra": "royalblue" },
  {"id": "CN", "name": "China/Mainland", "value": 5, "color": "black", "altra": "royalblue" },
  {"id": "NL", "name": "Netherland", "value": 5, "color": "black", "altra": "royalblue" },
  {"id": "CH", "name": "Switzerland", "value": 5, "color": "black", "altra": "royalblue" },

  {"id": "IE", "name": "Ireland", "value": 5, "color": "black", "altra": "royalblue" },
  {"id": "AR", "name": "Argentina", "value": 5, "color": "black", "altra": "royalblue" },
  {"id": "ZA", "name": "Africa", "value": 5, "color": "black", "altra": "royalblue" },
  {"id": "BE", "name": "Belgium", "value": 5, "color": "black", "altra": "royalblue" },
  {"id": "NO", "name": "Norway", "value": 5, "color": "black", "altra": "royalblue" },

];


// Set map definition
chart.geodata = am4geodata_worldLow;

// Set projection
chart.projection = new am4maps.projections.Miller();

// Create map polygon series
var polygonSeries = chart.series.push(new am4maps.MapPolygonSeries());
polygonSeries.exclude = ["AQ"];
polygonSeries.useGeodata = true;
polygonSeries.nonScalingStroke = true;
polygonSeries.strokeWidth = 0.5;
polygonSeries.calculateVisualCenter = true;

polygonSeries.events.on("validated", function() {
  imageSeries.invalidate();
})

var polygonTemplate = polygonSeries.mapPolygons.template;
polygonTemplate.fill = am4core.color("#C1B1AD"); // background color
polygonTemplate.stroke =  am4core.color('#8F7F7B'); // stroke color

var imageSeries = chart.series.push(new am4maps.MapImageSeries());
imageSeries.data = mapData;
imageSeries.dataFields.value = "value";

var imageTemplate = imageSeries.mapImages.template;
imageTemplate.nonScaling = true

imageTemplate.adapter.add("latitude", function(latitude, target) {
  var polygon = polygonSeries.getPolygonById(target.dataItem.dataContext.id);
  if(polygon){
    return polygon.visualLatitude;
   }
   return latitude;
})

imageTemplate.adapter.add("longitude", function(longitude, target) {
  var polygon = polygonSeries.getPolygonById(target.dataItem.dataContext.id);
  if(polygon){
    return polygon.visualLongitude;
   }
   return longitude;
})

/*

var circle = imageTemplate.createChild(am4core.Circle);
var col = 0.5;
circle.fillOpacity = col;
//circle.propertyFields.fill = "altra";
//circle.tooltipText = "{name}: [bold]{value}[/]";



imageSeries.heatRules.push({
  "target": circle,
  "property": "radius",
  "min": 4,
  "max": 30,
  "dataField": "value"
})
*/
var label = imageTemplate.createChild(am4core.Label);
label.text = "{name}"
label.horizontalCenter = "middle";
label.padding(0,0,0,0);
label.adapter.add("dy", function(dy, target){
  var circle = target.parent.children.getIndex(0);
  return circle.pixelRadius;
})





const [jp, us, gb, au, de] = [ ['JP'], ['US'], ['GB'], ['AU'], ['DE'] ];
const topic = document.getElementsByClassName('wall-topics');

// arrow element...
const arrow = document.getElementById('arrow-down');
const partTwo = document.getElementById('scroll-control-container');

window.onscroll = function() {
    if (topic[0].getBoundingClientRect().top < 15) {
      arrow.style.display = 'none';
    } else {
      arrow.style.display = 'block';
    }
    if (topic[1].getBoundingClientRect().top < document.documentElement.clientHeight / 2 && topic[1].getBoundingClientRect().top > 10) {
        var north, south, west, east;
        for (let i = 0; i < jp.length; i++) {
            let country = polygonSeries.getPolygonById(jp[i]);
            if (north == undefined || (country.north > north)) {
              north = country.north;
            }
            if (south == undefined || (country.south < south)) {
              south = country.south;
            }
            if (west == undefined || (country.west < west)) {
              west = country.west;
            }
            if (east == undefined || (country.east > east)) {
              east = country.east;
            }
               
    }

    const japan = polygonSeries.getPolygonById("JP");
    japan.fill = am4core.color('#7B6B67');
    chart.zoomToRectangle(north, east, south, west, 1, true);
    return;

    } else {
        const japans = polygonSeries.getPolygonById("JP");
        chart.goHome(1000);
        japans.fill = am4core.color('#C1B1AD');
    } 

    if (topic[2].getBoundingClientRect().top < document.documentElement.clientHeight/ 2 && topic[2].getBoundingClientRect().top > 10) {
        var north_us, south_us, west_us, east_us;
    
        for (let i = 0; i < us.length; i++) {
            let countryU = polygonSeries.getPolygonById(us[i]);
            if (north_us == undefined || (countryU.north > north_us)) {
              north_us = countryU.north;
            }
            if (south_us == undefined || (countryU.south < south_us)) {
              south_us = countryU.south;
            }
            if (west_us == undefined || (countryU.west < west_us)) {
              west_us = countryU.west;
            }
            if (east_us == undefined || (countryU.east > east_us)) {
              east_us = countryU.east;
            }
    const usa = polygonSeries.getPolygonById("US");
    usa.fill = am4core.color('#7B6B67');
    chart.zoomToRectangle(north_us, east_us, south_us, west_us, 1, true);
    return;
    
    }
    } else {
    chart.goHome(1000);
    polygonSeries.getPolygonById("US").fill = am4core.color('#C1B1AD');
    
    }

    if (topic[3].getBoundingClientRect().top < document.documentElement.clientHeight/ 2 && topic[3].getBoundingClientRect().top > 10) {
      var north_uk, south_uk, west_uk, east_uk;
  
      for (let i = 0; i < gb.length; i++) {
          let countryUK = polygonSeries.getPolygonById(gb[i]);
          if (north_uk == undefined || (countryUK.north > north_uk)) {
            north_uk = countryUK.north;
          }
          if (south_uk == undefined || (countryUK.south < south_uk)) {
            south_uk = countryUK.south;
          }
          if (west_uk == undefined || (countryUK.west < west_uk)) {
            west_uk = countryUK.west;
          }
          if (east_uk == undefined || (countryUK.east > east_uk)) {
            east_uk = countryUK.east;
          }
  const ukd = polygonSeries.getPolygonById("GB");
  ukd.fill = am4core.color('#7B6B67');
  chart.zoomToRectangle(north_uk, east_uk, south_uk, west_uk, 1, true);
  return;
  
  }
  } else {
  chart.goHome(1000);
  polygonSeries.getPolygonById("GB").fill = am4core.color('#C1B1AD');
  
  }

  if (topic[4].getBoundingClientRect().top < document.documentElement.clientHeight/ 2 && topic[4].getBoundingClientRect().top > 10) {
    var north_au, south_au, west_au, east_au;

    for (let i = 0; i < au.length; i++) {
        let countryAU = polygonSeries.getPolygonById(au[i]);
        if (north_au == undefined || (countryAU.north > north_au)) {
          north_au = countryAU.north;
        }
        if (south_au == undefined || (countryAU.south < south_au)) {
          south_au = countryAU.south;
        }
        if (west_au == undefined || (countryAU.west < west_au)) {
          west_au = countryAU.west;
        }
        if (east_au == undefined || (countryAU.east > east_au)) {
          east_au = countryAU.east;
        }
const aus = polygonSeries.getPolygonById("AU");
aus.fill = am4core.color('#7B6B67');
chart.zoomToRectangle(north_au, east_au, south_au, west_au, 1, true);
return;

}
} else {
chart.goHome(1000);
polygonSeries.getPolygonById("AU").fill = am4core.color('#C1B1AD');

}

if (topic[5].getBoundingClientRect().top < document.documentElement.clientHeight/ 2 && topic[5].getBoundingClientRect().top > 10) {
  var north_de, south_de, west_de, east_de;

  for (let i = 0; i < de.length; i++) {
      let countryDE = polygonSeries.getPolygonById(de[i]);
      if (north_de == undefined || (countryDE.north > north_de)) {
        north_de = countryDE.north;
      }
      if (south_de == undefined || (countryDE.south < south_de)) {
        south_de = countryDE.south;
      }
      if (west_de == undefined || (countryDE.west < west_de)) {
        west_de = countryDE.west;
      }
      if (east_de == undefined || (countryDE.east > east_de)) {
        east_de = countryDE.east;
      }
const ger = polygonSeries.getPolygonById("DE");
ger.fill = am4core.color('#7B6B67');
chart.zoomToRectangle(north_de, east_de, south_de, west_de, 1, true);
return;

}
} else {
chart.goHome(1000);
polygonSeries.getPolygonById("DE").fill = am4core.color('#C1B1AD');

}




    if (topic[6].getBoundingClientRect().top < document.documentElement.clientHeight/ 2) {
      polygonSeries.getPolygonById("US").fill = am4core.color('#DC381F');
      polygonSeries.getPolygonById("JP").fill = am4core.color('#DC381F');
      polygonSeries.getPolygonById("GB").fill = am4core.color('#DC381F');
      polygonSeries.getPolygonById("AU").fill = am4core.color('#DC381F');
      polygonSeries.getPolygonById("DE").fill = am4core.color('#DC381F');

      polygonSeries.getPolygonById("IT").fill = am4core.color('#DC381F');
      polygonSeries.getPolygonById("ES").fill = am4core.color('#DC381F');
      polygonSeries.getPolygonById("CA").fill = am4core.color('#DC381F');
      polygonSeries.getPolygonById("FR").fill = am4core.color('#DC381F');
      polygonSeries.getPolygonById("IN").fill = am4core.color('#DC381F');

      polygonSeries.getPolygonById("BR").fill = am4core.color('#DC381F');
      polygonSeries.getPolygonById("SG").fill = am4core.color('#DC381F');
      polygonSeries.getPolygonById("CN").fill = am4core.color('#DC381F');
      polygonSeries.getPolygonById("NL").fill = am4core.color('#DC381F');
      polygonSeries.getPolygonById("CH").fill = am4core.color('#DC381F');

      polygonSeries.getPolygonById("IE").fill = am4core.color('#DC381F');
      polygonSeries.getPolygonById("AR").fill = am4core.color('#DC381F');
      polygonSeries.getPolygonById("ZA").fill = am4core.color('#DC381F');
      polygonSeries.getPolygonById("BE").fill = am4core.color('#DC381F');
      polygonSeries.getPolygonById("NO").fill = am4core.color('#DC381F');

    } else {
      polygonSeries.getPolygonById("US").fill = am4core.color('#C1B1AD');
      polygonSeries.getPolygonById("JP").fill = am4core.color('#C1B1AD');
      polygonSeries.getPolygonById("GB").fill = am4core.color('#C1B1AD');
      polygonSeries.getPolygonById("AU").fill = am4core.color('#C1B1AD');
      polygonSeries.getPolygonById("DE").fill = am4core.color('#C1B1AD');

      polygonSeries.getPolygonById("IT").fill = am4core.color('#C1B1AD');
      polygonSeries.getPolygonById("ES").fill = am4core.color('#C1B1AD');
      polygonSeries.getPolygonById("CA").fill = am4core.color('#C1B1AD');
      polygonSeries.getPolygonById("FR").fill = am4core.color('#C1B1AD');
      polygonSeries.getPolygonById("IN").fill = am4core.color('#C1B1AD');

      polygonSeries.getPolygonById("BR").fill = am4core.color('#C1B1AD');
      polygonSeries.getPolygonById("SG").fill = am4core.color('#C1B1AD');
      polygonSeries.getPolygonById("CN").fill = am4core.color('#C1B1AD');
      polygonSeries.getPolygonById("NL").fill = am4core.color('#C1B1AD');
      polygonSeries.getPolygonById("CH").fill = am4core.color('#C1B1AD');

      polygonSeries.getPolygonById("IE").fill = am4core.color('#C1B1AD');
      polygonSeries.getPolygonById("AR").fill = am4core.color('#C1B1AD');
      polygonSeries.getPolygonById("ZA").fill = am4core.color('#C1B1AD');
      polygonSeries.getPolygonById("BE").fill = am4core.color('#C1B1AD');
      polygonSeries.getPolygonById("NO").fill = am4core.color('#C1B1AD');
    }


    // transition section2..........

    if (partTwo.getBoundingClientRect().top < document.documentElement.clientHeight) {
      $('#con').fadeOut(2000);
    } else {
      $('#con').fadeIn(2000);
    }

  
}


const scrolls = document.getElementById('scrolling');
const percLeft = document.getElementById('termo-left');
const percRight = document.getElementById('termo-right');
const aq = document.getElementById("scroll-track-container");


scrolls.onmousedown = function() {
  scrolls.onmousemove = function() {
    percLeft.textContent = `${100 - this.value}%`;
    percRight.textContent = `${this.value}%`;
  }
}

//initiate scrolling percentage

document.addEventListener('DOMContentLoaded', () => {
  percLeft.textContent = `${100 - scrolls.value}%`;
  percRight.textContent = `${scrolls.value}%`;
}, false);


const allCountries = document.getElementsByClassName('country-obj');
const fakeData = 'Data about the Country';

function countryHover() {
    this.children[1].textContent = fakeData;
   // this.children[1].style.borderTop = '1px dashed #7B6B67';
    this.children[1].style.cssText = `
    border-top: 1px dashed #7B6B67;
     `;
     this.children[0].style.cssText = `
     border-right: 1px dashed #7B6B67;
     border-bottom: 1px dashed #7B6B67;
     `;
}

function countryOut() {
  this.children[1].textContent = '';
  this.children[1].style.cssText = `
    border-top: ;
     `;
     this.children[0].style.cssText = `
     border-right: ;
     border-bottom: ;
     `;
  
  
};


for (let i = 0; i < allCountries.length; i++) {
  allCountries[i].addEventListener('mouseover', countryHover, false);
  allCountries[i].addEventListener('mouseout', countryOut, false);
  
}


