import React from 'react';
// import {useCategory} from "../hooks/useCategory";
import axios from "axios";
import {useAuth} from "../lib/Context/AuthCTX";
import {getTokenDataByPost} from "../lib/fetch";

const TestPage = () => {

  // const {categoryMainAlias, categoriesByAlias} = useCategory()
  const {token} = useAuth()


  const matchesRandom = (number, boolean) => {
    const random = Math.round(Math.random() * number);

    if (boolean) return Boolean(random)
    return random
  }

  // const randomId = (number) => {
  //   switch (number) {
  //     case 1 || 0:
  //       return 163
  //     case 2:
  //       return 135
  //     case 3:
  //       return 132
  //     case 4:
  //       return 60
  //   }
  // }

  const cityArr = [
    {name: 'Москва', searchName: 'RU$RU-MOW$Москва'},
    {name: 'Челябинск', searchName: 'RU$RU-CHE$Челябинск'},
    {name: 'Уфа', searchName: 'RU$RU-BA$Уфа'},
    {name: 'Красноярск', searchName: 'RU$RU-KYA$Красноярск'},
    {name: 'Челябинская обл, г Магнитогорск', searchName: 'RU$RU-CHE$Магнитогорск'},
    {name: "Челябинская обл, село Долгодеревенское", searchName: "RU$RU-CHE$Сосновский$Долгодеревенское"},
    {name: "Челябинская обл, г Коркино, поселок Дубровка-Челябинская, железнодорожная станция", searchName: "RU$RU-CHE$Коркинский$Коркино$Дубровка-Челябинская, железнодорожная станция"}
  ]


  const arr = [
    "{\"photos\":[\"images/po/7c/21/31/ba/1ac5fb16b8a7837cf94d0565c44bb20211125143925761010.webp\"]}",
    "{\"photos\":[\"images/po/52/23/25/29/f8414e230fdc2b5bc1e46bc5fb77c20211102095600128394.webp\",\"images/po/86/f2/97/64/6f1ea1f21e909a08a1bff8c48f81220211102095600129804.webp\",\"images/po/c4/75/ea/51/50f19cf5fbda2aace1d22def75ff620211102095600132682.webp\",\"images/po/8b/72/8e/58/eb5449c30af64b1b4379c5aca617d20211102095600134193.webp\"]}",
    "{\"photos\":[\"images/po/bb/af/a0/26/6b794e0ccb7d1a40b6c91413253e120211102100304539899.webp\",\"images/po/37/ec/d4/b7/43fbbb281c2ca2bb3cd6e595a55c020211102100304540676.webp\"]}",
    "{\"photos\":[\"images/po/6d/9c/51/dd/a36f9f1bcfad48bfbd347bc495ca820211102101620016014.webp\",\"images/po/f6/54/60/e2/af7458af15b6742996dbe322fa04f20211102101620016768.webp\",\"images/po/98/5a/e3/2a/16edee76cd9fb2df87a13b781a6ba20211102101620017272.webp\"]}",
    "{\"photos\":[\"images/po/31/27/f9/ac/1d83766da4832e3b8e46e0644761e20211102102125278610.webp\",\"images/po/89/69/fc/58/37720189b13f3e9da261eb4a44d4f20211102102125279315.webp\"]}",
    "{\"photos\":[\"images/po/de/b1/30/78/02e91f8b30db1ccf28f1152a2715020211125145804270542.webp\"]}",
    "{\"photos\":[\"images/po/aa/c1/9d/7f/7c901a72d75d36795aeff72379aa220211123094149410494.webp\"]}"
  ];


  const markArr = []


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



    const autoJson = await axios.get('http://localhost:3000/subcategories/auto.json').then(r => r.data.auto)


    autoJson.forEach((item) => {
      if (item.alias === 'marks') {
        item.fields.map(mark => {
          axios.get(`http://localhost:3000/auto_brand/${mark}.json`).then(model => {
            model.data.children.map(currentModel => {
              currentModel.children.map(currentGeneration => {
                currentGeneration.children.map(currentModigicator => {

                  const subcategory = {}

                  autoJson.forEach(item => {
                    if (item.alias == 'marks') return;
                    const random = matchesRandom(item.fields.length - 1)
                    subcategory[item.alias] = Array.isArray(item.fields) ? item.fields[random] : matchesRandom(10000)
                  })

                  markArr.push({mark, model: currentModel.value, generation : currentGeneration.value, modification: currentModigicator.value, ...subcategory})
                  console.log(markArr.length)
                })
              })
            })
          })
        })
      }

      console.log('Успех')

    })

  }


  const generateField = (obj, id) => {
    const newArr = []
    for (let key in obj) {
      newArr.push({alias: key, fields: obj[key]})
    }

    newArr.push({alias: "post_id", fields: id})
    return newArr
  }


  const handleSend = async () => {
    for (let current = 0; current < 1000; current++) {
      const random = await matchesRandom(4)
      const location = cityArr[random]
      const autoPhoto = arr[random]
      // const userId = await randomId(Math.round(Math.random() * 4))

      const sendObj = {
        alias: "transport,auto",
        bymessages: matchesRandom(1, true),
        byphone: matchesRandom(1, true),
        contact: "+79511223281",
        coordinates: `[${matchesRandom(40)},${matchesRandom(70)}]`,
        description: "Test",
        location: location.name,
        price: matchesRandom(1000000),
        subcategory: "auto",
        title: "Auburn Speedster,1929",
        trade: matchesRandom(1, true),
        user_id: 163,
        photo: autoPhoto,
        city: location.searchName,
      }

      await getTokenDataByPost('/api/setPostsTest', sendObj, token).then(r => {
        getTokenDataByPost('/api/subcategory', {
          user_id: 163,
          post_id: r.id,
          subcategory: 'auto',
          fields: generateField(markArr[current], r.id)
        }, token)
      })
    }

  }



  return (
    <div>
      <h1>Начать публицацию</h1>
      <div><button onClick={sendPosts}>Все машины</button></div>
      <div>
        <button onClick={() => {
          console.log(markArr)
        }}>Финальный массив</button>
      </div>
      <button onClick={() => {
        console.log(markArr)
      }}>arr</button>
      <button onClick={handleSend}>Пост</button>
      <button onClick={() => {
        console.log(markArr[0])
      }}>Пост</button>
    </div>
  );
};

export default TestPage;