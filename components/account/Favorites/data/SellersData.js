import React, {useState, useEffect} from "react"
import { useRouter } from 'next/router'
import axios from "axios"


function SellerData() {

  const router = useRouter()

  const id = router.query.id
  console.log(id)
  axios.post("/api/getSubscriptions", {user_id: 58}).then(res => console.log(res.data)).catch(error => console.log("!!!!!!!!!!!!!!!!!!!!!", error))
}

export default SellerData