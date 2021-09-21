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
  return (
    <div className="rating_wrapper">
      <span id="oneStar"></span>
      <span id="twoStar"></span>
      <span id="threeStar"></span>
      <span id="fourStar"></span>
      <span id="fiveStar"></span>
    </div>
  );
}