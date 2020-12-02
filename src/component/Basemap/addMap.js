import { mapboxMap } from '../../constants';

var mapboxTile = L.tileLayer(mapboxMap.mapboxUrl, {
    maxZoom: 18,
    minZoom: 2,
    opacity: 0.8,
});

var leafletMap = L.map("mapContainer", {
    maxBounds: [[-85, -180], [85, 180]],
    zoomControl: false,
    nowrap: true,
    // layers:osmTile,
    zoomOffset: -1
})
    .addLayer(mapboxTile)
    .setView([24.494413, 118.126646], 14);

    console.log(document.getElementById('mapContainer'));
