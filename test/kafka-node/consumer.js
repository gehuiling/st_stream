

const kafka = require('kafka-node');
var parse = require('wellknown');

const mapmatching_topic = "t1"; // mapmatching-origion1

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
        fromOffset: 'earliest',//earliest
    }
);

consumer.on('message', onMessage);
consumer.on('error', onError);

function onMessage (message) {
    var result_point = JSON.parse(message.value);
    console.log(result_point);
    // console.log(parse(result_point["point"]).coordinates[0]+'   '+parse(result_point["point"]).coordinates[1]);
}

function onError(error) {
    console.log('error', error);
}