var data, year, code, country, value, filteredData, countryName;
var slider = document.getElementById("myRange");
var year = 2015;
var values = [];
var intro, all, sealevel_container_temp, sealevel_container_co2, mapContainerMix, mapContainer, lineChartContainer, slidecontainer, sealevelContainer, scatterPlotContainer, linePlotContainer, mapContainerCo2, lineChartContainerCo2, slidecontainerCo2;

var years = [
  "1961",
  "1962",
  "1963",
  "1964",
  "1965",
  "1966",
  "1967",
  "1968",
  "1969",
  "1970",
  "1971",
  "1972",
  "1973",
  "1974",
  "1975",
  "1976",
  "1977",
  "1978",
  "1979",
  "1980",
  "1981",
  "1982",
  "1983",
  "1984",
  "1985",
  "1986",
  "1987",
  "1988",
  "1989",
  "1990",
  "1991",
  "1992",
  "1993",
  "1994",
  "1995",
  "1996",
  "1997",
  "1998",
  "1999",
  "2000",
  "2001",
  "2002",
  "2003",
  "2004",
  "2005",
  "2006",
  "2007",
  "2008",
  "2009",
  "2010",
  "2011",
  "2012",
  "2013",
  "2014",
  "2015",
  "2016",
  "2017",
  "2018",
  "2019",
  "2020",
  "2021",
  "2022",
];
document.addEventListener("DOMContentLoaded", function () {
   mapContainer = document.getElementById("mapContainer");
   lineChartContainer = document.getElementById("lineChartContainer");
   slidecontainer = document.getElementById("slidecontainer");

   mapContainerCo2 = document.getElementById("mapContainerCo2");
   lineChartContainerCo2 = document.getElementById("lineChartContainerCo2");
   slidecontainerCo2 = document.getElementById("slidecontainerCo2");

   sealevelContainer = document.getElementById("sealevel-container");
   mapContainerMix = document.getElementById("mapContainerMix");
   sealevel_container_co2 = document.getElementById("sealevel-container-co2");
   sealevel_container_temp = document.getElementById("sealevel-container-temp");
   all = document.getElementById("all");
   intro = document.getElementById("intro");

  mapContainer.style.display = "none";
  lineChartContainer.style.display = "none";
  slidecontainer.style.display = "none";
  
  mapContainerCo2.style.display = "none";
  lineChartContainerCo2.style.display = "none";
  slidecontainerCo2.style.display = "none";
  
sealevelContainer.style.display = "none";
sealevel_container_temp.style.display = "none";
sealevel_container_co2.style.display = "none";
mapContainerMix.style.display = "none";
all.style.display = "none";

});

function openNav() {
  document.getElementById("sidebar").style.width = "250px";
}

// Function to close the sidebar
function closeNav() {
  document.getElementById("sidebar").style.width = "0";
}

document.addEventListener("DOMContentLoaded", function () {
  // Function to handle checkbox click events
  function handleCheckboxClick(checkboxId) {
    document.getElementById(checkboxId).addEventListener("change", function () {

      mapContainer.style.display = "none";
      lineChartContainer.style.display = "none";
      slidecontainer.style.display = "none";
      
      mapContainerCo2.style.display = "none";
      lineChartContainerCo2.style.display = "none";
      slidecontainerCo2.style.display = "none";
      
    sealevelContainer.style.display = "none";
      mapContainerMix.style.display = "none";
      sealevel_container_temp.style.display = "none";
      sealevel_container_co2.style.display = "none";
all.style.display = "none";
intro.style.display = "none";

      var checkbox1 = document.getElementById("checkboxA");
      var checkbox2 = document.getElementById("checkboxB");
      var checkbox3 = document.getElementById("checkboxC");
      const isChecked1 = checkbox1.checked ? 1 : 0;
      const isChecked2 = checkbox2.checked ? 1 : 0;
      const isChecked3 = checkbox3.checked ? 1 : 0;

      const conditionIndex = isChecked1 * 4 + isChecked2 * 2 + isChecked3;

      switch (conditionIndex) {
        case 0:
          console.log("No checkboxes are checked.");
          break;
        case 1:
          console.log("Checkbox 3 is checked.");
          sealevelContainer.style.display = "block";

          break;
        case 2:
          console.log("Checkbox 2 is checked.");
          mapContainerCo2.style.display = "block";
          lineChartContainerCo2.style.display = "block";
          slidecontainerCo2.style.display = "block";
          break;
        case 3:
          console.log("Checkbox 2 and Checkbox 3 are checked.");
          sealevel_container_co2.style.display = "block";
          break;
        case 4:
          console.log("Checkbox 1 is checked.");
          mapContainer.style.display = "block";
          lineChartContainer.style.display = "block";
          slidecontainer.style.display = "block";
          break;
        case 5:
          console.log("Checkbox 1 and Checkbox 3 are checked.");
          sealevel_container_co2.style.display = "block";

          break;
        case 6:
          console.log("Checkbox 1 and Checkbox 2 are checked.");
          mapContainerMix.style.display = "block";

          break;
        case 7:
          console.log("All checkboxes are checked.");
          all.style.display = "block";
          break;
        default:
          console.log("Invalid combination.");
      }

      // switch (checkboxId) {
      //   case "checkboxA":
      //     // If checkbox A is checked, show the map container
      //     if (document.getElementById(checkboxId).checked) {
      //       mapContainer.style.display = "block";
      //       lineChartContainer.style.display = "block";
      //       slidecontainer.style.display = "block";
      //     } else {
      //       // If checkbox A is unchecked, hide the map container
      //       mapContainer.style.display = "none";
      //       lineChartContainer.style.display = "none";
      //       slidecontainer.style.display = "none";
      //     }
      //     break;
      //   case "checkboxB":
      //     // Handle checkbox B logic here
      //     break;
      //   case "checkboxC":
      //     // Handle checkbox C logic here
      //     if (document.getElementById(checkboxId).checked) {
      //       sealevelContainer.style.display = "block";

      //       mapContainer.style.display = "none";
      //       lineChartContainer.style.display = "none";
      //       slidecontainer.style.display = "none";
      //     } else {
      //       // If checkbox A is unchecked, hide the map container
      //       sealevelContainer.style.display = "none";

      //       mapContainer.style.display = "block";
      //       lineChartContainer.style.display = "block";
      //       slidecontainer.style.display = "block";
      //     }
      //     break;
      //   default:
      //     // Handle default case here
      //     break;
      // }
    });
  }

  // Call the function for checkboxA
  handleCheckboxClick("checkboxA");
  handleCheckboxClick("checkboxB");
  handleCheckboxClick("checkboxC");
});
