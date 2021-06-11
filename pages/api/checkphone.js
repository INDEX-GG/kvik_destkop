// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { PrismaClient } from "@prisma/client";
import axios from "axios";

var qs =  require('qs');


export default function handler(req, res) {

  if (req.method === 'POST') {
    const phone = JSON.parse(JSON.stringify(req.body.phone));

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
    const data = {'caller_id': phone}
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
      var options = 
      axios.post('/api/regconfirm', {data: {caller: getdata1.tmp_caller_id, phone: getdata1.caller_id}})
    })

  
    })
   
  })
  }
  else {
  return res.status(405).json({message: 'method not allowed'})
  }
}