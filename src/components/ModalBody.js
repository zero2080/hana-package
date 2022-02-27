import { useState,useRef} from 'react';
import sendEmailRequest from '../api/sendEmailRequest';
import {Row,Col,Modal,Form,Button} from 'react-bootstrap';
import styled from 'styled-components';
import guideImg from '../images/making_guide.png';

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
    const [emailValidMessage,setEmailValidMessageset] = useState('이메일을 입력해주세요.');
    const widthRef  = useRef();
    const heightRef = useRef();
    const depthRef  = useRef();
    const emailRef  = useRef();
    const telRef    = useRef();
    const companyRef= useRef();
    const nameRef   = useRef();
    
    const countRef  = useRef();

    const emailHandler= (e)=>{
        let em = e.currentTarget.value;
        if(em.trim()===''){
            setEmailValidMessageset('이메일을 입력해 주세요.');
        }else if(!/^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/.test(em)){
            setEmailValidMessageset('이메일 형식이 아닙니다.');
        }
    }

    const submit =(event)=>{
        event.preventDefault();
        event.stopPropagation();

        let width   = widthRef.current.value;
        let height  = heightRef.current.value;
        let depth   = depthRef.current.value;
        let email   = emailRef.current.value.trim();
        let tel     = telRef.current.value.trim().replace(/[^0-9]/gi,'').trim();
        let company = companyRef.current.value.trim();
        let name    = nameRef.current.value.trim();
        let count   = countRef.current.value;

        let totalValid = [false,false,false];

        if(email.length===0){
            setEmailValidMessageset('이메일을 입력해 주세요.');
        }else if(!/^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/.test(email)){
            console.warn('e2')
            setEmailValidMessageset('이메일 형식이 아닙니다.');
        }else{
            totalValid[0]=true;
        }

        if(tel.length<7){
            console.warn('t1')
            setValidated(true);
        }else{
            totalValid[1]=true;
        }
        
        if(name.length===0){
            console.warn('n1')
            setValidated(true);
        }else{
            totalValid[2]=true;
        }
        

        if(totalValid[0]&&totalValid[1]&&totalValid[2]){
            let requestBody = {sample:sample};
            requestBody['name']=name;
            requestBody['width'] = width===''?0:width;
            requestBody['height'] = height===''?0:height;
            requestBody['depth'] = depth===''?0:depth;
            requestBody['tel'] = tel;
            requestBody['company'] = company;
            if(count!==''){
                requestBody['count'] = count;
            }
            requestBody['email'] = email;
            sendEmailRequest(requestBody);
            setValidated(false);

        }else{
            setValidated(true);
        }

    }

    return(
        <Form style={{"padding":"10px"}} noValidate validated={validated} onSubmit={submit}>
            <Row className="mb-3">
                <Form.Group as={Col} controlId="formWidth">
                    <Form.Label>가로</Form.Label>
                    <Form.Control type="number" ref={widthRef} min={0}/>
                </Form.Group>
                <Form.Group as={Col}>
                    <Form.Label>옆면(폭)</Form.Label>
                    <Form.Control type="number" ref={depthRef} min={0}/>
                </Form.Group>
                <Form.Group as={Col}>
                    <Form.Label>세로</Form.Label>
                    <Form.Control type="number" ref={heightRef} min={0}/>
                </Form.Group>
            </Row>
            <Row className="mb-3">
                <Form.Group as={Col}>
                    <Form.Label>Email</Form.Label>
                    <Form.Control type="text" required pattern='^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$' onChange={emailHandler} placeholder="name@example.com" ref={emailRef}/>
                    <Form.Control.Feedback type="invalid">
                        {emailValidMessage}
                    </Form.Control.Feedback>
                </Form.Group>
                <Form.Group as={Col}>
                    <Form.Label>연락처</Form.Label>
                    <Form.Control 
                        type="text" 
                        pattern="[0-9]{7,11}$" 
                        onChange={(e)=>{
                            telRef.current.value=e.currentTarget.value.replace(/[^0-9]/gi,'');
                        }} required ref={telRef}/>
                    <Form.Control.Feedback type="invalid">
                        연락처를 입력해 주세요.
                    </Form.Control.Feedback>
                </Form.Group>
            </Row>
            <Row className="mb-3">
                <Form.Group as={Col}>
                    <Form.Label>이름</Form.Label>
                    <Form.Control type="text" required ref={nameRef}/>
                    <Form.Control.Feedback type="invalid">
                        이름을 입력해 주세요.
                    </Form.Control.Feedback>
                </Form.Group>
                <Form.Group as={Col}>
                    <Form.Label>회사</Form.Label>
                    <Form.Control type="text" ref={companyRef}/>
                </Form.Group>
            </Row>
            <Row className="mb-4">
                <Form.Group as={Col}>
                    <Form.Label>수량</Form.Label>
                    <Form.Control type="number" ref={countRef}/>
                </Form.Group>
                <Form.Group as={Col}>
                    <Button size="lg" style={{width:'100%',height:'100%'}} type="submit" >견적 요청</Button>
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
                    {
                        content.detail.map((detail,idx)=>(
                            <div key={`col_det_${idx}`}>
                                <img src={detail} alt="상세 사진" style={{width:'100%'}}/>
                                <hr/> 
                            </div>
                        ))
                    }
                    <img src={guideImg} alt="제작요청 가이드 이미지"/>
                    <hr/>
                    <MailForm sample={content.description}/>
                </Wrapper>
            </Modal.Body>
        </>
    )
}

export default ModalBody;