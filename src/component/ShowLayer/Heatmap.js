import { connect } from 'react-redux';
import L from 'leaflet';
import 'leaflet-draw';

import { useRouteMatch } from 'react-router-dom';

const parse = require('wellknown');

const Heatmap = ({ mapObj }) => {
        var ws = new WebSocket(`ws://127.0.0.1:3002/streamviz`);
    
        ws.onopen = e => {
            console.log(`WebSocket 连接状态： ${ws.readyState}`);
        }

        var setColor = (count) => {
            var lc = Math.log(count + 1) / Math.log(10);
            var r = Math.floor(256 * Math.min(1, lc));
            var g = Math.floor(256 * Math.min(1, Math.max(0, lc)));
            var b = Math.floor(256 * Math.min(1, Math.max(0, lc-2)));
            var a = Math.min(1, lc);
            return "rgba(" + r + "," + g + "," + b + "," + a + ")";
        }

        //#region 添加网格标注方便观察
        var tiles1 = new L.GridLayer();
            tiles1.createTile = function (coords) {
                var tile = L.DomUtil.create('canvas', 'leaflet-tile');
                var ctx = tile.getContext('2d');
                var size = this.getTileSize();
                tile.width = size.x;
                tile.height = size.y;
                // 将切片号乘以切片分辨率，默认为256pixel,得到切片左上角的绝对像素坐标
                var nwPoint = coords.scaleBy(size)
                // 根据绝对像素坐标，以及缩放层级，反投影得到其经纬度
                var nw = mapObj.unproject(nwPoint, coords.z)
                //从该切片左上角开始画，画一个切片大小的无填充矩形
                ctx.strokeRect(nwPoint.x, nwPoint.y,size.x,size.y)
                ctx.fillStyle = 'black';
                //x,y,z显示
                ctx.fillText('x: ' + coords.x + ', y: ' + coords.y + ', zoom: ' + coords.z, 50, 60);
                //经纬度坐标
                ctx.fillText('lat: ' + nw.lat + ', lon: ' + nw.lng, 50, 80);
                //线的颜色
                ctx.strokeStyle = 'black';
                //这是canvans的方法
                ctx.beginPath();
                ctx.moveTo(0, 0);
                ctx.lineTo(size.x - 1, 0);
                ctx.lineTo(size.x - 1, size.y - 1);
                ctx.lineTo(0, size.y - 1);
                ctx.closePath();
                ctx.stroke();
                return tile;
            }
        tiles1.addTo(mapObj);
        //#endregion
        
        ws.onmessage = message => {
            let heatmap_msg = JSON.parse(message.data);
            console.log( heatmap_msg);
            var tiles = new L.GridLayer();
            tiles.createTile = function (coords) {
                var tile = L.DomUtil.create('canvas', 'leaflet-tile');
                var ctx = tile.getContext('2d');
            
                let tile_x = heatmap_msg.x;
                let tile_y = heatmap_msg.y;
                let tile_data = heatmap_msg.data;
                if(tile_x == coords.x && tile_y == coords.y) {
                    for(let i in tile_data) {
                        let x = (i) % 256 ;
                        let y = (i) / 256 ;

                        x > 256 ? x=256: x=x;
                        x < 0 ? x=0: x=x;
                        y > 256 ? y=256: y=y;
                        y < 0 ? y=0: y=y;

                        var p_color = setColor(tile_data[i]);
                        ctx.fillStyle = p_color;
                        ctx.fillRect(x,y,10,10);
                    }
                }
                return tile;
            }
            tiles.addTo(mapObj);
        }
        ws.onclose = message => {
            console.log(`WebSocket连接已关闭:${ws.readyState}`)
        }
        

    return null;
}


const mapStateToProps = (state) => {
    // console.log(state);

    return {
        mapObj: state.basemap.mapObj
     };

}

export default connect(
    mapStateToProps,
    null
)(Heatmap);
