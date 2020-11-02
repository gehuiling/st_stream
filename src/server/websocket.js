const express = require('express');
const expressWs = require('express-ws');
const router = express.Router();
const kafka = require('kafka-node');

expressWs(router);

router.ws('/mapmatching', (ws, req) => {
  ws.send('连接成功');
  if (ws.readyState === ws.OPEN) {

const kafka = require('kafka-node');

const mapmatching_topic = "mapmatching-origion1";

const client = new kafka.KafkaClient({
    kafkaHost: 'localhost:9092',
});

const Consumer = kafka.Consumer;

let consumer = new Consumer(
    client,
    [{ topic: mapmatching_topic, partition: 0 }],
    {
        autoCommit: true,
        etchMaxWaitMs: 1000,
        fetchMaxBytes: 1024 * 1024,
        encoding: 'utf-8',
        groupId: 'group-test',
        fromOffset: 'earliest',
    }
);

consumer.on('message', onMessage);
consumer.on('error', onError);

function onMessage (message) {
  ws.send(message.value);
    console.log(
      'kafka:',
        //   JSON.parse(message.value)
        message.value);
}

function onError(error) {
    console.log('error', error);
}

}
//#endregion

//#region  监听客户端发来的数据，直接将信息原封不动返回回去
ws.on('message', msg => {
    ws.send(msg) // 服务端也可以发消息给客户端
})
//#endregion

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
