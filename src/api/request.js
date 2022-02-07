const API_PATH = process.env.REACT_APP_API_PATH;

function request(option){
    return fetch(API_PATH+option.url,{
        headers: new Headers({...option.headers,"Accept":"application/json"}),
        method:option.method,
        body:option.body
    });
}

export default request;