import axios from 'axios'
import Head from 'next/head'
import Image from 'next/image'
import { useState } from 'react'
var qs =  require('qs');
export default function TestArea(req, res) {
const [phone, setPhone] = useState();
const [name, setName] = useState();
const [password, setPassword] = useState();
  function sendRegData(event) {
    event.preventDefault()
   let data = {
     name: name,
     phone: phone,
     password: password
   }
   const url = 'http://localhost:3000/api/register'
   const options = {
    headers: { 'content-type': 'application/x-www-form-urlencoded' },
    data: qs.stringify(data),
    url,
    method: 'POST'
   }
   axios(options)
  }

  if(req.method === 'POST') {
      console.log('testz')
  }



  return (
    <div>
      <form>
        <div> Имя  <input  onChange={(event) => setName(event.target.value)}  /></div>
        <br />
        <div> Телефон  <input onChange={(event) => setPhone(event.target.value)} /></div>
        <br />
        <div>  Пароль <input onChange={(event) => setPassword(event.target.value)}  /></div>
        <br />
        <button   onClick={(event) => sendRegData(event)} style={{color: 'black', width: '100px', height:'100px'}} />
      </form>
    </div>
  )
}
