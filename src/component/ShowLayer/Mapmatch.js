import { connect } from 'react-redux';
import L from 'leaflet';
import 'leaflet-draw';

// import { useRouteMatch } from 'react-router-dom';

const parse = require('wellknown');

const Mapmatch = ( { mapObj, } ) => {
    // let { url } = useRouteMatch();

    // console.log(path,url)
    var ws = new WebSocket(`ws://127.0.0.1:3002/streamviz`);

    ws.onopen = e => {
        console.log(`WebSocket 连接状态： ${ws.readyState}`);
    }

    var mapmatch_layer = new L.layerGroup();
    ws.onmessage = message => {
        let mapmatching_point = JSON.parse(message.data);
        let lng = parse(mapmatching_point["point"]).coordinates[0];
        let lat = parse(mapmatching_point["point"]).coordinates[1];
        (L.circle(L.latLng(lat, lng), 2, {
            color: '#DC143C',
            fillColor: '#DC143C',
            fillOpacity: 0.2
        })).addTo(mapmatch_layer);
        mapmatch_layer.addTo(mapObj);  
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
)(Mapmatch);