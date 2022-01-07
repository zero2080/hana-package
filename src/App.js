import NavBar from './components/NavBar';
import Home from './components/Home';
import Title from './components/Title';
import Collection from './components/Collection';
import thumb from './images/1fghjd.png';
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
  
  return (
    <div className="App" style={{minWidth:'720px',maxWidth:"1280px",margin:"0 auto"}}>
      <NavBar/>
      <Home/>
      <Title title="컬렉션"/>

      <Collection images={images}/>
      <Title title="소개"/>
      <Title title="문의"/>
      <Title title="블로그"/>

    </div>
  );
}

export default App;
