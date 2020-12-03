import React from 'react';
import { Button, Layout, Menu } from 'antd';
import { StarOutlined, SettingOutlined, AlertOutlined, MonitorOutlined, ClearOutlined } from '@ant-design/icons';
import './Channels.css';
import L from 'leaflet';
import 'leaflet-draw';
import {
  BrowserRouter as Router,
  Switch,
  Link,
  Route,
  Redirect,

} from "react-router-dom";

import { connect } from 'react-redux';
import Mapmatch from '../ShowLayer/Mapmatch';
import Heatmap from '../ShowLayer/Heatmap';

const parse = require('wellknown');

const { Sider } = Layout;


/**
 * 侧边功能栏组件
 */
class Channels extends React.Component {
  constructor(props) {
    super(props);
  }
  state = {
    collapsed: false,
    operationSelected: '',
  };

  onCollapse = (collapsed) => {
    // console.log(collapsed);
    this.setState({ collapsed });
    // console.log(this.props.mapObj);

  }

  componentDidMount() {
    // this.reveiveTopics();
  }

  reveiveTopics = () => {
    var ws = new WebSocket(`ws://127.0.0.1:3002/streamviz`);

    ws.onopen = e => {
        console.log(`WebSocket 连接状态： ${ws.readyState}`);
    }
    var mapmatchingLayer;
    var layerGrop = new L.layerGroup();
    ws.onmessage = message => {
      let mapmatching_point = JSON.parse(message.data);
      let lng = parse(mapmatching_point["point"]).coordinates[0];
      let lat = parse(mapmatching_point["point"]).coordinates[1];
      // console.log(lng,lat);
      (L.circle(L.latLng(lat, lng), 2, {
        color: '#DC143C',
        fillColor: '#DC143C',
        fillOpacity: 0.2
      })).addTo(layerGrop);
      layerGrop.addTo(this.props.mapObj);
      // console.log(layerGrop);
      // mapmatchingLayer.addTo(this.props.mapObj);
    }

    ws.onclose = message => {
        console.log(`WebSocket连接已关闭:${ws.readyState}`)
    }
  }

  handleClick = (e) => {
    // console.log('click ', e);
    // console.log(e.key);
    // this.initWebsocket(e.key);
    // console.log(this.props.mapObj);
  }

  render() {
    return (
      <Router>
        {/* <Switch> */}
          <React.Fragment>
            {/* <Route path="/" exact /> */}
            <Layout style={{ minHeight: '100vh', background: 'rgba(255,255,255,0.08)' }}>
              <Sider
                collapsible
                collapsed={this.state.collapsed}
                onCollapse={this.onCollapse}
                style={{ background: 'rgba(255,255,255,0.08)' }}
              >
                <Menu
                  theme="dark"
                  defaultSelectedKeys={[]}
                  mode="inline"
                  style={{ background: 'rgba(255,255,255,0.08)' }}
                  onClick={this.handleClick}
                // selectedKeys={[this.state.current]}
                >
                  <Menu.Item key="mapmatching">
                    <Link to='/mapmatching'>
                      <StarOutlined />
                      <span> 流式地图匹配 </span>
                    </Link>
                  </Menu.Item>

                  <Menu.Item key="heatmap">
                    <Link to='/heatmap'>
                      <SettingOutlined />
                      <span> 实时汇聚 </span>
                    </Link>
                  </Menu.Item>

                  <Menu.Item key="congestion">
                    <Link to='/congestion'>
                      <AlertOutlined />
                      <span> 路段拥堵计算 </span>
                    </Link>
                  </Menu.Item>

                  <Menu.Item key="addmore">
                    <Link to='/addmore'>
                      <MonitorOutlined />
                      <span> 更多... </span>
                    </Link>
                  </Menu.Item>
                </Menu>
              </Sider>
            </Layout>

            <Switch>
              <Route path="/" exact />
              <Route path="/mapmatching" component={Mapmatch} />
              <Route path="/heatmap" component= { Heatmap } />
              <Route path="/congestion" component="" />
              <Route path="/addmore" component="" />
            </Switch>
            {/* <Redirect to="/" /> */}
          </React.Fragment>
      </Router>
    );
  }
}

const mapStateToProps = state => {
  // console.log(state.basemap.mapObj);
  return { mapObj: state.basemap.mapObj };
}

export default connect(
  mapStateToProps,
  null
)(Channels);