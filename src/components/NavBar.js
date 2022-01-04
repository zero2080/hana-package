import {useState} from 'react';
import styled from 'styled-components';
import logo from '../images/logo.svg'

const Wrapper = styled.header`
    max-width:1280px;
    margin-top: 60px;
    margin-bottom: 30px;
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    position:sticky;
`;

const NavMenuBtn = styled.span`
    overflow:hidden;
    margin-left:50px;
    font-size:18px;
    font-weight:bold;
    cursor:pointer;
    transition:.1s;
    &.active{
        color:#A399B3;
    }
`;

const NavBar = ()=>{
    const [navMenu,setNavMenu] = useState([
        {active:true,name:'홈'},
        {active:false,name:'컬렉션'},
        {active:false,name:'소개'},
        {active:false,name:'문의'},
        {active:false,name:'블로그'}
    ]);

    const menuClick = (event)=>{
        let thisContent = event.currentTarget.innerText;
        let menu = navMenu.map(elem=>(elem.name===thisContent?{...elem,active:true}:{...elem,active:false}));
        setNavMenu(menu);
    }
    return (<Wrapper>
        <img src={logo} alt="Logo"/>
        <nav>
            {navMenu.map((menu,idx)=><NavMenuBtn key={`nav_${idx}`} onClick={menuClick} className={menu.active?"active":undefined}>{menu.name}</NavMenuBtn>)}
        </nav>
    </Wrapper>)
};

export default NavBar;