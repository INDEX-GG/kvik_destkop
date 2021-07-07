import { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Navigation, Thumbs, Pagination } from "swiper/core";
SwiperCore.use([Navigation, Thumbs, Pagination]);

//!
import { Modal } from "@material-ui/core";
import { makeStyles } from "@material-ui/core";

export default function ProductCarousel({ photo }) {
  const [thumbsSwiper, setThumbsSwiper] = useState(null);

  //  !!
  const [modal, setModal] = useState(false);
  try {
    JSON.parse(photo).photos.map((item) => console.log(item));
  } catch (error) {
    console.log(1);
  }
  const useStyles = makeStyles(() => ({
    modal: {
      backgroundColor: "#E5E5E5",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
    },
    item: {
      width: "1248px",
      height: "680px",
    },
    navImgBlock: {
      width: "102px",
      height: "88px",
    },
  }));

  const classes = useStyles();

  function openModal(e) {
    setModal(!modal);

    //! Изменить
    document.querySelectorAll(".seen__ad")[1].style.display = "none";

    // !
  }

  const body = (
    <>
      <Swiper loop={true} spaceBetween={1} thumbs={{ swiper: thumbsSwiper }} className={classes.item} pagination={{ type: "fraction" }} onClick={(e) => openModal(e)}>
        <div className="seen__ad">Просмотрено</div>

        {photo == undefined
          ? ""
          : JSON.parse(photo).photos.map((img, i) => (
              <SwiperSlide>
                {" "}
                <img src={img} />
              </SwiperSlide>
            ))}
      </Swiper>
      {photo == undefined
        ? ""
        : JSON.parse(photo).photos.map((img, index) => {
            return (
              <div key={index + 1} id={index + 1} className={classes.navImgBlock}>
                <img className={"productNavImg"} src={img} alt="ProductPhoto" />
              </div>
            );
          })}
      <div>
        <h1>Hello</h1>
      </div>
    </>
  );

  return (
    <>
      <Swiper loop={true} spaceBetween={1} navigation={true} thumbs={{ swiper: thumbsSwiper }} className="mySwiper2" pagination={{ type: "fraction" }} onClick={(e) => openModal(e)}>
        <div className="seen__ad">Просмотрено</div>

        {photo == undefined
          ? ""
          : JSON.parse(photo).photos.map((img, i) => (
              <SwiperSlide>
                {" "}
                <img src={img} />
              </SwiperSlide>
            ))}
      </Swiper>

      <Swiper onSwiper={setThumbsSwiper} loop={true} spaceBetween={1} slidesPerView={6} freeMode={true} watchSlidesVisibility={true} watchSlidesProgress={true} className="mySwiper">
        {photo == undefined
          ? ""
          : JSON.parse(photo).photos.map((img, i) => (
              <SwiperSlide>
                {" "}
                <img src={img} />
              </SwiperSlide>
            ))}
      </Swiper>
      <Modal className={classes.modal} open={modal} onClose={() => setModal(!modal)} aria-labelledby="simple-modal-title" aria-describedby="simple-modal-description">
        {body}
      </Modal>
    </>
  );
}
