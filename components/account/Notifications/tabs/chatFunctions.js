export const generateTime = (UTC, time, onlyTime=false, onlyDate=false) => {
	const dateObj = JSON.parse(time)
	if (onlyDate) return `${dateObj.d}.${dateObj.mo}.${dateObj.y}`
	if (onlyTime) return `${UTC + +dateObj.h}:${dateObj.mi}`
	return `${dateObj.d}.${dateObj.mo}.${dateObj.y} ${UTC + +dateObj.h}:${dateObj.mi}`
}

export const generateProductPhoto = (photos) => {
	const photosArr = JSON.parse(photos)?.photos
	return photosArr[0]
  }
