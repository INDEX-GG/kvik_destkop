// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import axios from "axios";
var qs =  require('qs');

export default function handler(req, res) {
  function enterCode() {
  
  } 

  if (req.method === 'POST') {


const url = 'https://pbx-guru.web.pbxmaker.ru/index.php/restapi/auth'

const data = { 'grant_type': 'password', 'scope': 'users', 'client_id': '1kvik', 'client_secret': 'bqnqxnhwdb4' };
const options = {
  headers: { 'content-type': 'application/x-www-form-urlencoded' },
  data: qs.stringify(data),
  url,
  method: 'POST'
};
axios(options)
  .then((res)=> {
    const url = 'https://pbx-guru.web.pbxmaker.ru/index.php/restapi/number/call-auth'
    var getdata = res.data;
    const data = {'caller_id': req.body.phone}
    const options = {
      headers: { 'content-type': 'application/x-www-form-urlencoded', Authorization: `Bearer ${getdata.access_token}` },
      data: qs.stringify(data),
      url,
      method: 'POST'
    }
    axios(options)
    .then((res) => {
      const url = 'https://pbx-guru.web.pbxmaker.ru/index.php/restapi/number/approve'
    var getdata1 = res.data;
    const data = {
      'action': 'call-auth',
      'caller_id': getdata1.caller_id,
      'tmp_caller_id': getdata1.tmp_caller_id
  }

     const options = {
      headers: { 'content-type': 'application/x-www-form-urlencoded', Authorization: `Bearer ${getdata.access_token}` },
      data: qs.stringify(data),
      url,
      method: 'POST'
    }
    axios(options) 
    .then((res) => {
    
        const url = 'http://localhost:3000/testarea'

        const data = {

          'tmp_caller_id': getdata1.tmp_caller_id
      }
         const options = {
          headers: { 'content-type': 'application/x-www-form-urlencoded', Authorization: `Bearer ${getdata.access_token}` },
          data: qs.stringify(data),
          url,
          method: 'POST'
        }
        axios(options)
    
    })
  
    })
   
  })
  } else {
    // Handle any other HTTP method
  }
}