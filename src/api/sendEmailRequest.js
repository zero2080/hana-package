import request from './request';

function send (requestBody){
    request({url:'/collection/making-request',headers:{'Content-Type':'application/json'},method:'POST',body:JSON.stringify(requestBody)})
    .then(res=>{
        if(res.ok){
            alert('견적을 요청했습니다.');
        }
    })
}

export default send;