import NavBar from './components/NavBar';
import Home from './components/Home';
import Title from './components/Title';
import Collection from './components/Collection';
import Introduce from './components/Introduce';
import RequestChannel from './components/RequestChannel';
import Blog from './components/Blog';

import comp_img from './images/vs.png';
import thumb from './images/1fghjd.png';
import bg from './images/itty.png';


function App() {
  const images = [
    {image:thumb,description:'윗줄 설명',type:'쇼핑백'},
    {image:thumb,description:'윗줄 설명',type:'쇼핑백'},
    {image:thumb,description:'윗줄 설명',type:'쇼핑백'},
    {image:thumb,description:'윗줄 설명',type:'쇼핑백'},
    {image:thumb,description:'윗줄 설명',type:'쇼핑백'},
    {image:thumb,description:'윗줄 설명',type:'쇼핑백'},
    {image:thumb,description:'윗줄 설명',type:'쇼핑백'},
    {image:thumb,description:'윗줄 설명',type:'쇼핑백'},
    {image:thumb,description:'윗줄 설명',type:'쇼핑백'},
    {image:thumb,description:'윗줄 설명',type:'쇼핑백'}
  ]

  const requestChannel = {insta:'insta',mail:'hn-package@naver.com',kakao:'kakao'};

  const articles = [
    {image:thumb,title:'상품상품 인거시다. 예시인거시다.20글자가 넘는가?',createdAt:'2021-10-23'},
    {image:thumb,title:'상품상품 인거시다. 예시인거시다.20글자가 넘는가?',createdAt:'2021-10-23'},
    {image:thumb,title:'상품상품 인거시다. 예시인거시다.20글자가 넘는가?',createdAt:'2021-10-23'},
    {image:thumb,title:'상품상품 인거시다. 예시인거시다.',createdAt:'2021-10-23'},
    {image:thumb,title:'상품상품 인거시다. 예시인거시다.20글자가 넘는가?',createdAt:'2021-10-23'},
    {image:thumb,title:'상품상품 인거시다. 예시인거시다.20글자가 넘는가?',createdAt:'2021-10-23'}
  ];

  
  return (
    <div className="App" style={{minWidth:'720px',maxWidth:"1280px",margin:"0 auto"}}>
      <NavBar/>
      <Home/>
      <Title id="collection" title="컬렉션"/>
      <Collection images={images}/>
      <Title id="introduce" title="소개"/>
      <Introduce infomation={{link:comp_img,background:bg,content:'친구라고 해서 불쾌한 말을 해도 된다고 생각하지 말라. 누군가와 가까운 관계가 될수록, 현명하고 예의 바르게 행동하는 것이 중요하다. 가끔 부득이한 경우를 제외하고, 친구로 하여금 불쾌한 말은 적에게서 듣게 놔두라. 적들은 이미 그런 말을 거리낌 없이 할 준비가 되어있다.'}} />
      <Title id="request" title="문의"/>
      <RequestChannel {...requestChannel} />
      <Title id="blog" title="블로그"/>
      <Blog articles={articles}/>
      <footer>
        <p>coperation: hn-package</p>
        <p>하나패키지 푸터</p>
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>
      </footer>
    </div>
  );
}

export default App;
