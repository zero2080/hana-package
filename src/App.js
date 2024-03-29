import {useState,useEffect} from 'react';
import NavBar from './components/NavBar';
import { isMobile } from 'react-device-detect';
import Home from './components/Home';
import Title from './components/Title';
import Collection from './components/Collection';
import Introduce from './components/Introduce';
import RequestChannel from './components/RequestChannel';
import Blog from './components/Blog';
import Remote from './components/Remote'
import collection from './api/collection';

function App() {

  const [topImages,setTopImages] = useState([]);
  const [collections,setCollections] = useState([]);
  const [blogs,setBlogs] = useState([]);

  useEffect(()=>{
    collection().then(data=>{
      setTopImages(data.topImages);
      setCollections(data.collections);
      setBlogs(data.blogs);
    });
  },[]);

  const requestChannel = {insta:'@syopingbaeg_',mail:'syoping_baeg@naver.com',kakao:'kakao'};


  
  return (
    <div className="App" style={{width:isMobile?undefined:"1280px",margin:"0 auto",overflow:'hidden'}}>
      <NavBar/>
      <Home topImages={topImages}/>
      <Title id="collection" title="컬렉션"/>
      <Collection collections={collections} />
      <Title id="introduce" title="소개"/>
      <Introduce isMobile={isMobile} infomation={{link:'/img/aaaaaa01-aaaa-aaaa-aaaa-aaaaaaaaaa00',background:'/img/aaaaaa01-aaaa-aaaa-aaaa-aaaaaaaaaa01',content:'패키지는 제품과 소비자 사이에 매개체 역할을 하며, 제품의 독특한 브랜드 이미지를 형성하거나 유사 경쟁 제품 사이에서 차별화가 필요한 경우 매우 효과적입니다. 강력한 브랜드 이미지 정립은 다른 제품과의 가격 경쟁에서 보호받을 수 있고, 판매촉직을 유도해 효과적인 마케팅 도구가 됩니다. 제품을 브랜딩하고 패키지에 투자하는 것은 사업  수준을 한 단계 높여주고 제품에 대한 고객들의 호감과 구매의 만족도를 더욱 높여주는 역할을 하고 있습니다.'}} />
      <Title id="request" title="문의"/>
      <RequestChannel {...requestChannel} isMobile={isMobile} />
      <Title id="blog" title="블로그"/>
      <Blog blogs={blogs}/>
      <footer style={{padding:isMobile?'10px':'50px',borderTop:'1px solid lightgray'}}>
        <p style={{fontWeight:'bold'}}>회사명 : 하나 패키지</p>
        <p style={{pading:0,margin:0}}>소재지 : 경기도 파주시 소라지로 95-31 (신촌동 29-17)</p>
        <p style={{padding:0,margin:0}}>주요사업 : 쇼핑백제작 (종이가방)</p>
        <p style={{padding:0,margin:0}}>사업자 번호 : 406-37-01071</p>
        <p style={{padding:0,margin:0}}>통신판매업 신고번호 : 제 2022-경기파주-0517 호</p>
        <p style={{padding:0,margin:0}}>포장상자 제작(칼라박스,싸바리박스,카톤박스)</p>
        <br/>
      </footer>
      <Remote isMobile={isMobile} />
    </div>
  );
}

export default App;
