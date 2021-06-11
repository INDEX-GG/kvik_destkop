import axios from "axios";
import handler from './checkphone'
var qs =  require('qs');


export default function reg(req, res) {

  if (req.method === 'POST') {
    console.log(handler)
     const regData = JSON.parse(JSON.stringify(req.body));
    console.log(regData) 
  }
  else {
  return res.status(405).json({message: 'method not allowed'})
  }
}