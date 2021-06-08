import React from "react";
// import geo from "../../images/header/geo.svg";
import HeaderCities from './HeaderCities';

/* Если зашел админ то тру и панель меняется */
const userAdminInfo = true;

function UpPanel() {
  const location = "Челябинск";
  function showCities() {
    var showCities = document.getElementById("headerCities");
    if (showCities.style.display === "none") {
      showCities.style.display = "grid";
    } else {
      showCities.style.display = "none";
    }
  }

  return (
    <div className="upPanel__wrapper">
      <div className="upPanel">
        <div onClick={showCities} className="currentLocation">
          {/* <img src={geo} className="geo" alt="" />{" "} */}
          <div className="location">{location} </div>
        </div>
        <div className="notifyContainer">
          {!userAdminInfo ? '' : <a href="" className="hrefOffers"></a>}
          {!userAdminInfo ? '' : <a href="" className="hrefDeal"></a>}
          {userAdminInfo ? '' : <a className="fastCategory" href="/"></a>}
          {userAdminInfo ? '' : <a className="notification" href="/"></a>}
          {userAdminInfo ? '' : <a className="like" href="/"></a>}
          <a className="notificationMsg" href="/"></a>
        </div>
      </div>
      <HeaderCities />
    </div>
  );
};

export default UpPanel;