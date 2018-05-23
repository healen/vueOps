import axios from "axios"
import  constant  from '@/constant.js'

const interfaceRest =(baseurl=constant.BASE_URL, param=null)=>{
  let head = {
      'DEVOPSUSER':'healen',
      'DEVOPSGROUP':'ec',
  };
  if(param && param.csrfmiddlewaretoken){
    head['X-CSRFToken'] = param.csrfmiddlewaretoken;
    head['X-Requested-With'] = 'XMLHttpRequest';
  }
  return axios.create({
    baseURL:  baseurl,
    timeout: 10000,
    headers: head
  });
};
const httpRequest = (url,method,parma={},baseurl=constant.BASE_URL) =>{
  let ajaxObj = {
    method:method,
    url:url
  };


    //  parma.url =  (url.match(/^http:\/\//) ? url: baseurl+url);
    //  let u = parma.url.split('?');
    // ajaxObj.url = u[0].replace(baseurl, '');
    // parma.method = method;
    // u[1] && u[1].split('&').map((v)=>{
    //    let a = v.split('=');
    //    parma[a[0]] = a[1];
    //  });
    //  baseurl = 'http://www.ttest.com/cc.php' ;
  if(method=='get'&&parma){
    ajaxObj.params=parma
  }else if(method=='post'&&parma){
    ajaxObj.data=parma
  }
  return new Promise(function(resolve,reject){
    interfaceRest(baseurl,parma )(ajaxObj).then(function(res){
      if(res.status==200){
        resolve(res.data)
      }else{
        reject(res.msg)
      }
    },function(e){
      reject(e)
    })
  })
};
export default httpRequest;
