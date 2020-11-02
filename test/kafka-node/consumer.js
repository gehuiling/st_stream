

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
    console.log(
        //   JSON.parse(message.value)
        message.value);
}

function onError(error) {
    console.log('error', error);
}