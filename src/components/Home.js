import {Carousel} from 'react-bootstrap';
import { isMobile } from 'react-device-detect';
import styled from 'styled-components';
import 'react-responsive-carousel/lib/styles/carousel.min.css';

import img_1 from '../images/adfg.png';
import img_2 from '../images/aefg24qt.png';
import img_3 from '../images/afsg24g.png';
import img_4 from '../images/aworld_.png';
import img_5 from '../images/cuicui_2.png';

const imgArr = [img_1,img_2,img_3,img_4,img_5];

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