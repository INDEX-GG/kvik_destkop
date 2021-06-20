import axios from 'axios'
import { useState } from 'react'
var qs = require('qs');

import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient();
export async function getServerSideProps() {
  const users = await prisma.users.findMany();
  return {
    props: {
      usersList: users
    }
  };
}



export default function TestArea(req, res) {




  const [phone, setPhone] = useState();
  const [code, setCode] = useState();
  const [name, setName] = useState();
  const [password, setPassword] = useState();
  //  const [id, setId] = useState(4)

  let phoneData = {
    phone: phone,
  }
  let regdata = {
    //   id: id,
    name: name,
    phone: phone,
    password: password,
    code: code
  }

  const response = () => {
    axios.post('/api/checkphone', phoneData)
      .then((res) => (console.log(res)))
      .catch((err) => ('err', err))
  }
  const submitNum = () => {
    axios.post('/api/setApi', regdata)
      .then((res) => (console.log(res)))
      .catch((err) => ('err', err))
  }



  const submitBut = () => {
    regdata = {
      of: 0,
      userID: 34

    }
    axios.post('/api/getPosts', regdata)
      .then((res) => (console.log(res)))
      .catch((err) => ('err', err))
  }

  /*   function sendRegData(event) {
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
    } */
  return (
    <div>
      <form>
        <div> Имя  <input onChange={(event) => setName(event.target.value)} /></div>
        <br />
        <div> Телефон  <input onChange={(event) => setPhone(event.target.value)} /></div>
        <br />
        <div>  Пароль <input onChange={(event) => setPassword(event.target.value)} /></div>
        <div></div>
        <br />
        <button onClick={response} style={{ color: 'black', width: '100px', height: '100px' }} />
      </form>
      <form>
        <div>Код подтверждения <input onChange={(event) => setCode(event.target.value)} /></div>
        <button onClick={() => submitBust()} style={{ color: 'black', width: '100px', height: '100px' }} />


        <button onClick={() => submitBut()} style={{ color: 'black', width: '100px', height: '100px' }} />
      </form>
    </div>



  )
}

