import React from 'react';
import { Layout, Menu } from 'antd';
import { StarOutlined, SettingOutlined, AlertOutlined, MonitorOutlined } from '@ant-design/icons';
import './Channels.css';
import L, { LayerGroup,GridLayer } from 'leaflet';
import 'leaflet-draw';
import {
  BrowserRouter as Router,
  Switch,
  Link,
  Route,
  Redirect
} from "react-router-dom";

import { connect } from 'react-redux';

const parse = require('wellknown');

const { Sider } = Layout;


/**
 * 侧边功能栏组件
 */
class Channels extends React.Component {
  constructor(props) {
    super(props)
  }
  state = {
    collapsed: false,
    operationSelected: '',
  };

  onCollapse = (collapsed) => {
    // console.log(collapsed);
    this.setState({ collapsed });   
  }

  componentDidMount() {
    this.reveiveTopics();
  }

  reveiveTopics = () => {
    var ws = new WebSocket(`ws://127.0.0.1:3002/mapmatching`);

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
        <Switch>
          <React.Fragment>
            <Route path="/" exact />
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
                      <span> 实时地图匹配 </span>
                    </Link>
                  </Menu.Item>

                  <Menu.Item key="congestion">
                    <Link to='/congestion'>
                      <SettingOutlined />
                      <span> 拥堵计算 </span>
                    </Link>
                  </Menu.Item>

                  <Menu.Item key="heatmap">
                    <Link to='/heatmap'>
                      <AlertOutlined />
                      <span> 热力图计算 </span>
                    </Link>
                  </Menu.Item>
                  <Menu.Item key="stsearch">
                    <Link to='/stsearch'>
                      <MonitorOutlined />
                      <span> 时空查询 </span>
                    </Link>
                  </Menu.Item>
                </Menu>
              </Sider>
            </Layout>
            <Redirect to="/" />
          </React.Fragment>
        </Switch>
      </Router>
    );
  }
}

const mapStateToProps = state => {
  console.log(state.basemap.mapObj);
  return { mapObj: state.basemap.mapObj };
}

export default connect(
  mapStateToProps,
  null
)(Channels);