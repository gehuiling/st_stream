import React from 'react';
import { Layout, Menu } from 'antd';
import { StarOutlined, SettingOutlined, AlertOutlined, MonitorOutlined } from '@ant-design/icons';
import './Channels.css';
import {
  BrowserRouter as Router,
  Switch,
  Link,
  Route,
  Redirect
} from "react-router-dom";

const {  Sider } = Layout;


class Channels extends React.Component {
  state = {
    collapsed: false,

  };

  onCollapse = (collapsed) => {
    // console.log(collapsed);
    this.setState({ collapsed });
  }

  handleClick = (e) => {
    // console.log('click ', e);
    console.log(e.key);
  }

  render() {
    return (
      <Router>
      <Switch>
      <React.Fragment>
      <Route path="/" exact />
      <Layout style={{ minHeight: '100vh' ,background:'rgba(255,255,255,0.08)' }}>
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

export default Channels;