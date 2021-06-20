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