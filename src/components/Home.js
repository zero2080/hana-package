import {Carousel} from 'react-responsive-carousel';
import styled from 'styled-components';
import 'react-responsive-carousel/lib/styles/carousel.min.css';

import img_1 from '../images/adfg.png';
import img_2 from '../images/aefg24qt.png';
import img_3 from '../images/afsg24g.png';
import img_4 from '../images/aworld_.png';
import img_5 from '../images/cuicui_2.png';


const imgArr = [img_1,img_2,img_3,img_4,img_5];

const Wrapper = styled.div`
    width:100%;
    height:500px;
    overflow:hidden;
`;

const Home = (props)=>{

    const onChange = ()=>{
        console.log('change');
    }

    const onClickItem = ()=>{
        console.log('click item');
    }

    const onClickThumb = ()=>{
        console.log('click thumb');
    }

    return <Wrapper>
        <Carousel showThumbs={false} showArrows={true} onChange={onChange} onClickItem={onClickItem} onClickThumb={onClickThumb}>
            {
                imgArr.map((img,idx)=>{
                    return (
                        <div key={`img_${idx}`}>
                            <img src={img} alt="홈 캐러셀"/>
                            <p className="legend">Legend {idx}</p>
                        </div>
                    )
                })
            }
        </Carousel>
    </Wrapper>
}

export default Home;