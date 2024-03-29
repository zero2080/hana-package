import styled from 'styled-components';
import icon_insta from '../images/insta.svg';
import icon_mail from '../images/mail.svg';
import icon_kakao from '../images/kakao.svg';

const Wrapper = styled.div`
    width:100%;
    display:flex;
    justify-content: center;
    ${({isMobile})=>{
        if(isMobile){
            return `
                flex-direction:column;
                align-items:center;
            `;
        }
    }}
`;

const IconWrapper = styled.div`
    width:250px;
    height:250px;
    padding-top:50px;
    text-align:center;
    margin:0 30px;
`;

const RequestChannel = ({insta,mail,kakao,isMobile})=>{
    // TODO: 각 아이콘 클릭시 견적 요청 
    return (
        <Wrapper isMobile={isMobile}>
            <IconWrapper onClick={()=>{
                window.open('https://www.instagram.com/syopingbaeg_/');
            }}>
                <img src={icon_insta} alt="instagram icon"/>
                <p>{insta}</p>
            </IconWrapper>
            <IconWrapper onClick={()=>{
                window.open(`mailto:${mail}?subject=견적 문의.`)
            }}>
                <img src={icon_mail} alt="instagram icon"/>
                <p>{mail}</p>
            </IconWrapper>
            <IconWrapper onClick={()=>{
                window.open('http://pf.kakao.com/_pJPRb/chat');
            }}>
                <img src={icon_kakao} alt="instagram icon"/>
                <p>{kakao}</p>
            </IconWrapper>
        </Wrapper>
    )
}

export default RequestChannel;