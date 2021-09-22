import React from "react";
import EmptyPlaceholder from "../../../EmptyPlaceholder";
import ReviewLeft from "../card/reviewLeft";



function LeftReviews({data}) {
  const [check, setCheck] = React.useState(false);
  const [dataId, setDataId] = React.useState([])

  function getCardId({id, isCheck}) {
    setDataId( isCheck ? prev => [...prev, id] : prev => prev.filter( item => item !== id) );
  }
  
  React.useEffect( () => {
    dataId.length === data.length ? check ? null : setCheck(true) : check===false ? null : setCheck(false)
  }, [dataId]);

  if (data.lenght == 0) {
    return (
      <EmptyPlaceholder
        title='Здесь будут отзывы, оставленные вами'
        subtitle='Совершайте сделки, и оставляйте отзывы на других продавцов'
      />
    );
  }

  /* console.log(" check from left review ", check);
  console.log(" data from left review ", data);
  console.log(" dataId from left review ", dataId); */
  
  return (
    <div className="clientPage__container_bottom">
      <div className="clientPage__container_nav__radio reviewsDelete">
        <label className="checkbox">
          <input 
            type="checkbox"
            onChange={(event) => {setCheck(event.target.checked); event.target.checked ? null : setDataId([])}}
            checked={check}
          />
          <div className="checkbox__text"></div>
        </label>
        <a className="small light" style={dataId.length > 0 ? {color: "black"} : null}>Удалить</a>
      </div>
      <div className="clientPage__container_content">
        <div className="reviewsWrapper">
          {data.map((data, i) => 
            <ReviewLeft 
              key={i} 
              data={data}
              parentCheck={check}
              getCardId={getCardId}
              dataId={dataId}
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default LeftReviews;
