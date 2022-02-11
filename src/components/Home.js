import {Carousel} from 'react-bootstrap';
import { isMobile } from 'react-device-detect';
import styled from 'styled-components';
import 'react-responsive-carousel/lib/styles/carousel.min.css';

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


const Home = ({topImages})=>{
    return (
    <Wrapper>
        <Carousel>
            {
                topImages.map((img,idx)=>{
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