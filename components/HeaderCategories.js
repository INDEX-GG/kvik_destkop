import React, { useState } from "react";
import Business from '../UI/icons/Business';
import Transport from '../UI/icons/Transport';
import Electronics from '../UI/icons/Electronics';
import Hobbies from '../UI/icons/Hobbies';
import HomeAndGarden from '../UI/icons/HomeAndGarden';
import Job from '../UI/icons/Job';
import Property from '../UI/icons/Property';
import Service from '../UI/icons/Service';
import Stuff from '../UI/icons/Stuff';
import Animal from '../UI/icons/Animal';

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
            <Property/>
            <div className="headerCategoriesTitle">Недвижимость</div>
          </button>
          <button className="headerCategoriesButton">
            <Transport/>
            <div className="headerCategoriesTitle">Транспорт</div>
          </button>
          <button className="headerCategoriesButton">
            <Electronics/>
            <div className="headerCategoriesTitle">Бытовая электроника </div>
          </button>
          <button className="headerCategoriesButton">
            <Job/>
            <div className="headerCategoriesTitle">Работа</div>
          </button>
          <button className="headerCategoriesButton">
            <Business/>
            <div className="headerCategoriesTitle">Для бизнеса</div>
          </button>
          <button className="headerCategoriesButton">
            <HomeAndGarden/>
            <div className="headerCategoriesTitle">Для дома и дачи</div>
          </button>
          <button className="headerCategoriesButton">
            <Animal/>
            <div className="headerCategoriesTitle">Животные</div>
          </button>
          <button className="headerCategoriesButton">
            <Stuff/>
            <div className="headerCategoriesTitle">Личные вещи</div>
          </button>
          <button className="headerCategoriesButton">
            <Service/>
            <div className="headerCategoriesTitle">Услуги</div>
          </button>
          <button className="headerCategoriesButton">
           <Hobbies/>
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