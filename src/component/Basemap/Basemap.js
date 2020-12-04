import React from 'react';
import L from 'leaflet';
import 'leaflet-draw';
import './Basemap.css';
import { osmMap } from '../../constants';
import { mapboxMap } from '../../constants';
import { connect } from 'react-redux';
import { initMap } from '../../redux/actions';

const parse = require('wellknown');

/**
 * 底图组件
 */
class Basemap extends React.Component {
    constructor(props){
        super(props);
        // this.showGrid.bind(this);
    }

    componentDidMount() {
        this.showMap();
        // this.reveiveTopics();
        // console.log(this.props.mapObj);
    }

    reveiveTopics = () => {
        
    }

    showMap = () => {
        //#region OSM底图
        // var osmTile = L.tileLayer(osmMap.osmUrl, {
        //         attribution: osmMap.osmAttrib,
        //         opacity:1,
        //         nowrap:true 
        //     });
        // var leafletMap =L.map("mapContainer", {
        //     maxZoom: 17,
        //     minZoom: 2,
        //     maxBounds: [[-90, -180], [90, 180]],
        //     layers: osmTile,
        //     zoomControl: false
        // })
        //   .addLayer(osmTile)
        //   .setView([24.494413, 118.126646], 14);
        //#endregion
        //'https://api.mapbox.com/styles/v1/mapbox/streets-v11/tiles/{z}/{x}/{y}?access_token=pk.eyJ1Ijoic2xlZXB5Z2dnIiwiYSI6ImNqd3c1eG1vcTBnY2ozenFzeXplODIxMGIifQ.XYsbgqbl7JQcmopfr9T5hQ'

        //#region mapbox底图
        var mapboxTile = L.tileLayer(mapboxMap.mapboxUrl, {
            maxZoom: 20,
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
            .setView([45.92058, 118.081054], 13);
            
        //#endregion

        this.props.initMap(leafletMap);

        //#region 实验
        
        // var ws = new WebSocket(`ws://127.0.0.1:3002/heatmap`);
    
        // ws.onopen = e => {
        //     console.log(`WebSocket 连接状态： ${ws.readyState}`);
        // }

        // function setColor(count) {
        //     var lc = Math.log(count + 1) / Math.log(10);
        //     var r = Math.floor(256 * Math.min(1, lc));
        //     var g = Math.floor(256 * Math.min(1, Math.max(0, lc)));
        //     var b = Math.floor(256 * Math.min(1, Math.max(0, lc-2)));
        //     var a = Math.min(1, lc);
        //     return "rgba(" + r + "," + g + "," + b + "," + a + ")";
        // }

        // ws.onmessage = message => {
        //     let heatmap_msg = JSON.parse(message.data);
        //     // console.log(heatmap_msg["tiles"]);
        //     var tiles = new L.GridLayer();
        //     tiles.createTile = function (coords) {
        //         var tile = L.DomUtil.create('canvas', 'leaflet-tile');
        //         var ctx = tile.getContext('2d');
        //         var size = this.getTileSize()
        //         // console.log(this)
        //         tile.width = size.x
        //         tile.height = size.y
        //         // 将切片号乘以切片分辨率，默认为256pixel,得到切片左上角的绝对像素坐标
        //         var nwPoint = coords.scaleBy(size)
        //         // 根据绝对像素坐标，以及缩放层级，反投影得到其经纬度
        //         var nw = leafletMap.unproject(nwPoint, coords.z)
        //         //从该切片左上角开始画，画一个切片大小的无填充矩形
        //         ctx.strokeRect(nwPoint.x, nwPoint.y,size.x,size.y)
        //         ctx.fillStyle = 'black';
        //         //x,y,z显示
        //         ctx.fillText('x: ' + coords.x + ', y: ' + coords.y + ', zoom: ' + coords.z, 50, 60);
        //         //经纬度坐标
        //         ctx.fillText('lat: ' + nw.lat + ', lon: ' + nw.lng, 50, 80);
        //         //线的颜色
        //         ctx.strokeStyle = 'black';
        //         //这是canvans的方法
        //         ctx.beginPath();
        //         ctx.moveTo(0, 0);
        //         ctx.lineTo(size.x - 1, 0);
        //         ctx.lineTo(size.x - 1, size.y - 1);
        //         ctx.lineTo(0, size.y - 1);
        //         ctx.closePath();
        //         ctx.stroke();
        //         for(let tile_item of heatmap_msg["tiles"]) {
        //             if(tile_item.tile_x == coords.x && tile_item.tile_y == coords.y){
        //                 for (let i in tile_item["data"]) {
        //                     let x = (i) % 256 ;
        //                     let y = (i) / 256 ;

        //                     x > 256 ? x=256: x=x;
        //                     x < 0 ? x=0: x=x;
        //                     y > 256 ? y=256: y=y;
        //                     y < 0 ? y=0: y=y;
        //                     var p_color = setColor(tile_item["data"][i])
                        
        //                     ctx.fillStyle = p_color;
        //                     ctx.fillRect(x,y,10,10);
        //                 }   
        //             }
        //         }
        //         return tile;
        //     }
        //     tiles.addTo(leafletMap);
          
        // }
    
        // ws.onclose = message => {
        //     console.log(`WebSocket连接已关闭:${ws.readyState}`)
        // }
        //#endregion 实验

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
    // console.log(state);
    return { mapObj: state.basemap.mapObj };
}

export default connect(
    mapStateToProps,
    { initMap }
)(Basemap);