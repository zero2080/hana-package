import styled from 'styled-components';
import icon_insta from '../images/insta.svg';
import icon_mail from '../images/mail.svg';
import icon_kakao from '../images/kakao.svg';

const Wrapper = styled.div`
    width:100%;
    display:flex;
    justify-content: center;
`;

const IconWrapper = styled.div`
    width:250px;
    height:250px;
    padding-top:50px;
    text-align:center;
    margin:0 30px;
`;

const RequestChannel = ({insta,mail,kakao})=>{
    // TODO: 각 아이콘 클릭시 견적 요청 
    return (
        <Wrapper>
            <IconWrapper>
                <img src={icon_insta} alt="instagram icon"/>
                <p>{insta}</p>
            </IconWrapper>
            <IconWrapper>
                <img src={icon_mail} alt="instagram icon"/>
                <p>{mail}</p>
            </IconWrapper>
            <IconWrapper>
                <img src={icon_kakao} alt="instagram icon"/>
                <p>{kakao}</p>
            </IconWrapper>
        </Wrapper>
    )
}

export default RequestChannel;