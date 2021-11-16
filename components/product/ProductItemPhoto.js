import React, {useEffect, useState} from 'react';

const ProductItemPhoto = ({img, index}) => {

  const [height, setHeight] = useState(0);

  useEffect(async () => {
    const image = new Image()
    image.src = img

    image.onload = await function() {
      if (this.height > 700) {
        setHeight(this.height)
      }
    }

  }, [])

  console.log(height)

  return (
    <img style={{objectFit: height ? 'contain' : 'contain'}} src={img} alt={`sliderPhoto${index + 1}`} />
  );
};

export default ProductItemPhoto;