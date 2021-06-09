import React, { useState, useEffect } from "react";
import Search from '../UI/icons/Search';
import Close from '../UI/icons/Close';

function HeaderCities() {
  function hideHeaderCities() {
    var hideHeaderCities = document.getElementById("headerCities");
    if (hideHeaderCities.style.display === "grid") {
      hideHeaderCities.style.display = "none";
    }
  }

  /*   const [scrollPosition, setScrollPosition] = useState(0);
  const handleScroll = () => {
    const position = window.pageYOffset;
    setScrollPosition(position);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: false });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  if (document.readyState === "loading") {
    // Загрузка ещё не закончилась
    document.addEventListener("DOMContentLoaded", hideHeaderCities);
  } else {
    // `DOMContentLoaded` Уже сработал
    hideHeaderCities();
  } */
  const [cityInput, setCityInput] = useState("");
  var arrayCities = [
    "Москва",
    "Новосибирск",
    "Екатеринбург",
    "Санкт-Петербург",
    "Нижний Новгород",
    "Казань",
    "Самара",
    "Челябинск",
    "Омск",
    "Ростов-на-Дону",
    "Уфа",
    "Красноярск",
    "Пермь",
    "Волгоград",
    "Воронеж",
    "Саратов",
    "Краснодар",
    "Тольятти",
    "Тюмень",
    "Ижевск",
    "Барнаул",
    "Ульяновск",
    "Иркутск",
    "Владивосток",
    "Ярославль",
    "Хабаровск",
    "Оренбург",
  ];
  var re = new RegExp(cityInput, 'i');
  var srch = arrayCities.filter((x) => x.match(re));

  return (
    <div id="headerCities" className="headerCities" style={{ display: "none" }}>
      <div className="headerCities__wrapper">
        <div id="headerCitiesMainContainer" className="headerCitiesMainContainer">
          <div className="headerCititesContainer">
            <div className="upCitiesContainer">
              <div className="headerCitiesTitle">Город или регион</div>
              <button className="headerCitiesSearch">
                <input
                  onChange={(event) => setCityInput(event.target.value)}
                  className="headerCitiesSearchInput"
                  placeholder="Ваш населенный пункт, район?"
                />
                <button className="headerCitiesSearchSubmit">
                  <Search/>
                </button>
              </button>
              <div className="headerCitiesTitle1">или выберите из списка</div>
            </div>

            <div className="headerCitiesList">
              <button className="cityBtn1">{srch[0]}</button>
              <button className="cityBtn">{srch[1]}</button>
              <button className="cityBtn">{srch[2]}</button>
              <button className="cityBtn1">{srch[3]}</button>
              <button className="cityBtn">{srch[4]}</button>
              <button className="cityBtn">{srch[5]}</button>
              <button className="cityBtn">{srch[6]}</button>
              <button className="cityBtn">{srch[7]}</button>
              <button className="cityBtn">{srch[8]}</button>

              <button className="cityBtn">{srch[9]}</button>
              <button className="cityBtn">{srch[10]}</button>
              <button className="cityBtn">{srch[11]}</button>
              <button className="cityBtn">{srch[12]}</button>
              <button className="cityBtn">{srch[13]}</button>
              <button className="cityBtn">{srch[14]}</button>
              <button className="cityBtn">{srch[15]}</button>
              <button className="cityBtn">{srch[16]}</button>
              <button className="cityBtn">{srch[17]}</button>

              <button className="cityBtn">{srch[18]}</button>
              <button className="cityBtn">{srch[19]}</button>
              <button className="cityBtn">{srch[20]}</button>
              <button className="cityBtn">{srch[21]}</button>
              <button className="cityBtn">{srch[22]}</button>
              <button className="cityBtn">{srch[23]}</button>
              <button className="cityBtn">{srch[24]}</button>
              <button className="cityBtn">{srch[25]}</button>
              <button className="cityBtn">{srch[26]}</button>
            </div>
          </div>
        </div>
        <div className="closeContainer">
          <button
            type="reset"
            className="headerCitiesBack"
            onClick={hideHeaderCities}
          />
          <Close/>
        </div>
      </div>
    </div>
  );
}

export default HeaderCities;