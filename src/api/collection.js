import request from './request';

function getCollection(){
    return request({url:'/collection',method:'GET',header:new Headers({'Content-Type':'application/json'})}).then(res=>res.json());
}

export default getCollection;