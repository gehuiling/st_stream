- 关于zookeeper

启动 
```shell
sh bin/zkServer.sh start
```

查看zk服务状态
```shell
sh bin/zkServer.sh status
```

停止zk服务
```shell
sh bin/zkServer.sh stop
```

重启zk服务
```shell
sh bin/zkServer.sh restrat
```

- 关于kafka

启动
```shell
.\bin\windows\kafka-server-start.bat .\config\server.properties
```

创建otpic
```shell
 .\bin\windows\kafka-topics.bat --zookeeper localhost:2181 --create --replication-factor 1 --partitions 1 --topic o1
```
 
删除topic
```shell
 .\bin\windows\kafka-topics.bat --delete --topic test1 --zookeeper localhost:2181
```

描述topic
```shell
 .\bin\windows\kafka-topics.bat --zookeeper localhost:2181 --describe --topic node-topic-1
 ```

列举topic
```shell
.\bin\windows\kafka-topics.bat --list --zookeeper localhost:2181
```

生产者
```shell
 .\bin\windows\kafka-console-producer.bat --broker-list localhost:9092 --topic node-topic-2
```

消费者
```shell
.\bin\windows\kafka-console-consumer.bat --bootstrap-server localhost:9092 --topic source-data --from-beginning
```



Linux常见命令

卸载软件
```shell
sudo apt-get --purge remove **
```

列举软件
```shell
sudo dpkg --list
```

安装软件
```shell
sudo dpkg -i **
```

解压
```shell
sudo tar -zxvf *.tar.gz
```

```shell
./zkServer.sh start-foreground
```

xiamen.properties`/home/gehuiling/Code/glink/glink-examples/src/main/resources/mapmathcing/road-types.json`
TileExample:`/home/gehuiling/Code/glink/glink-examples/src/main/resources/xiamen`