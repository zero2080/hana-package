const API_PATH = 'http://localhost:8080';
// const API_PATH = 'http://hanapackageeb-env.eba-sduwzjf3.ap-northeast-2.elasticbeanstalk.com';

function request(option){
    return fetch(API_PATH+option.url,{
        headers: new Headers({...option.headers,"Accept":"application/json"}),
        method:option.method,
        body:option.body
    }).then(res=>res.json());
}

export default request;