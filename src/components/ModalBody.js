import { useState,useRef} from 'react';
import {Row,Col,Modal,Form,Button} from 'react-bootstrap';
import styled from 'styled-components';
import guideImg from '../images/making_guide.jpg';

const Wrapper = styled.div`
    width:100%;
    overflow:hidden;
    display:flex;
    flex-direction: column;
    & > img {
        width:100%;
    }
`;

const MailForm = ({sample})=>{
    const [validated,setValidated] = useState(false);
    const emailRef  = useRef();
    const companyRef= useRef();
    const nameRef   = useRef();
    const telRef    = useRef();
    const widthRef  = useRef();
    const heightRef = useRef();
    const depthRef  = useRef();

    const submit =(event)=>{
        event.preventDefault();
        event.stopPropagation();

        let requestBody = {};
        requestBody['email'] = emailRef.current.value;

        console.log(requestBody);
        setValidated(true);
    }

    return(
        <Form style={{"padding":"10px"}} noValidate validated={validated} onSubmit={submit}>
            <Row className="mb-3">
                <Form.Group as={Col} controlId="formWidth">
                    <Form.Label>가로</Form.Label>
                    <Form.Control type="number" required ref={widthRef} min={0}/>
                    <Form.Control.Feedback type="invalid">
                        사이즈는 필수 값입니다.
                    </Form.Control.Feedback>
                </Form.Group>
                <Form.Group as={Col}>
                    <Form.Label>세로</Form.Label>
                    <Form.Control type="number" ref={heightRef} min={0}/>
                </Form.Group>
                <Form.Group as={Col}>
                    <Form.Label>옆면(폭)</Form.Label>
                    <Form.Control type="number" ref={depthRef} min={0}/>
                </Form.Group>
            </Row>
            <Row className="mb-3">
                <Form.Group as={Col}>
                    <Form.Label>Email</Form.Label>
                    <Form.Control type="email" placeholder="name@example.com" ref={emailRef}/>
                </Form.Group>
                <Form.Group as={Col}>
                    <Form.Label>연락처</Form.Label>
                    <Form.Control type="text" ref={telRef}/>
                </Form.Group>
            </Row>
            <Row className="mb-3">
                <Form.Group as={Col}>
                    <Form.Label>이름</Form.Label>
                    <Form.Control type="text" ref={nameRef}/>
                </Form.Group>
                <Form.Group as={Col}>
                    <Form.Label>회사</Form.Label>
                    <Form.Control type="text" ref={companyRef}/>
                </Form.Group>
            </Row>
            <Row className="mb-4">
                <Form.Group as={Col}>
                    <Button type="submit" >견적 요청</Button>
                </Form.Group>
            </Row>
        </Form>
    )
}

const ModalBody = ({content})=>{

    return (
        <>
            <Modal.Header closeButton>
                <Modal.Title>{content.description}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Wrapper>
                    <img src={content.detail} alt="상세 사진"/>
                    <hr/>
                    <img src={guideImg} alt="제작요청 가이드 이미지"/>
                    <hr/>
                    <MailForm/>
                </Wrapper>
            </Modal.Body>
        </>
    )
}

export default ModalBody;