import Leaflet from '../lib/leaflet_1.5.1/leaflet-src';
import '../lib/leaflet_1.5.1/leaflet.css';
import gpxParser from '../lib/gpx-parser/gpx-parser';
import route from './assets/tracks/track_20190728_082434_caldes_de_montbui.gpx';

(function init() {
  let parser = new gpxParser() //properties copied
  parser.parse(route); 
  // Load paths
  let arrLatLong = parser.tracks[0].points.map(point => [point.lat, point.lon]);
  let map = Leaflet.map('mapid')
    .setView([41.5, 2.14], 10);
  Leaflet.polyline(arrLatLong, {color: 'red'})
    .addTo(map);
  // Load map
  Leaflet.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: 'Map data © <a href="https://openstreetmap.org">OpenStreetMap</a> contributors',
    maxZoom: 18,
  }).addTo(map);
})()
    