import React, { useRef, useState } from "react";
import Modal from "../../../Modal";
import { phoneNumber } from "../../../../lib/services";
import { modalDeletHistory, modalDeleteAccount } from "../../../Modals";
import { useUser } from "../../../../hooks/useUser";
import Active_icon from "../../../../UI/icons/ActiveIcon";
import axios from "axios";

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

  const [inputProfile, setInputProfile] = useState(true);
  const [valueName, setValueName] = useState("");
  const limit = useRef(0);

  //   const regExp = /(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z!@#$%^&*]{8,}/g;
  //   const rgExp1 = /(?=.*[0-9])/g;
  //   const rgExp2 = /])(?=.*[a-z])/g;
  //   const rgExp3 = /(?=.*[A-Z])/g;
  //   s;
  //   const rgExp4 = /[0-9a-zA-Z!@#$%^&*]/g;
  //   const rgExp5 = /{8,}/g;
  //   match

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
  const [validateCheck, setValidateCheck] = useState(["#C7C7C7", "#C7C7C7", "#C7C7C7", "#C7C7C7"]);
  const [passwordValid, setPasswordValid] = useState(false);
  const [passwordOne, setPasswordOne] = useState("");
  const [passwordCoincidence, setPasswordCoincidence] = useState(null);
  const inputFirstEye = useRef(true);
  const inputSecondEye = useRef(true);

  function changePasswordInput(e) {
    setPasswordOne(e.target.value);
    let length = false;
    let number = false;
    let language = false;
    let registr = false;

    function passwordLength() {
      if (e.target.value.length >= 8) {
        length = true;
      }
    }
    passwordLength();

    function passwordLanguage() {
      if (e.target.value.match(/(?=.*[a-z])/g) || e.target.value.match(/(?=.*[A-Z])/g) != null) {
        language = true;
      }
    }
    passwordLanguage();

    function passwordNumber() {
      if (e.target.value.match(/[\d.,:]/g)) {
        number = true;
      }
    }
    passwordNumber();

    function passwordRegistr() {
      if (e.target.value.match(/(?=.*[a-z])/g) && e.target.value.match(/(?=.*[A-Z])/g) != null) {
        registr = true;
      }
    }
    passwordRegistr();

    function passwordSpec() {
      if (e.target.value.match(/(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z!@#$%^&*]{8,}/g)) {
        setPasswordValid(true);
      } else {
        setPasswordValid(false);
      }
    }

    passwordSpec();

    function createArr() {
      return [length ? "#F44545" : "#C7C7C7", language ? "#F44545" : "#C7C7C7", number ? "#F44545" : "#C7C7C7", registr ? "#F44545" : "#C7C7C7"];
    }

    setValidateCheck(createArr());
  }

  function confirmPassword(e) {
    if (passwordValid && e.target.value.length > 0) {
      if (e.target.value == passwordOne) {
        setPasswordCoincidence(true);
      } else {
        setPasswordCoincidence(false);
      }
    } else {
      setPasswordCoincidence(null);
    }
  }

  return (
    <div className="clientPage__container_bottom">
      <div className="clientPage__container_content">
        <div className="privateDataWrapper thin">
          <div>
            <div>Профиль</div>
            {inputProfile ? (
              <div>{valueName}</div>
            ) : (
              <input
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
            {inputProfile ? <a onClick={() => setInputProfile(!inputProfile)}>Редактировать</a> : <a onClick={nameSubmit}>Сохранить</a>}
          </div>
          <div>
            <div>Город</div>
            <div>Город, Район, Улица</div>
            <a>Изменить</a>
          </div>
          <div>
            <div>Телефон</div>
            <div>
              <p>{userSettings.phone}</p>
              <a className="small highlight underline">Добавить ещё телефон</a>
            </div>
            <a>Изменить</a>
          </div>
          <div>
            <div>E-mail</div>
            <div>
              <p>{email === null ? "E-mail не указан" : email}</p>
              <p className="error small">E-mail не подтвержден</p>
              <p className="light small">Для чего указывать почту Для чего указывать почту Для чего указывать почту Для чего указывать почту Для чего указывать почту Для чего указывать почту Для чего указывать почту Для чего указывать почту </p>
            </div>
            <a>Указать</a>
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
              <p className="light small">Привяжите к своему профилю социальные сети для того чтобы???</p>
            </div>
          </div>
          <div>
            <div>История</div>
            <a
              onClick={(e) => {
                modalOlen(e, "sm", modalDeletHistory());
              }}
              className="offerUnpublish thin superLight"
            >
              Очистить историю поиска
            </a>
            <div>Очистить</div>
          </div>
          <div>
            <div>Выход</div>
            <div>Выйти</div>
            <div>Выйти со всех устройств</div>
          </div>
          <div>
            <div>Аккаунт</div>
            <div>Удалить аккаунт</div>
            <a
              onClick={(e) => {
                modalOlen(e, "sm", modalDeleteAccount());
              }}
              className="offerUnpublish thin superLight"
            >
              Удалить навсегда
            </a>
          </div>
          <div>
            <div>Сменить пароль</div>
            <div>
              <div className="privateDataPass">
                <div className="pDPassInputWrapper">
                  <input placeholder="Введите новый пароль" type={inputSecondEye.current ? "text" : "password"} onChange={(e) => changePasswordInput(e)} />
                  <a className="pDPassInvis" onClick={() => (inputSecondEye.current = !inputSecondEye.current)}></a>
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
                  <input placeholder="Повторите пароль еще раз" onChange={(e) => confirmPassword(e)} />
                  <a className="pDPassInvis"></a>
                </div>
                {passwordCoincidence == null ? null : passwordCoincidence ? <p className="success small">Пароли совподают</p> : <p className="error small">Пароли не совпадают</p>}
              </div>
            </div>
          </div>
        </div>
      </div>
      <Modal {...modal} />
    </div>
  );
}

export default PersonalData;
