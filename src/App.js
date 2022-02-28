import {useState,useEffect,useRef} from 'react';
import {Form,FormControl,Row,Col,Button,Container,Table,InputGroup} from 'react-bootstrap';
import login from './api/login';
import request from './api/request';
import {format} from 'date-fns';

const API_PATH =process.env.REACT_APP_API_PATH;

const Wrapper = ({children})=>{
  return (
    <div style={{display:'flex',justifyContent: 'center',alignItems: 'center'}}>
      {children}
    </div>
  )
}

const FileInput = ({className})=>{
  return <input type="file" className={className} />
}

function App() {

  const [logined,setLogined] = useState(false);
  const [top,setTop] = useState([]);
  const [collection,setCollection] = useState([]);
  const [blog,setBlog] = useState([]);
  
  const [colTitle,setColTitle] = useState('');
  const [colType,setColType] = useState('');
  const [colFileArr,setColFileArr] = useState([FileInput,FileInput]);
  const [blogTitle,setBlogTitle] = useState('');
  const [blogLink,setBlogLink] = useState('');
  
  const [adminBefore,setAdminBefore] = useState('');
  const [adminAfter,setAdminAfter] = useState('');
  const [pwdValidated,setPwdValidated] = useState(false);
  
  const topRef = useRef();
  const blogRef = useRef();
  const introProdRef = useRef();
  const introBgRef = useRef();

  const onSubmit=(e)=>{
    e.preventDefault();
    e.stopPropagation();
    let username = e.target[0].value;
    let password = e.target[1].value;
    login({username:username,password:password}).then(result=>{
      setLogined(result);
    });
  }

  const addFileInput=()=>{
    setColFileArr([...colFileArr,FileInput]);
  }

  useEffect(()=>{
    let token = sessionStorage.getItem('accessToken');
    if(token!==null){
      setLogined(true);
    }else{
      setLogined(false);
    }

    request({url:'/landing',method:'GET'}).then(data=>{
      setTop(data.topImages);
      setBlog(data.blogs);
      setCollection(data.collections);
    });
  },[setLogined])

  const delTop=(id)=>{
    request({url:`/admin/top/${id}`,method:'DELETE'}).then(res=>{
      if(res.ok){
        let tmp = top.filter(elem=>elem.indexOf(id)===-1);
        setTop(tmp);
      }
    });

  }
  
  const delCol=(id)=>{
    request({url:`/admin/collection/${id}`,method:'DELETE'}).then(res=>{
      if(res.ok){
        let tmp = collection.filter(elem=>elem.id!==id);
        setCollection(tmp);
      }
    });
  }
  
  const delBlog=(id)=>{
    request({url:`/admin/blog/${id}`,method:'DELETE'}).then(res=>{
      if(res.ok){
        let tmp = blog.filter(elem=>elem.id!==id);
        setBlog(tmp);
      }});
  }

  const uploadTop = async ()=>{
    let formData = new FormData();
    let file=topRef.current.files[0];
    formData.append('thumb',file,file.name);

    await fetch(`${API_PATH}/admin/top`,{
      method:'POST',
      headers:new Headers({'accept':'application/json','Authorization':sessionStorage.getItem('accessToken')}),
      body:formData}).then(res=>{
        if(res.ok){
          alert('업로그가 완료되었습니다.');
          window.location.reload();
        }
      }).catch(e=>{
        console.error(e);
      });
  }

  const uploadCollection = async ()=>{
    let formData = new FormData();

    formData.append('title',colTitle);
    formData.append('type',colType);

    await window.document.querySelectorAll('.col-file').forEach(col=>{
      formData.append('files',col.files[0]);
    });

    await fetch(`${API_PATH}/admin/collection`,{
      method:'POST',
      headers:new Headers({'accept':'application/json','Authorization':sessionStorage.getItem('accessToken')}),
      body:formData}).then(res=>{
        console.log(res);
        if(res.ok){
          alert('업로드가 완료되었습니다.');
          window.location.reload();
        }
      }).catch(e=>{
        console.error(e);
      });
  }

  const uploadBlog = async ()=>{

    let formData = new FormData();
    let file=blogRef.current.files[0];

    formData.append('thumb',file,file.name);
    formData.append('title',blogTitle);
    formData.append('link',blogLink);

    await fetch(`${API_PATH}/admin/blog`,{
      method:'POST',
      headers:new Headers({'accept':'application/json','Authorization':sessionStorage.getItem('accessToken')}),
      body:formData}).then(res=>{
        console.log(res);
        if(res.ok){
          alert('업로그가 완료되었습니다.');
          window.location.reload();
        }
      }).catch(e=>{
        console.error(e);
      });
  }

  const uploadIntroduce = async (type)=>{
    let formData = new FormData();
    let file = type==='product'?introProdRef.current.files[0]:introBgRef.current.files[0];

    formData.append('file',file,file.name);

    await fetch(`${API_PATH}/admin/introduce/${type}`,{
      method:'PUT',
      headers:new Headers({'accept':'application/json','Authorization':sessionStorage.getItem('accessToken')}),
      body:formData}).then(res=>{
        console.log(res);
        if(res.ok){
          alert('파일 변경 완료');
        }
      }).catch(e=>{
        console.error(e);
      });
  }

  return <Wrapper>
    {logined?(
      <Container>
        <h1>상단 베너</h1>
        <article>
          <section>
            <Table>
              <thead>
                <tr>
                  <th>번호</th>
                  <th>link</th>
                  <th>삭제</th>
                </tr>
              </thead>
              <tbody>
                {
                  top.map((img,idx)=>(
                    <tr key={`top_${idx}`}>
                      <td>{idx+1}</td>
                      <td><img src={img} alt="상단 배너" width="200px" height="50px"/></td>
                      <td><input type="button" onClick={()=>delTop(img.substring(img.lastIndexOf('/')+1,img.lastIndexOf('.')))} value="삭제" /></td>
                    </tr>
                  ))
                }
              </tbody>
            </Table>
          </section>
          <section>
            <input type="file" ref={topRef}/>
            <input type="button" onClick={uploadTop} value="업로드"/>
          </section>
          <hr/>
          <h1>컬렉션</h1>
          <section>
            <Table>
              <thead>
                <tr>
                  <th>번호</th>
                  <th>제목</th>
                  <th>작성일</th>
                  <th>삭제</th>
                </tr>
              </thead>
              <tbody>
                {collection.map((col,idx)=>(
                  <tr key={`col_${idx}`}>
                    <td>{idx+1}</td>
                    <td>{col.description}</td>
                    <td>{format(new Date(col.createdAt),'yyyy-MM-dd')}</td>
                    <td><input type="button" value="삭제" onClick={()=>delCol(col.id)} /></td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </section>
          <section>
            <InputGroup>
              <InputGroup.Text id="colTitleInputGroup">제목</InputGroup.Text>
              <FormControl
                type="text"
                placeholder="콜렉션 제목"
                aria-label="collection title field"
                aria-describedby="colTitleInputGroup"
                value={colTitle} onChange={(e)=>setColTitle(e.target.value)}
              />
            </InputGroup>
            <InputGroup>
              <InputGroup.Text id="colTypeInputGroup">타입</InputGroup.Text>
              <FormControl
                type="text"
                placeholder="콜렌션 타입 | ex) 쇼핑백"
                aria-label="collection type field"
                aria-describedby="colTypeInputGroup"
                value={colType} onChange={(e)=>setColType(e.target.value)}
              />
            </InputGroup>
            <div style={{display:'flex'}}>
              <div >
                {
                  colFileArr.map((Input,idx)=>{
                    if(idx===0){
                      return (<label key={`col-file-${idx}`} style={{margin:'10px 0',border:'1px dashed black'}}>
                        대표 이미지입니다. 자동으로 썸네일을 생성합니다.
                        <Input className="col-file"/>
                      </label>)
                    }else{
                      return <Input key={`col-file-${idx}`} className="col-file"/>
                    }
                  })
                }
              </div>
              <div style={{display:'flex',padding:'40px 10px 10px'}}>
                <input type="button" onClick={addFileInput} value="파일추가"/>
              </div>
            </div>
            <Button onClick={uploadCollection} >업로드</Button>
          </section>
          <hr/>
          <h1>소개 </h1>
          <section>
            <article>
              <h2>소개 좌측 샘플이미지</h2>
              <input type="file" ref={introProdRef}/>
              <input type="button" onClick={()=>uploadIntroduce('product')} value="업로드" />
            </article>
            <article>
              <h2>소개 백그라운드</h2>
              <input type="file" ref={introBgRef}/>
              <input type="button" onClick={()=>uploadIntroduce('background')} value="업로드" />
            </article>
          </section>
          <hr/>
          <h1>블로그</h1>
          <section>
            <Table>
              <thead>
                <tr>
                  <th>번호</th>
                  <th>제목</th>
                  <th>작성일</th>
                  <th>삭제</th>
                </tr>
              </thead>
              <tbody>
                {
                  blog.map((b,idx)=>(
                    <tr key={`blog_${idx}`}>
                      <td>{idx+1}</td>
                      <td>{b.title}</td>
                      <td>{format(new Date(b.createdAt),'yyyy-MM-dd')}</td>
                      <td><input type="button" value="삭제" onClick={()=>delBlog(b.id)}/></td>
                    </tr>
                  ))
                }
              </tbody>
            </Table>
          </section>
          <section>
            <input type="file" ref={blogRef}/>
            <InputGroup>
              <InputGroup.Text id="btnGroupAddon">제목</InputGroup.Text>
              <FormControl
                type="text"
                placeholder="blog title"
                aria-label="blog title field"
                aria-describedby="btnGroupAddon"
                value={blogTitle} onChange={(e)=>setBlogTitle(e.target.value)}
              />
            </InputGroup>
            <InputGroup>
              <InputGroup.Text id="btnGroupAddon">링크</InputGroup.Text>
              <FormControl
                type="text"
                placeholder="http://blog.naver.com/syoping-baeg"
                aria-label="link address field"
                aria-describedby="btnGroupAddon"
                value={blogLink}
                onChange={(e)=>setBlogLink(e.target.value)}
              />
            </InputGroup>
            <input type="button" onClick={uploadBlog} value="업로드" />
          </section>
          <hr/>
          <h1>계정관리</h1>
          <section>
            <InputGroup>
              <InputGroup.Text id="adminInputBefore">기존 비밀번호</InputGroup.Text>
              <FormControl
                type="password"
                placeholder="기존 비밀번호"
                aria-label="before password"
                aria-describedby="adminInputBefore"
                value={adminBefore} onChange={(e)=>setAdminBefore(e.target.value)}
              />
            </InputGroup>
            <InputGroup>
              <InputGroup.Text id="adminInputAfter">변경할 비밀번호</InputGroup.Text>
              <FormControl
                type="password"
                placeholder="변경할 비밀번호"
                aria-label="after password"
                aria-describedby="adminInputAfter"
                value={adminAfter}
                onChange={(e)=>setAdminAfter(e.target.value)}
              />
            </InputGroup>
            <InputGroup>
              <InputGroup.Text id="adminInputCheck">비밀번호 확인</InputGroup.Text>
              <FormControl
                type="password"
                placeholder="변경할 비밀번호 확인"
                aria-label="change password check"
                aria-describedby="adminInputCheck"
                onChange={(e)=>{
                  let chkPwd = e.target.value;
                  if(chkPwd===adminAfter){
                    setPwdValidated(true);
                  }else{
                    setPwdValidated(false);
                  }
                }}
              />
            </InputGroup>
            <Button onClick={()=>{
              if(pwdValidated){
                let body = {before:adminBefore,after:adminAfter};
                
                request({url:'/admin/profile',method:'PUT',body:body}).then(res=>{
                  if(res.ok){
                    alert('비밀번호변경이 완료되었습니다.');
                  }else{
                    console.log(res);
                    res.json().then(data=>{
                      console.log(data);
                    })
                  }
                })
                console.log(body);
              }else{
                alert('비밀번호를 확인해 주세요.');
              }
            }}>비밀번호 변경</Button>
          </section>
        </article>
      </Container>
    ):(
      <Form style={{padding:'20px'}} onSubmit={onSubmit}>
        <Row className="mb-4">
          <Form.Group as={Col} >
            <Form.Label>아이디</Form.Label>
            <Form.Control />
          </Form.Group>
        </Row>
        <Row className="mb-4">
          <Form.Group as={Col} >
            <Form.Label>비밀번호</Form.Label>
            <Form.Control type="password"/>
          </Form.Group>
        </Row>
        <Row>
          <Form.Group as={Col} >
            <Button size="lg" style={{width:'100%',height:'100%'}} type="submit" >로그인</Button>
          </Form.Group>
        </Row>
      </Form>
    )}
    </Wrapper>
  
}

export default App;
