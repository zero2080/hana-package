import {useState} from 'react';
import styled,{css} from 'styled-components';
import {Modal} from 'react-bootstrap';
import ModalBody from './ModalBody';

const Wrapper = styled.div`
    display:flex;
    flex-wrap: wrap;
    justify-content: space-between;
`;

const Overlap = styled.div`
    background-color:#0000007e;
    margin:0;
    padding:0;
    width:100%;
    height:100%;
    display:none;
    justify-content: center;
    flex-direction: column;
    & > p{
        color:white;
    }
    & > p:nth-of-type(1){
        font-size:18px;
        font-weight:bold;
    }
    &>p:nth-:nth-of-type(2){
        font-size:14px;
    }
`;

const Thumbnail = styled.div`
    width:252px;
    height:252px;
    background-position:center;
    background-size:cover;
    background-repeat: no-repeat;
    ${({image})=>css`
          background-image: url(${image});
        `
    }
    text-align:center;
    
    margin-right:5px;

    &:hover{
        &>div{
            display:flex;
        }
    }

    &:nth-of-type(n+6){
        margin-top:5px;
    }
    &:nth-of-type(5n){
        margin-right:0;
    }
`;


<section class="a b c d">
    <article></article>
    <article></article>
    <div>
        <span>

        </span>
        <p></p>
        <span></span>
        <div>

        </div>
    </div>
</section>

const Collection = ({images},children)=>{

    const [show, setShow] = useState(false);
    const [content,setContent] = useState(null)

    const viewDetail = (product)=>{
        setContent(product);
        setShow(true);
    }

    const modalCloser = ()=>{
        setShow(false);
        setContent(null);
    }
    return (
        <Wrapper>
            <Modal show={show} onHide={modalCloser} size="lg">
                {content&&<ModalBody content={content}/>}
            </Modal>
            {images.map((each,idx)=>
                (<Thumbnail image={each.thumb} key={`thumb_${idx}`}>
                    <Overlap onClick={()=>viewDetail(each)}>
                        <p>{each.description}</p>
                        <p>{each.type}</p>
                    </Overlap>
                </Thumbnail>)
            )}
        </Wrapper>
    )
}



export default Collection;