
import axios from 'axios';
import qs from 'qs';

export default function handler(req, resolve) {

  if (req.method === 'POST') {

    const urlAuth = 'https://pbx-guru.web.pbxmaker.ru/index.php/restapi/auth',
          urlCall = 'https://pbx-guru.web.pbxmaker.ru/index.php/restapi/number/call-auth',
          urlApprove = 'https://pbx-guru.web.pbxmaker.ru/index.php/restapi/number/approve',
          dataAuth = qs.stringify({ 'grant_type': 'password', 'scope': 'users', 'client_id': '1kvik', 'client_secret': 'bqnqxnhwdb4' }),
          phoneNumber = qs.stringify({'caller_id': JSON.parse(JSON.stringify(req.body.phone))});

    console.log(phoneNumber)
axios.post(urlAuth, dataAuth, {headers: {
  'content-type': 'application/x-www-form-urlencoded'
}})
.then((res)=> {
    // console.log('Первый then:', res.data)
    const token = res.data.access_token;
    axios.post(urlCall, phoneNumber, {headers: {
      'content-type': 'application/x-www-form-urlencoded', 'Authorization': `Bearer ${token}`
    }})
    .then((res) => {
    // console.log('Второй then:', res.data)
    
    const callerId = res.data.caller_id,
          tmpCallerId = res.data.tmp_caller_id,
          dataApprove = qs.stringify({
            'action': 'call-auth',
            'caller_id': callerId,
            'tmp_caller_id': tmpCallerId
          });
          
    axios.post(urlApprove, dataApprove, {headers: {
      'content-type': 'application/x-www-form-urlencoded', Authorization: `Bearer ${token}`
    }}) 
    .then((res) => {
      // console.log('Третий then:', res.data)
      return (resolve.json(tmpCallerId))
      })
    })
  })
  } else {
    return resolve.status(405).json({message: 'method not allowed'})
  }
}