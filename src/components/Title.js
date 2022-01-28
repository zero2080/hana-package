import styled from 'styled-components';

const Content = styled.p`
    font-size:32px;
    font-weight:bold;
    text-align:center;
    padding-top:100px;
    margin-bottom:60px;
`;

const Title = ({id,title})=>{
    return <Content id={id} >{title}</Content>
}

export default Title;