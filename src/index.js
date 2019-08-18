import Leaflet from '../lib/leaflet_1.5.1/leaflet-src';
import '../lib/leaflet_1.5.1/leaflet.css';
import gpxParser from '../lib/gpx-parser/gpx-parser';
import route from './assets/tracks/track_20190728_082434_caldes_de_montbui.gpx';
import {html, render} from 'lit-html';
import './assets/style/app.css'

(function init() {
  let parser = new gpxParser() //properties copied
  parser.parse(route); 
  console.log(parser)
  // Load paths
  let arrLatLong = parser.tracks[0].points.map(point => [point.lat, point.lon]);
  let map = Leaflet.map('mapid')
    .setView([41.5, 2.14], 10);

  // Load map
  Leaflet.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: 'Map data © <a href="https://openstreetmap.org">OpenStreetMap</a> contributors',
    maxZoom: 18,
  }).addTo(map);

  // Render tracks
  let polyline = Leaflet.polyline(arrLatLong, {color: 'red'});
  polyline.addTo(map);
  polyline.on('click',()=> {
    render(trackModal(parser.tracks[0]),document.getElementById("track-modal-target"))
  });
})()

const trackModal = (trackData) => html`
  <div class="track-modal-container track-modal-close" @click=${closeTrackModal}>
    <div class="track-modal">
      <div class="track-item">distance: ${trackData.distance.total}</div>
      <div class="track-item">max elevation: ${trackData.elevation.max}</div>
      <button class="track-modal-close" @click=${closeTrackModal}>Close</button>
    </div>
  </div>
`;

const closeTrackModal = (e) => {
  if(e.target.className.includes("track-modal-close")){
    render(null,document.getElementById("track-modal-target"))
  }};