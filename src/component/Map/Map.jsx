import React from 'react';
import L from 'leaflet';
import 'leaflet-draw';
import './Map.css';
// import { osmMap } from '../../constants';
import { mapboxMap } from '../../constants';

class Map extends React.Component {
    componentDidMount() {
        this.initMap();
    }

    initMap = () => {
        //#region OSM底图
        // var osmTile = L.tileLayer(osmMap.osmUrl, {
        //         attribution: osmMap.osmAttrib,
        //         opacity:1,
        //         nowrap:true 
        //     });
        // var osm =L.map("mapContainer", {
        //     maxZoom: 17,
        //     minZoom: 2,
        //     maxBounds: [[-85, -180], [85, 180]],
        //     layers: osmTile,
        //     zoomControl: false
        // }).setView([39.9, 116.4], 10);
        //#endregion
        //'https://api.mapbox.com/styles/v1/mapbox/streets-v11/tiles/{z}/{x}/{y}?access_token=pk.eyJ1Ijoic2xlZXB5Z2dnIiwiYSI6ImNqd3c1eG1vcTBnY2ozenFzeXplODIxMGIifQ.XYsbgqbl7JQcmopfr9T5hQ'
        
        var mapboxTile = L.tileLayer(mapboxMap.mapboxUrl, { 
                maxZoom: 18,
                minZoom: 2,
                opacity: 0.8,
        });
        L.map("mapContainer", {
            maxBounds: [[-85, -180], [85, 180]],
            zoomControl: false,
            nowrap:true,
            // layers:osmTile,
            zoomOffset: -1
        })
        .addLayer(mapboxTile)
        .setView([39.9, 116.4], 10);        

        // osm.zoomControl.setPosition('topright');
        //#region 添加绘制工具
        // var drawnItems = new L.FeatureGroup();
        // osm.addLayer(drawnItems);
        
        // var featureGroup = L.featureGroup().addTo(leafletMap);
        // var drawControl = new L.Control.Draw({
        //     draw: {
        //         polyline: false,
        //         polygon: false,
        //         circle: false,
        //         marker: false,
        //         circlemarker: true,
        //     },
        //     edit: {
        //         featureGroup: featureGroup,
        //         remove: true,
        //         edit: false,
        //     }
        // });
        // leafletMap.addControl(drawControl);
        // leafletMap.on('draw:created', function (e) {
        //     featureGroup.addLayer(e.layer);
        // });
        //#endregion
    }

    render() {
        return (
            <div className={['baseMap', 'mapStyle'].join(' ')} id='mapContainer'></div> 
        )
    }
}

export default Map;