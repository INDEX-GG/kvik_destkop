import React, { useRef, useState } from "react";
import Modal from "../../../Modal";
import { phoneNumber } from "../../../../lib/services";
import { modalDeletHistory, modalDeleteAccount } from "../../../Modals";
import { useUser } from "../../../../hooks/useUser";
import Active_icon from "../../../../UI/icons/ActiveIcon";
import axios from "axios";
import {useMedia} from "../../../../hooks/useMedia"
import RightArrow from "../../../../UI/icons/RightArrow"

function PersonalData() {
  const { isAuth, id, phone, username, email } = useUser();
  const [modal, setModal] = useState({});
  function modalOlen(e, size, content, title) {
    function smf() {
      setModal({ title: title, content: content, size: size, isOpen: false });
    }
    e.preventDefault();
    setModal({ title: title, content: content, size: size, isOpen: true });
    setTimeout(smf, 500);
  }

  let userSettings = {};
  if (typeof isAuth !== "undefined") {
    userSettings = {
      phone: phoneNumber(phone),
    };
  } else {
    userSettings = {
      phone: phoneNumber(phone),
    };
  }

  // !!!!!

  const {matchesTablet, matchesMobile, matchesCustom1100} = useMedia()

  const [inputProfile, setInputProfile] = useState(true);
  const [valueName, setValueName] = useState("");
  const limit = useRef(0);

  const [validateCheck, setValidateCheck] = useState(["#F44545", "#F44545", "#F44545", "#F44545"]);
  const [passwordValid, setPasswordValid] = useState(false);
  const [passwordOne, setPasswordOne] = useState("");
  const [passwordTwo, setPasswordTwo] = useState("");
  const [passwordSend, setPasswordSend] = useState("");
  const [passwordCoincidence, setPasswordCoincidence] = useState(null);
  const [inputFirstEye, setInputFirstEye] = useState(true);
  const [inputSecondEye, setInputSecondEye] = useState(true);

  username === undefined ? "" : test();

  function test() {
    if (limit.current == 0) {
      setValueName(username);
      limit.current = 1;
    }
  }

  function nameSubmit() {
    setInputProfile(!inputProfile);
    console.log(`SEND: ${valueName}`);
    const obj = { id: id, name: valueName };
    axios.post("/api/settings/upName", obj).then((res) => console.log(res));
  }

  function changeInput(e) {
    setValueName(e.target.value);
  }

  //!! Валидация формы

  function changePasswordInput(e) {
    let length = false;
    let number = false;
    let registr = false;
    let languageEu = false;
    let lenguageRu = false;
    // ! Проверка на длинну
    if (e.target.value.length >= 8) {
      length = true;
    }

    // ! Проверка на Латиницу
    if (e.target.value.match(/(?=.*[a-z])/g) || e.target.value.match(/(?=.*[A-Z])/g) != null) {
      languageEu = true;
    }
    // ! Провека на цифру
    if (e.target.value.match(/[\d.,:]/g)) {
      number = true;
    }
    //! Проверка на регистр
    if (e.target.value.match(/(?=.*[a-z])/g) && e.target.value.match(/(?=.*[A-Z])/g) != null) {
      registr = true;
    }
    //! Проверка на пробел
    if (!e.target.value.match(/^\S*$/g)) {
      e.target.value = e.target.value
        .split("")
        .splice(0, e.target.value.length - 1)
        .join("");
    }
    //! Проверка на кириллицу
    if (e.target.value.match(/[а-яё]/g)) {
      lenguageRu = true;
      languageEu = false;
    }

    if (lenguageRu) {
      setPasswordValid(false);
    }

    //! Конец валидации
    if (e.target.value.match(/(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z!@#$%^&*]{8,}/g) && !lenguageRu) {
      setPasswordValid(true);
    } else {
      setPasswordValid(false);
    }

    function createArr() {
      return [length ? "#C7C7C7" : "#F44545", languageEu ? "#C7C7C7" : "#F44545", number ? "#C7C7C7" : "#F44545", registr ? "#C7C7C7" : "#F44545"];
    }
    setPasswordOne(e.target.value);
    confirmPassword(e, "input1");
    setValidateCheck(createArr());
  }

  function confirmPassword(e, field = null) {
    if (field === "input1") {
      if (e.target.value == passwordTwo) {
        setPasswordCoincidence("send");
      } else {
        if (passwordTwo.length > 0) {
          setPasswordCoincidence(false);
        } else {
          setPasswordCoincidence(null);
        }
      }

      return;
    }

    if (!e.target.value.match(/^\S*$/g)) {
      return;
    } else {
      setPasswordTwo(e.target.value);
    }

    if (e.target.value.length === 0) {
      setPasswordCoincidence(null);
      return;
    }

    if (!passwordValid && e.target.value.length > 0) {
      setPasswordCoincidence("noValid");
      return;
    }

    if (passwordValid && e.target.value.length > 0) {
      if (e.target.value == passwordOne) {
        setPasswordCoincidence("send");
        setPasswordSend(passwordOne);
      } else {
        setPasswordCoincidence(false);
      }
    }
  }

  function passwordSubmit(e) {
    e.preventDefault();
    if (passwordSend.length > 0) {
      setPasswordOne("");
      setPasswordTwo("");
      const obj = { id: id, password: passwordSend };
      axios.post("/api/settings/upPassword", obj).then((res) => console.log(res));
    }
  }

  return (
    <div className="clientPage__container_bottom">
      <div className="clientPage__container_content">
        <div className="privateDataWrapper thin">
          <div>
            <div>Профиль</div>
            {inputProfile ? (
              <div className="clientPage__name">{valueName}</div>
            ) : (
              <input
                className="clientPage__input-profile"
                type="text"
                value={valueName}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    nameSubmit();
                  }
                }}
                onChange={(e) => changeInput(e)}
              />
            )}
            {matchesMobile || matchesTablet ? <a href="/"><div className="changeMobile"><div>Имя пользователя</div><RightArrow/></div></a> : inputProfile ? <a onClick={() => setInputProfile(!inputProfile)}>Редактировать</a> : <a onClick={nameSubmit}>Сохранить</a>}
          </div>
          <div>
            <div>Город</div>
            <div className="clientPage__city">Город, Район, Улица</div>
            {matchesMobile || matchesTablet ? <a><div className="changeMobile"><div>Город</div><RightArrow/></div></a> : <a>Изменить</a>}
          </div>
          <div>
            <div>Телефон</div>
            <div>
              <p>{userSettings.phone}</p>
              <a className="small highlight underline clientPage__phone">Добавить ещё телефон</a>
            </div>
            {matchesMobile || matchesTablet ? <a><div className="changeMobile"><div>+7 (000) 000-00-00</div><RightArrow/></div></a> : <a>Изменить</a>}
          </div>
          <div>
            <div>E-mail</div>
            <div>
              <p>{email === null ? "E-mail не указан" : email}</p>
              <p className="error small">E-mail не подтвержден</p>
              <p className="light small">Укажите E-mail для получения уведомлений, новостей, спец.предложений и для восстановления пароля.</p> 
            </div>
            {matchesTablet || matchesMobile ? (
              <>
                <a><div className="changeMobile"><p className="error small">E-mail не подтвержден</p><RightArrow/></div></a>
                <p className="light small">Укажите E-mail для получения уведомлений, новостей, спец.предложений и для восстановления пароля.</p> 
              </>
            ): <a>Указать</a>}
          </div>
          <div>
            <div>Социальные сети</div>
            <div>
              <p>
                <a className="pDSocial pDVK"></a>
                <a className="pDSocial pDInstagram"></a>
                <a className="pDSocial pDFacebook"></a>
                <a className="pDSocial pDOK"></a>
              </p>
              <p className="light small">Привяжите к своему профилю социальные сети для быстрой авторизации.</p>
            </div>
            {matchesTablet || matchesMobile ?
            <>
              <div className="socialItemBox"> 
                <p>
                  <a className="pDSocial pDVK"></a>
                  <a className="pDSocial pDInstagram"></a>
                  <a className="pDSocial pDFacebook"></a>
                  <a className="pDSocial pDOK"></a>
                </p>
              </div>
              <div className="socialText">
                <p className="light small">Привяжите к своему профилю социальные сети для быстрой авторизации.</p>
              </div>
            </> : null}
          </div>
          <div>
            {matchesTablet || matchesMobile ? <div>Очистить историю поиска</div> : <div>История</div>}
            <a
              onClick={(e) => {
                modalOlen(e, "sm", modalDeletHistory());
              }}
              className="offerUnpublish thin superLight"
            >
              Очистить историю поиска
            </a>
            {matchesTablet || matchesMobile ? <RightArrow/>: <div>Очистить</div>}
          </div>
          {matchesTablet || matchesMobile ? null : 
          <div>
            <div>Выход</div>
            <div>Выйти</div>
            <div>Выйти со всех устройств</div>
          </div>}
          <div>
            {matchesMobile || matchesTablet ? <div>Удалить аккаунт</div> : <div>Аккаунт</div>}
            <div>Удалить аккаунт</div>
            {matchesMobile || matchesTablet ? <RightArrow/> : <a
              onClick={(e) => {
                modalOlen(e, "sm", modalDeleteAccount());
              }}
              className="offerUnpublish thin superLight"
            >
              Удалить навсегда
            </a>}
          </div>
          <div>
            <div>Сменить пароль</div>
            <div>
              <div className="privateDataPass">
                <div className="pDPassInputWrapper">
                  <input placeholder="Введите новый пароль" type={inputFirstEye ? "password" : "text"} value={passwordOne} onChange={(e) => changePasswordInput(e)} />
                  <a className="pDPassInvis" onClick={() => setInputFirstEye(!inputFirstEye)}></a>
                </div>
                {/* <p className="pDPassWarning">Минимум 8 символов</p>
                <p className="pDPassWarning">Только латинские символы</p>
                <p className="pDPassError">Как минимум одна цифра</p>
                <p className="pDPassError">Строчные и заглавные буквы</p> */}
                <p className="">
                  <Active_icon Size={14} Color={validateCheck[0]} />
                  &nbsp;Минимум 8 символов
                </p>
                <p className="">
                  <Active_icon Size={14} Color={validateCheck[1]} />
                  &nbsp;Только латинские символы
                </p>
                <p className="">
                  <Active_icon Size={14} Color={validateCheck[2]} />
                  &nbsp;Как минимум одна цифра
                </p>
                <p className="">
                  <Active_icon Size={14} Color={validateCheck[3]} />
                  &nbsp;Строчные и заглавные буквы
                </p>
                <div className="pDPassInputWrapper">
                  <input placeholder="Повторите пароль еще раз" type={inputSecondEye ? "password" : "text"} value={passwordTwo} onChange={(e) => confirmPassword(e)} />
                  <a
                    className="pDPassInvis"
                    onClick={() => {
                      setInputSecondEye(!inputSecondEye);
                    }}
                  ></a>
                </div>
                {passwordCoincidence == null ? null : passwordCoincidence == "noValid" ? <p className="error small">Условия не выполнены</p> : passwordCoincidence == "send" ? <p className="success small">Пароли совпадают</p> : <p className="error small">Пароли не совпадают</p>}
              </div>
            </div>
            {matchesTablet || matchesMobile ? <RightArrow/> : null}
            {passwordCoincidence == "send" ? (
              <a href="#" className="sendButton" type="button" onClick={(e) => passwordSubmit(e)}>
                Изменить пароль
              </a>
            ) : null}
          </div>
        </div>
      </div>
      <Modal {...modal} />
    </div>
  );
}

export default PersonalData;
