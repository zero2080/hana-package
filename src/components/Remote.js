import styled from "styled-components";
import icon_kakao from '../images/kakao.svg';

const Wrapper = ({isMobile,onClick,children})=>{
    const webStyle = {width:'150px',height:'150px',right:'100px',bottom:'100px'};
    const mobileStyle= {width:'80px',height:'80px',right:'20px',bottom:'20px'};

    return (
        <Base onClick={onClick} style={isMobile?mobileStyle:webStyle}>
            {children}
        </Base>
    )
}

const Base = styled.div`
    position:fixed;
    background-color:#fef01b;
    border-radius:50%;
    display:flex;
    &>p{
        font-weight:bold;
    }
    justify-content: flex-end;
    align-items: center;
    flex-direction: column;
    `;

const Remote = ({isMobile})=>{
    const openKakao = ()=>{
        window.open('http://pf.kakao.com/_pJPRb/chat');
    }
    return (
        <Wrapper isMobile={isMobile} onClick={openKakao}>
            <img style={{width:isMobile?'50%':'605'}} src={icon_kakao} alt="카카오"/>
            <p style={isMobile?{fontSize:'0.8em',marginBottom:'10px'}:undefined}>카톡 문의</p>
        </Wrapper>
    )
}

export default Remote;