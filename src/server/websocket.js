const express = require('express');
const expressWs = require('express-ws')
const router = express.Router()
expressWs(router);

router.ws('/mapmatching', (ws, req) => {
  ws.send('连接成功')
  let interval
  interval = setInterval(() => {
    if (ws.readyState === ws.OPEN) {
      ws.send(Math.random().toFixed(4))
    } else {
      clearInterval(interval)
    }
  }, 1000)

  ws.on('message', msg => { // 监听客户端发送来的
    ws.send(msg+'是客户端发来的')
  })
});

router.ws('/congestion', (ws, req) => {
  ws.send('连接成功')
  let interval
  interval = setInterval(() => {
    if (ws.readyState === ws.OPEN) {
      ws.send(Math.random().toFixed(3))
    } else {
      clearInterval(interval)
    }
  }, 1000)

  ws.on('message', msg => { // 监听客户端发送来的
    ws.send(msg+'是客户端发来的')
  })
});

router.ws('/heatmap', (ws, req) => {
  ws.send('连接成功')
  let interval
  interval = setInterval(() => {
    if (ws.readyState === ws.OPEN) {
      ws.send(Math.random().toFixed(2))
    } else {
      clearInterval(interval)
    }
  }, 1000)

  ws.on('message', msg => { // 监听客户端发送来的
    ws.send(msg+'是客户端发来的')
  })
});

router.ws('/stsearch', (ws, req) => {
  ws.send('连接成功')
  let interval
  interval = setInterval(() => {
    if (ws.readyState === ws.OPEN) {
      ws.send(Math.random().toFixed(1))
    } else {
      clearInterval(interval)
    }
  }, 1000)

  ws.on('message', msg => { // 监听客户端发送来的
    ws.send(msg+'是客户端发来的')
  })
});

module.exports = router
