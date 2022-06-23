import React from 'react';
import { Layout, Typography, Col, Button, Image, Carousel, Divider} from 'antd';
import { Link } from "react-router-dom";

import images from '../../constants/images';

import "./Homepage.css"; 

const { carousel_img1, carousel_img2, carousel_img3 } = images;


const { Title } = Typography;
const { Content } = Layout;


const Homepage = ({ setMenuArray, isMobile }) => {

    const contentStyle = {
        height: 'auto',
        color: '#fff',
        lineHeight: '160px',
        background: 'none',
        
      };
      const carouselStyle ={
        width: "500px",
        borderRadius:'15px',overflow:'hidden',
        height:'330px',
        background:'black',
    }

    return (
        <Layout>
            <div className="page-container center-items"> 
                
                <div className="welcome-header header-margin">
                    <Title>Welcome to Guitar Toolbox</Title>
                    <h2>the app that helps guide you on your guitar journey</h2>
                </div>
                {/*IF PROGRESS STARTED, RENDER PROGRESS HERE */}
                <Content>
                <Col span={16} offset={4}>
                    <div className="hompage-content center items">
                            <Link to="/signup">
                                <Button type="primary" size="large" style={{margin: "1rem"}} onClick={(() => setMenuArray(["dashboard"]))} >Start</Button>
                            </Link>
                            <Divider />
                            <div className="home-about-content" style={{margin: "2rem 0rem"}}>
                                <p>Guitar Toolbox is a great tool for scheduling a practice routine, learning chords and chord progressions, 
                                    new scales, and practicing rhythm. 
                                    With the provided tools, you can master the art of guitar.
                                </p>
                                {!isMobile && 
                                    <h3>Update: We are working on a new User Profile feature to allow players to login and save their progress across devices. 
                                        More tools are also in developement!
                                    </h3>
                                }
                            </div>
                    <div className="center-items" style={{width: "100%"}}>
                    <Carousel style={carouselStyle} autoplay>
                        <div style={contentStyle}>
                            <Image src={carousel_img1} />
                        </div>
                        <div style={contentStyle}>
                            <Image src={carousel_img2} />
                        </div>
                        <div style={contentStyle}>
                            <Image src={carousel_img3} />
                        </div>
                    </Carousel>
                    </div>
                    <div className="hompage-content center items" style={{marginTop: "2rem"}}>
                        <p>Or, jump right in and start practicing!</p>
                            <Link to="/chords">
                                <Button type="default" size="large" style={{margin: "1rem"}} onClick={(() => setMenuArray(["chords"]))} >Guitar Tools</Button>
                            </Link>
                    </div>
                    </div>
                </Col>
                </Content>
            </div>
        </Layout>
    );
}

export default Homepage;
