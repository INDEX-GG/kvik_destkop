import React, { useState } from "react";
// import business from "../../images/header/headerCategories/business1.svg";
// import transport from "../../images/header/headerCategories/transport1.svg";
// import electronics from "../../images/header/headerCategories/electronics1.svg";
// import hobbies from "../../images/header/headerCategories/hobbies1.svg";
// import homeAndGarden from "../../images/header/headerCategories/homeAndGarden1.svg";
// import job from "../../images/header/headerCategories/job1.svg";
// import property from "../../images/header/headerCategories/property1.svg";
// import service from "../../images/header/headerCategories/service1.svg";
// import stuff from "../../images/header/headerCategories/stuff1.svg";
// import animal from "../../images/header/headerCategories/animal1.svg";

function HeaderCategories() {
  function hideHeaderCategories() {
    var showBlockBg = document.querySelector(".headerCategories__background");
    var showCategories = document.querySelector(".headerCategories");
    if (!showCategories.classList.contains("hide")) {
      
      showCategories.classList.remove('HeaderCategories-active');
      showBlockBg.classList.remove('headerCategories__background-active');
      showCategories.classList.add('hide');
    }
  }

  function showBlock2() {
    var showBlock2 = document.getElementById("headerCategoriesBack");
    if (showBlock2.style.display === "none") {
      showBlock2.style.display = "inline-block";
    }
  }
  function showBlock3() {
    var showBlock3 = document.getElementById("headerCategoriesListBlock3");
    var showBlock4 = document.getElementById("headerCategoriesListBlock4");
    if (
      showBlock3.style.display === "none" &&
      showBlock4.style.display === "none"
    ) {
      showBlock3.style.display = "inline-block";
      showBlock4.style.display = "inline-block";
    }
  }

  return (

    <div id="headerCategories" className="headerCategories hide">
      <div className="headerCategories__background">
      <div id="headerCategoriesContainer" className="headerCategoriesContainer">
        <div className="headerCategoriesHeader">
        <button
          className="headerCategoriesBack"
          id="headerCategoriesBack"
          onClick={hideHeaderCategories}
          type="reset"
        />
        <h6>Категории</h6>
        </div>
        <div
          className="headerCategoriesListBlock1"
          id="headerCategoriesListBlock1"
        >
          <button onClick={showBlock2} className="headerCategoriesButton">
            {/* <img src={property} /> */}
            <div className="headerCategoriesTitle">Недвижимость</div>
          </button>
          <button className="headerCategoriesButton">
            {/* <img src={transport} /> */}
            <div className="headerCategoriesTitle">Транспорт</div>
          </button>
          <button className="headerCategoriesButton">
            {/* <img src={electronics} /> */}
            <div className="headerCategoriesTitle">Бытовая электроника </div>
          </button>
          <button className="headerCategoriesButton">
            {/* <img src={job} /> */}
            <div className="headerCategoriesTitle">Работа</div>
          </button>
          <button className="headerCategoriesButton">
            {/* <img src={business} /> */}
            <div className="headerCategoriesTitle">Для бизнеса</div>
          </button>
          <button className="headerCategoriesButton">
            {/* <img src={homeAndGarden} /> */}
            <div className="headerCategoriesTitle">Для дома и дачи</div>
          </button>
          <button className="headerCategoriesButton">
            {/* <img src={animal} /> */}
            <div className="headerCategoriesTitle">Животные</div>
          </button>
          <button className="headerCategoriesButton">
            {/* <img src={stuff} /> */}
            <div className="headerCategoriesTitle">Личные вещи</div>
          </button>
          <button className="headerCategoriesButton">
            {/* <img src={service} /> */}
            <div className="headerCategoriesTitle">Услуги</div>
          </button>
          <button className="headerCategoriesButton">
           {/*  <img src={hobbies} /> */}
            <div className="headerCategoriesTitle">Хобби спорт и отдых</div>
          </button>
        </div>
        <div
          id="headerCategoriesListBlock2"
          className="headerCategoriesListBlock2"
          style={{ display: "none" }}
        >
          <button className="headerCategoriesButton" onClick={showBlock3}>
            /database-item/
          </button>
          <button className="headerCategoriesButton">/database-item/</button>
          <button className="headerCategoriesButton">/database-item/</button>
          <button className="headerCategoriesButton">/database-item/</button>
          <button className="headerCategoriesButton">/database-item/</button>
          <button className="headerCategoriesButton">/database-item/</button>
          <button className="headerCategoriesButton">/database-item/</button>
          <button className="headerCategoriesButton">/database-item/</button>
          <button className="headerCategoriesButton">/database-item/</button>
          <button className="headerCategoriesButton">/database-item/</button>
        </div>

        <div
          id="headerCategoriesListBlock3"
          className="headerCategoriesListBlock3"
          style={{ display: "none" }}
        >
          <button className="headerCategoriesButton">/database-item/</button>
          <button className="headerCategoriesButton">/database-item/</button>
          <button className="headerCategoriesButton">/database-item/</button>
          <button className="headerCategoriesButton">/database-item/</button>
          <button className="headerCategoriesButton">/database-item/</button>
          <button className="headerCategoriesButton">/database-item/</button>
          <button className="headerCategoriesButton">/database-item/</button>
          <button className="headerCategoriesButton">/database-item/</button>
          <button className="headerCategoriesButton">/database-item/</button>
          <button className="headerCategoriesButton">/database-item/</button>
        </div>
        <div
          id="headerCategoriesListBlock4"
          className="headerCategoriesListBlock4"
          style={{ display: "none" }}
        >
          <button className="headerCategoriesButton">/database-item/</button>
          <button className="headerCategoriesButton">/database-item/</button>
          <button className="headerCategoriesButton">/database-item/</button>
          <button className="headerCategoriesButton">/database-item/</button>
          <button className="headerCategoriesButton">/database-item/</button>
          <button className="headerCategoriesButton">/database-item/</button>
          <button className="headerCategoriesButton">/database-item/</button>
          <button className="headerCategoriesButton">/database-item/</button>
          <button className="headerCategoriesButton">/database-item/</button>
          <button className="headerCategoriesButton">/database-item/</button>
        </div>
      </div>
    </div>
    </div>
  );
}
export default HeaderCategories;