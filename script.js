// Initialize map with coordinates focused on India
var map = L.map("map").setView([22.3511148, 78.6677428], 5); // Centered on India, zoom level 5

// Add default OSM layer
var osmLayer = L.tileLayer(
  "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
  {
    attribution: "© OpenStreetMap contributors",
  }
).addTo(map);

// Add satellite imagery layer
var satelliteLayer = L.tileLayer(
  "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}",
  {
    attribution: "© Esri",
  }
);

// Create an object to hold different base layers
var baseLayers = {
  OpenStreetMap: osmLayer,
  "Satellite Imagery": satelliteLayer,
};

// Add layer control to switch between base layers
L.control.layers(baseLayers).addTo(map);

// Load GeoJSON data for points, lines, and polygons
// Points GeoJSON data (replace 'points.geojson' with your actual file path)
fetch("points.geojson")
  .then((response) => response.json())
  .then((data) => {
    var pointsLayer = L.geoJSON(data);
    pointsLayer.addTo(map);
  });

// Lines GeoJSON data (replace 'lines.geojson' with your actual file path)
fetch("lines.geojson")
  .then((response) => response.json())
  .then((data) => {
    var linesLayer = L.geoJSON(data);
    linesLayer.addTo(map);
  });

// Polygons GeoJSON data (replace 'polygons.geojson' with your actual file path)
fetch("polygons.geojson")
  .then((response) => response.json())
  .then((data) => {
    var polygonsLayer = L.geoJSON(data);
    polygonsLayer.addTo(map);
  });

// Create an object to hold different GeoJSON layers
var geoJsonLayers = {
  Points: pointsLayer,
  Lines: linesLayer,
  Polygons: polygonsLayer,
};

// Add GeoJSON layers to the map with layer control
L.control.layers(baseLayers, geoJsonLayers).addTo(map);

// Function to handle file upload
function uploadFile() {
  var fileInput = document.getElementById("fileInput");
  var file = fileInput.files[0];

  if (!file) {
    alert("Please select a file.");
    return;
  }

  var reader = new FileReader();
  reader.onload = function (event) {
    var geoJsonData = JSON.parse(event.target.result);
    addGeoJsonLayer(geoJsonData);
  };
  reader.readAsText(file);
}

// Function to add GeoJSON layer to the map
function addGeoJsonLayer(geoJsonData) {
  var geoJsonLayer = L.geoJSON(geoJsonData);
  geoJsonLayer.addTo(map);
}
var pointsLayer, linesLayer, polygonsLayer;

// Function to toggle spatial data layers
function toggleLayer(layerType) {
  switch (layerType) {
    case "points":
      if (document.getElementById("pointsCheckbox").checked) {
        if (!pointsLayer) {
          fetch("points.geojson")
            .then((response) => response.json())
            .then((data) => {
              pointsLayer = L.geoJSON(data);
              pointsLayer.addTo(map);
            });
        } else {
          pointsLayer.addTo(map);
        }
      } else {
        if (pointsLayer) {
          map.removeLayer(pointsLayer);
        }
      }
      break;
    case "lines":
      // Similar logic for lines layer
      break;
    case "polygons":
      // Similar logic for polygons layer
      break;
    default:
      break;
  }
}
