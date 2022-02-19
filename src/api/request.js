
const API_PATH ='https://hana-api.syopingbaeg.com';

const request = async (option)=>{
    let token = sessionStorage.getItem('accessToken');

    let url = API_PATH+option.url;

    if(option.params){
        for(let idx in option.params){
            if(idx===0){
                url+='?';
            }else{
                url+='&'
            }
            url+=`${option.params[idx].key}=${option.params[idx].value}`;
        }
    }

    return fetch(url,{
        headers:new Headers({'Content-Type':'application/json','Accept':'application/json','authorization':token}),
        method:option.method,
        body:JSON.stringify(option.body)
    }).then(res=>{
        if(option.method==='GET'){
            return res.json();
        }else{
            return res;
        }
    });
}

export default request;