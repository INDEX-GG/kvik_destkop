import { useState, useRef } from 'react';
import AvatarEditor from 'react-avatar-editor';
import { typeChange } from '../lib/services';
import { useAuth } from '../lib/Context/AuthCTX';
import { postAvatar } from '../lib/fetch';
import { useStore } from '../lib/Context/Store';

function photoUpload({ imageType = "webp", optimiztionLevel = 1, maxScale = 3, Close }) {
	const { id } = useAuth();
	const {setUserInfo} = useStore();
	const fileInput = useRef(),
		editorRef = useRef(),
		[Photo, setPhoto] = useState(),
		[scale, setScale] = useState(1),
		[rotate, setRotate] = useState(0);
	//Получаем файл
	const fileSelect = () => {
		if (fileInput.current.files.length) {
			setPhoto(fileInput.current.files[0]);
			setScale(1);
			setRotate(0);
		}
	}

	//Получаем отредактированное изображение и отправляем на route
	const saveEditedPic = () => {
		const canvas = editorRef.current.getImageScaledToCanvas();
		canvas.toBlob(blob => {
			const img = new File([blob], typeChange(fileInput.current.files[0].name, `${imageType}`), {
				type: `image/${imageType}`,
				lastModified: Date.now(),
			})
			const sendData = new FormData;
			sendData.append('files[]', img);

			postAvatar(id, sendData)
				.then(r => {
					setUserInfo(p => {
						return {
							...p,
							userPhoto: r
						}
					})
					Close();
				})
		}, `image/${imageType}`, optimiztionLevel);
	}

	const twinClick = () => {
		if (fileInput.current.files?.length === 0) {
			fileInput.current.click();
		}
	}

	return (
		<div className="userPicUpload__wrapper">
			<div className="userPicUpload__photo">
				<AvatarEditor
					onClick={twinClick}
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