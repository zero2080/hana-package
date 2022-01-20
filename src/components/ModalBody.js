import {Modal} from 'react-bootstrap';
import styled from 'styled-components';
const Wrapper = styled.div`
    width:100%;
    overflow:hidden;
    display:flex;
    & > img {
        width:100%;
    }
`;
const ModalBody = ({content})=>{
    
    return (
        <>
            <Modal.Header closeButton>
                <Modal.Title>{content.description}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Wrapper>
                    <img src={content.detail} alt="상세 사진"/>
                </Wrapper>
            </Modal.Body>
        </>
    )
}

export default ModalBody;