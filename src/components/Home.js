import {useState,useEffect} from 'react';
import {Carousel} from 'react-bootstrap';
import { isMobile } from 'react-device-detect';
import styled from 'styled-components';
import 'react-responsive-carousel/lib/styles/carousel.min.css';

import carou_0 from '../images/1.png';
import carou_1 from '../images/2.png';
import carou_2 from '../images/18.png';

const Wrapper = styled.div`
    width: 100%;
    height: 500px;
    overflow: hidden;
    margin-bottom: ${isMobile?'100px':'180px'};
    top: ${isMobile?'100px':'150px'};
    position: relative;
`;

const Image = styled.div`
        overflow:hidden;
        width:100%;
        height:500px;
        ${({img})=>`
            background-image:url('${img}');
        `}
        background-position:center;
        background-repeat: no-repeat;
        background-size: cover;
    `;


const Home = (props)=>{
    const imgArr = [carou_0,carou_1,carou_2];

    useEffect(()=>{
        console.log('aa')
    },[]);
    return (
    <Wrapper>
        <Carousel>
            {
                imgArr.map((img,idx)=>{
                    return (
                        <Carousel.Item key={`img_${idx}`}>
                            <Image img={img}/>
                        </Carousel.Item>
                    )
                })
            }
        </Carousel>
    </Wrapper>
    )
}

export default Home;