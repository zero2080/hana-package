import styled from 'styled-components';
import logo from '../images/introduce_logo.svg'

const Wrapper = styled.div`
${({isMobile})=>{
    if(isMobile){
        return `margin:10px;`
    }else{
        return `margin:0 100px 100px;`
    }
}}
    display:flex;
    justify-content: space-between;
`;

const Thumb = styled.div`
    width:500px;
    height:500px;
    ${({img})=>(`
        background-image:url(${img});
    `)}
    background-position:center;
    background-size:cover;
    background-repeat: no-repeat;
    
    `;

const Info = styled.div`
    display:flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;

const Logo = styled.img`
    width:200px;
    margin-bottom:20px;
`;

const Text = styled.div`
    line-height: 30px;
    ${({isMobile})=>{
        if(isMobile){
            return `
            text-align:left;
            word-break:keep-all;
            `
        }else{
            return `
            text-align:center;
            width:500px;
        `}
    }}
`;

const Banner = styled.div`
    width:100%;
    height:500px;
    background-position:center;
    background-size:cover;
    background-repeat:no-repeat;
    ${({bgImage})=>`
        background-image:url(${bgImage});
    `}

    &>div{
        background-color:#000000dd;
        width:100%;
        height:100%;
        text-align:right;
        display:flex;
        flex-direction: column;
        justify-content: center;

        &>p:nth-of-type(1){
            font-size:60px;
            color:white;
            padding-right:90px;
        }
        &>p:nth-of-type(2){
            font-size:24px;
            color:#A399B3;
            padding-right:100px;
        }
        &>p:nth-of-type(3){
            font-size:24px;
            color:#4E647B;
            padding-right:100px;
        }
    }
    display:flex;
`;

const Introduce = ({isMobile, infomation})=>{
    return (
        <>
            <Wrapper isMobile={isMobile}>
                {
                    !isMobile&&<Thumb img={infomation.link} />
                }
                <Info>
                    <Logo src={logo} alt="회사로고"/>
                    <Text isMobile={isMobile}>
                        {infomation.content}
                    </Text>
                </Info>

            </Wrapper>
            <Banner bgImage={infomation.background}>
                <div>
                    <p>HN PACKAGE</p>
                    <p>맞춤 쇼핑백 제작</p>
                    <p>인쇄 제작 전문</p>
                </div>
            </Banner>
        </>
    );
}

export default Introduce;