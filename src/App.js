import React from 'react';
import './App.css';
import Map from './component/Map/Map.jsx';
import Sider from './component/Sider/Sider.jsx';
import Realtime from './component/Realtime'

function App() {
  return (
    <div className="App">
      <Map />
      <Sider />
      {/* <Realtime /> */}
    </div>
  );
}

export default App;
