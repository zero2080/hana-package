const API_PATH = 'http://localhost:8080';
// const API_PATH = 'https://hana-api.syopingbaeg.com';

function request(option){
    return fetch(API_PATH+option.url,{
        headers: new Headers({...option.headers,"Accept":"application/json"}),
        method:option.method,
        body:option.body
    });
}

export default request;