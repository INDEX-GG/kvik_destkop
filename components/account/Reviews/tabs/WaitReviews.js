import { Checkbox} from "@material-ui/core";
import React, {useEffect, useState} from "react";
import FiberManualRecordOutlinedIcon from '@material-ui/icons/FiberManualRecordOutlined';
import FiberManualRecordSharpIcon from '@material-ui/icons/FiberManualRecordSharp';
import EmptyPlaceholder from "../../../EmptyPlaceholder";
import ReviewWait from "../card/reviewWait";





function WaitReviews({data}) {
  const [check, setCheck] = useState(false);
  const [dataCheck, setDataCheck] = useState([])
  

  function getChildData({id, isCheck}) {
    setDataCheck( isCheck ? prev => [...prev, id] : prev => prev.filter( item => item !== id))
    //setDataCard( isCheck ? prev => [...prev, data.filter( item => item.id == id)[0]] : prev => prev.filter( item => item.id !== id))
  }

  useEffect( () => {
    dataCheck.length === data.length ? setCheck(true) : setCheck(false)
  }, [dataCheck])
  
  
  if (data.lenght == 0) {
    return (
      <EmptyPlaceholder
        title='Сюда будут попадать объявления, на которые вы сможете оставлять отзывы'
        subtitle='Договаривайтесь о сделках с другими пользователями и ставьте им свои оценки'
      />
    );
  }
  return (
    <div className="clientPage__container_bottom">
      <div className="clientPage__container_nav__radio">
        <Checkbox
          color='primary'
          icon={<FiberManualRecordOutlinedIcon />}
          checkedIcon={<FiberManualRecordSharpIcon />}
          onChange={(event) => {setCheck(event.target.checked); event.target.checked ? null : setDataCheck([])}}
          checked={check}
        />
        <a 
          onClick={() => dataCheck.length > 0 ? console.log("clicked") : null}
          style={dataCheck.length > 0 ? {color: "black"} : null}
        >Удалить</a>
      </div>
      <div className="clientPage__container_content">
        <div className="reviewsContainerWrapper">
          { 
            data.map((offer,) => {
              return (  <ReviewWait 
                          key={offer.id} 
                          offer={offer}
                          parentCheck={check}
                          getChildData={getChildData}
                          dataCheck={dataCheck}
                        />
              )
            })
          }
        </div>
      </div>
      
    </div>
  );
}

export default WaitReviews;
