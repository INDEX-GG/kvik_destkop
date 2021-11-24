import React, {useEffect, useState} from 'react';
// import {useCategory} from "../hooks/useCategory";
import axios from "axios";
import {useAuth} from "../lib/Context/AuthCTX";
import {getTokenDataByPost} from "../lib/fetch";
import {STATIC_URL} from "../lib/constants";

const TestPage = () => {

  // const {categoryMainAlias, categoriesByAlias} = useCategory()
  const [img, setImg] = useState();
  const {id, token} = useAuth()

  const sendPosts = async () => {
    // if (Array.isArray(categoryMainAlias)) {
    //
    //  for (let alias1 = 0; alias1 < categoryMainAlias.length; alias1++) {
    //    const currentAlias2 = categoriesByAlias(categoryMainAlias[alias1].alias)
    //
    //
    //    if (!currentAlias2) return;
    //
    //    for (let alias2 = 0; alias2 < currentAlias2.length; alias2++) {
    //      const currentAlias3 = categoriesByAlias(categoryMainAlias[alias1].alias, currentAlias2[alias2].alias)
    //
    //      if (!Array.isArray(currentAlias3)) return;
    //
    //      for (let alias3 = 0; alias3 < currentAlias3.length; alias3++) {
    //        const currentAlias4 = categoriesByAlias(categoryMainAlias[alias1].alias, currentAlias2[alias2].alias, currentAlias3[alias3].alias)
    //
    //        if (Array.isArray(currentAlias4)) {
    //          console.log(currentAlias4)
    //        }
    //      }
    //    }
    //  }
    //
    // }

    // alias: "transport,auto"
    // bymessages: true
    // byphone: true
    // contact: "+79511223281"
    // coordinates: "[\"55.1597222222222\",\"61.4025\"]"
    // description: "321321"
    // location: "Челябинск"
    // price: "123"
    // subcategory: "auto"
    // title: "AC 378 GT Zagato,2012"
    // trade: false
    // user_id: 151

    const sendObj = {
      alias: "transport,auto",
      bymessages: true,
      byphone: true,
      contact: "+79511223281",
      coordinates: "[\"55.1597222222222\",\"61.4025\"]",
      description: "321123",
      location: "Челябинск",
      price: "321",
      subcategory: "auto",
      title: "Auburn Speedster,1929",
      trade: false,
      user_id: 151
    }



    if (img) {

      const photoData = new FormData();
      photoData.append('files[]', img[0]);

      console.log(photoData);


      getTokenDataByPost('/api/setPosts', sendObj, token).then(r => {
        axios.post(`${STATIC_URL}/post/${id}/${r.id}`, photoData, {
          headers: {
            "Content-Type": "multipart/form-data",
            "x-access-token": token
          }}).then(r => {
          console.log(r)
        })
      })
    }

    console.log(1);

    const autoJson = await axios.get('http://localhost:3000/subcategories/auto.json').then(r => r.data.auto)

    autoJson.forEach(item => {
      // console.log(item)
      sendObj[item.alias] = item.fields[0]
    })

    // console.log(sendObj)
  }

  // sendPosts()


  const handleChangeFile = async (e) => {
    setImg(e.target.files)
  }

  if (img) {
    console.log(img[0]);
  }

  const handleSend = () => {
    axios.get("http://192.168.88.247:5000/");
  };

  useEffect(() => {
    window.addEventListener("beforeunload", handleSend);
  }, []);


  return (
    <div>
      <h1>Начать публицацию</h1>
      <button onClick={sendPosts}>да</button>
      <button onClick={handleSend}>запрос</button>
      <input type='file' onChange={(e) => handleChangeFile(e)}/>
    </div>
  );
};

export default TestPage;