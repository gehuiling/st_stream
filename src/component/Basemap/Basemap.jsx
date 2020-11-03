import React from 'react';
import L from 'leaflet';
import 'leaflet-draw';
import './Basemap.css';
// import { osmMap } from '../../constants';
import { mapboxMap } from '../../constants';
import { connect } from 'react-redux';
import { initMap } from '../../redux/actions';

const parse = require('wellknown');

class Basemap extends React.Component {
    constructor(props) {
        super(props);
    }
    
    componentDidMount() {
        this.showMap();
    }

    reveiveTopics() {
        var ws = new WebSocket(`ws://127.0.0.1:3002/mapmatching`);
        
        ws.onopen = e => {
          console.log(`WebSocket 连接状态： ${ws.readyState}`)
        }

        ws.onmessage = message => {
            let mapmatching_point =  JSON.parse(message);
            let lng = +parse(mapmatching_point["point"]).coordinates[0];
            let lat = +parse(mapmatching_point["point"]).coordinates[1];
        
            //   var mapmatching_layer = L.geoJson(parse(mapmatching_point["point"])).addTo(this.state.leafletMap);
            (L.circle(L.latLng(lat,lng), 1, {
                color: '#CAFF70',
                fillColor: '#CAFF70',
                fillOpacity: 0.2
            })).addTo(this.state.leafletMap);
        }

        ws.onclose = message => {
            console.log(`WebSocket连接已关闭:${ws.readyState}`)
        }
    }
    
    showMap = () => {
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

        var leafletMap = L.map("mapContainer", {
            maxBounds: [[-85, -180], [85, 180]],
            zoomControl: false,
            nowrap:true,
            // layers:osmTile,
            zoomOffset: -1
        })
        .addLayer(mapboxTile)
        .setView([24.494413,118.126646], 10);

        this.props.initMap(leafletMap);

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

const mapStateToProps = state => {
    console.log(state);
    return {};
}

export default connect(
    mapStateToProps,
    { initMap }
)(Basemap);