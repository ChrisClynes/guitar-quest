import React, { startTransition, useState, useEffect, useRef } from 'react';
import { Routes, Route, Link } from "react-router-dom";
import { Homepage, ChordsPage, MyDashboard, ChordProgressions, ScalesPage, MetronomePage } from './components';

import { Layout , Typography, Menu, Button, Drawer } from 'antd';

import { HomeOutlined, DashboardOutlined, MenuOutlined } from '@ant-design/icons';

import logo from './images/guitarlogo.png';

import './App.css';

const { Header, Footer, Sider, Content } = Layout;


const App = () => {
    const [isMobile, setIsMobile] = useState(null)
    const [visible, setVisible] = useState(false);
    const [menuArray, setMenuArray] = useState(["home"]);
    const [isPlaying, setIsPlaying] = useState(false);
    //useRef setsInterval for metronome to be controlled outside of the metronome component pages
    const metronomeInterval = useRef()

    const handleResize = () => {
        if (window.innerWidth < 720) {
            setIsMobile(true)
        } else {
            setIsMobile(false)
        }
      }
    
    useEffect(() => {
        handleResize()
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, [])

    const showDrawer = () => {
        setVisible(true);
      };
    
      const closeDrawer = () => {
        setVisible(false);
      };

    const handleClearMetronome = () => {
        clearInterval(metronomeInterval.current)
        setIsPlaying(false)
    }

    return (
        <div className="app">
            {!isMobile &&
                <Sider theme='light' >
                    <Menu 
                        theme='light'
                        selectedKeys={menuArray}
                        defaultSelectedKeys={["home"]}
                        mode="inline"
                        onClick={((item) => setMenuArray([item.key]))}//set highlighted sider menu item, array will always only contain a single value.
                        >
                        <img src={logo} className="guitar-logo"/>
                        <Typography.Title level={3} style={{ margin: "0rem 1rem 1rem 1rem"}}>
                            Guitar Quest
                        </Typography.Title>
                        <Menu.Item key="home" icon={<HomeOutlined />} >
                            <Link to="/" >Home</Link>
                        </Menu.Item>
                        <Menu.Item key="dashboard" icon={<DashboardOutlined />}>
                            <Link to="/mydashboard" >My Dashboard</Link>
                        </Menu.Item>
                        <Menu.SubMenu key="training-sub" title="Training">
                                <Menu.Item key="chords">
                                    <Link to="/chords">Chords</Link>
                                </Menu.Item>
                                <Menu.Item key="chord-progressions">
                                    <Link to="/chord-progressions">Chord Progressions</Link>
                                </Menu.Item>
                                <Menu.Item key="scales">
                                    <Link to="/scales">Scales</Link>
                                </Menu.Item>
                                <Menu.Item key="metronome">
                                    <Link to="/metronome">Metronome</Link>
                                </Menu.Item>
                        </Menu.SubMenu>
                    </Menu>
                </Sider>
            }
            <div className="main">
                <Layout style={{ height: "100vh", position: "relative", overflow: "hidden"}} >
                <Header>
                    {isPlaying &&
                        <Button type="danger" label="stop" size="large" onClick={() => handleClearMetronome()}>Stop Metronome</Button>
                    }
                {isMobile &&
                    <div className="mobile-menu-btn">
                        <Button type="icon" label="menu" onClick={showDrawer}><MenuOutlined /></Button>
                    </div>
                }
                </Header>
                {isMobile &&
                    <Drawer title="Menu" placement="right" width={"60%"} onClose={closeDrawer} visible={visible}>
                        <Menu>
                            <Menu.Item key="home" icon={<HomeOutlined />} >
                                <Link to="/" onClick={() => closeDrawer()}>Home</Link>
                            </Menu.Item>
                            <Menu.Item key="dashboard" icon={<DashboardOutlined />}>
                                <Link to="/mydashboard" onClick={() => closeDrawer()}>My Dashboard</Link>
                            </Menu.Item>
                            <Menu.Item key="chords">
                                <Link to="/chords" onClick={() => closeDrawer()}>Chords</Link>
                            </Menu.Item>
                            <Menu.Item key="chord-progressions">
                                <Link to="/chord-progressions" onClick={() => closeDrawer()}>Chord Progressions</Link>
                            </Menu.Item>
                            <Menu.Item key="scales">
                                <Link to="/scales" onClick={() => closeDrawer()}>Scales</Link>
                            </Menu.Item>
                            <Menu.Item key="metronome">
                                <Link to="/metronome" onClick={() => closeDrawer()}>Metronome</Link>
                            </Menu.Item>
                        </Menu>
                    </Drawer>
                }
                    <div style={{ height: "100%", position: "relative", overflowY: "auto"}}>
                        <Content style={{paddingBottom: "60px"}}>
                            <Routes>
                                <Route path="/" element={<Homepage setMenuArray={setMenuArray} />} />
                                <Route path="/mydashboard" element={<MyDashboard setMenuArray={setMenuArray} />} />
                                <Route path="/chords" element={<ChordsPage setMenuArray={setMenuArray} />} />
                                <Route path="/chord-progressions" element={<ChordProgressions setMenuArray={setMenuArray} />} />
                                <Route path="/scales" element={<ScalesPage metronomeInterval={metronomeInterval} setMenuArray={setMenuArray} isPlaying={isPlaying} setIsPlaying={setIsPlaying}/>} />
                                <Route path="/metronome" element={<MetronomePage metronomeInterval={metronomeInterval} setMenuArray={setMenuArray} isPlaying={isPlaying} setIsPlaying={setIsPlaying} />} />
                            </Routes>
                        </Content>
                        </div>
                    <Footer style={{
                        position: "absolute",
                        left: 0,
                        bottom: 0,
                        right: 0
                    }}>
                        <Typography.Title level={5} style={{ textAlign: 'center' }}>
                            2022 Guitar Quest
                        </Typography.Title>
                    </Footer>
                </Layout>
            </div>
        </div>
    )
}

export default App;