import Leaflet from '../lib/leaflet_1.5.1/leaflet';
import '../lib/leaflet_1.5.1/leaflet.css';
import gpxParser from '../lib/gpx-parser/gpx-parser';
window.onload = function init() {
    fetch("track_20190728_082434_caldes_de_montbui.gpx")
    .then(res => res.text())
    .then(res => {
      let parser = new gpxParser() //properties copied
      parser.parse(res); 
      // Load paths
      let arrLatLong = parser.tracks[0].points.map(point => [point.lat, point.lon]);
      Leaflet.polyline(arrLatLong, {color: 'red'})
             .addTo(this.map);
    })
  

  this.map = Leaflet.map('mapid')
    .setView([41.5, 2.14], 10);

  // Load map
  Leaflet.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: 'Map data © <a href="https://openstreetmap.org">OpenStreetMap</a> contributors',
    maxZoom: 18,
  }).addTo(this.map);
};
    