// import React from 'react';
const Realtime = ()=> {
    const ws = new WebSocket('ws://127.0.0.1:3002/websocket/test');
    ws.onopen = e => {
        console.log(`WebSocket 连接状态： ${ws.readyState}`)
    }
    ws.onmessage = data => {
        console.log(data.data);
    }
    ws.onclose = data => {
        console.log(`WebSocket连接已关闭:${ws.readyState}`)
    }
    
    return (null);
}

export default Realtime;