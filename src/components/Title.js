import styled from 'styled-components';

const Content = styled.p`
    font-size:32px;
    font-weight:bold;
    text-align:center;
    margin-top:150px;
    margin-bottom:60px;
`;

const Title = ({title})=>{
    return <Content>{title}</Content>
}

export default Title;