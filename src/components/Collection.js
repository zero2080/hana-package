import {useState} from 'react';
import { BrowserView, MobileView } from 'react-device-detect';
import styled from 'styled-components';
import { Modal } from 'react-bootstrap';
import ModalBody from './ModalBody';

const Wrapper = styled.div`
    display:flex;
    flex-wrap: wrap;
    
    &.jong-coll{
        justify-content: space-between;

        &>div.jong-thumb{
            width:252px;
            height:252px;

            margin-right:5px;

            &:nth-of-type(n+6){
                margin-top:5px;
            }
            &:nth-of-type(5n){
                margin-right:0;
            }
        }
    }

    &.jong-coll-m{
        justify-content: center;

        &>div.jong-thumb{
            width:calc(100% - 50px);
            height:250px;
            margin-bottom:20px;
        }
    }

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
    
    background-position:center;
    background-size:cover;
    background-repeat: no-repeat;
    ${({image})=>`
          background-image: url(${image});
        `
    }
    text-align:center;
    
    

    &:hover{
        &>div{
            display:flex;
        }
    }

    

`;

const Collection = ({collections})=>{
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
    return (<>
        <BrowserView>
            <Wrapper className="jong-coll">
                <Modal show={show} onHide={modalCloser} size="lg">
                    {content&&<ModalBody content={content}/>}
                </Modal>
                {collections.map((each,idx)=>(
                    <Thumbnail className="jong-thumb" image={each.thumb} key={`thumb_${idx}`}>
                        <Overlap onClick={()=>viewDetail(each)}>
                            <p>{each.description}</p>
                            <p>{each.type}</p>
                        </Overlap>
                    </Thumbnail>
                ))}
            </Wrapper>
        </BrowserView>
        <MobileView>
            <Wrapper className="jong-coll-m">
                <Modal show={show} onHide={modalCloser} size="lg">
                    {content&&<ModalBody content={content}/>}
                </Modal>
                {collections.map((each,idx)=>(
                    <Thumbnail className="jong-thumb" image={each.thumb} key={`thumb_${idx}`}>
                        <Overlap onClick={()=>viewDetail(each)}>
                            <p>{each.description}</p>
                            <p>{each.type}</p>
                        </Overlap>
                    </Thumbnail>
                ))}
            </Wrapper>
        </MobileView>
    </>)
}



export default Collection;