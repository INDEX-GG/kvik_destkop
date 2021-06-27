import { useState, useRef, useEffect } from 'react';
import AvatarEditor from 'react-avatar-editor';
import { typeChange } from '../lib/services';
import { useUser } from '../hooks/useUser';
import axios from 'axios';

function photoUpload({ route = "", imageType = "webp", optimiztionLevel = 1, maxScale = 3 }) {
  const { isLoading, id, photo } = useUser();
  const fileInput = useRef(),
    editorRef = useRef(),
    [Photo, setPhoto] = useState(),
    [scale, setScale] = useState(1),
    [rotate, setRotate] = useState(0);
  console.log(photo)
  //Получаем файл
  const fileSelect = () => {
    if (fileInput.current.files.length) {
      setPhoto(fileInput.current.files[0]);
      setScale(1);
      setRotate(0);
    }
  }

  useEffect(() => {
    setPhoto(photo)
  }, [photo])

  //Получаем отредактированное изображение и отправляем на route
  const saveEditedPic = () => {
    const canvas = editorRef.current.getImageScaledToCanvas();
    canvas.toBlob(blob => {
      const img = new File([blob], typeChange(fileInput.current.files[0].name, `${imageType}`), {
        type: `image/${imageType}`,
        lastModified: Date.now(),
      })
      console.log(img);
      const sendData = new FormData;
      sendData.append('image', img);
      sendData.append('id', id);
      axios.post("/api/avatar", sendData, {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      })
      console.log(sendData)
    }, `image/${imageType}`, optimiztionLevel);
  }

  return (

    <div className="userPicUpload__wrapper">
      <div className="userPicUpload__photo">
        <AvatarEditor
          ref={editorRef}
          className="userPicUpload__editor"
          image={Photo}
          border={25}
          color={[255, 255, 255, 0.8]}
          borderRadius={100}
          scale={scale}
          rotate={rotate}
        />
      </div>
      <div>
        <label className="userPicUpload__range">Приблизить
          <input type="range" min="1" max={maxScale} step="0.05" value={scale} onChange={e => setScale(+e.target.value)} />
        </label>
        <label className="userPicUpload__range">Повернуть
          <input type="range" min="0" max="360" value={rotate} onChange={e => setRotate(+e.target.value)} />
        </label>
      </div>
      <label className={Photo ? "userPicUpload__button highlight underline" : "userPicUpload__button button contained bhigh"}>
        {Photo ? 'Загрузить новое фото' : 'Загрузить фото'}
        <input
          ref={fileInput}
          onChange={fileSelect}
          className="userPicUpload__input"
          type="file"
          accept="image/png, image/jpg, image/jpeg, image/webp, image/heic, image/heif" />
      </label>
      {Photo ? <button onClick={() => saveEditedPic()} className="userPicUpload__button button contained bhigh">Сохранить</button> : ''}
    </div>
  )
}
export default photoUpload;