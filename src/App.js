import React from 'react';
import './App.css';
import Basemap from './component/Basemap/Basemap';
import Sider from './component/Sider/Sider';

function App() {
    return ( 
        <div className = "App" >
            <Basemap />
            <Sider />
        </div>
    );
}

export default App;