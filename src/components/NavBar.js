import {useState} from 'react';
import { isMobile } from 'react-device-detect';
import {Navbar,Container} from 'react-bootstrap';
import styled from 'styled-components';
import logo from '../images/logo.svg'

const NavMenuBtn = styled.a`
    overflow:hidden;
    margin-left:50px;
    font-size:18px;
    font-weight:bold;
    text-decoration:none;
    color:black;
    transition:.1s;

    &.active{
        color:#A399B3;
    }

`;

const NavBar = ()=>{
    const [navMenu,setNavMenu] = useState([
        {active:true,name:'홈',target:''},
        {active:false,name:'컬렉션',target:'collection'},
        {active:false,name:'소개',target:'introduce'},
        {active:false,name:'문의',target:'request'},
        {active:false,name:'블로그',target:'blog'}
    ]);

    const style = isMobile?{paddingTop:'10px'}:{paddingTop:'10px',maxWidth:'1280px',margin:'0 auto'};
    
    const menuClick = (event)=>{
        
        let thisContent = event.currentTarget.innerText;
        let menu = navMenu.map(elem=>{
            if(elem.name===thisContent){
                if(elem.target!==''){
                    window.document.getElementById(elem.target).scrollIntoView();
                }
                return {...elem,active:true};
            }else{
                return {...elem,active:false};
            }
        });
        setNavMenu(menu);
    }
    return (
        <Navbar bg="white" fixed="top" style={style}>
            <Container fluid>
            <img src={logo} alt="Logo" height={isMobile?"70px":undefined}/>
            {
                !isMobile&&<nav>
                    {navMenu.map((menu,idx)=><NavMenuBtn key={`nav_${idx}`} href={`#${menu.target}`} onClick={menuClick} className={menu.active?"active":undefined}>{menu.name}</NavMenuBtn>)}
                </nav>
            } 
            </Container>
        </Navbar>
    )
};

export default NavBar;