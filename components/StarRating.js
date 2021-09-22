import React from 'react';

function StarRating({ rating }) {
  return (
    <div className="rating">
      <div className="stars">
        <div className="on" style={{ width: `${rating * 20}%` }}></div>
        <div className="live">
          <span data-rate="1"></span>
          <span data-rate="2"></span>
          <span data-rate="3"></span>
          <span data-rate="4"></span>
          <span data-rate="5"></span>
        </div>
      </div>
    </div>
  )
}

export default StarRating;



export function ActiveStarRating() {
  const [value, setValue] = React.useState(0);
  
  return (
    <>
      <div style={{padding: "2px 5px 0", color: "#8F8F8F"}}>{value}.0</div>
      <div className="rating_wrapper"  >
        <input type="radio" id="starOne" name="rating" value="5" onClick={(event) => setValue(event.target.value)}/>
        <label htmlFor="starOne" className="starOne_label" ></label>
        <input type="radio" id="starTwo" name="rating" value="4" onClick={(event) => setValue(event.target.value)}/>
        <label htmlFor="starTwo" className="starTwo_label"></label>
        <input type="radio" id="starThree" name="rating" value="3" onClick={(event) => setValue(event.target.value)}/>
        <label htmlFor="starThree" className="starThree_label"></label>
        <input type="radio" id="starFour" name="rating" value="2" onClick={(event) => setValue(event.target.value)}/>
        <label htmlFor="starFour" className="starFour_label"></label>
        <input type="radio" id="starFive" name="rating" value="1" onClick={(event) => setValue(event.target.value)}/>
        <label htmlFor="starFive" className="starFive_label"></label>
      </div>
    </>
  );
}