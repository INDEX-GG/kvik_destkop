import React, { useState } from "react";
import Modal from "../../../Modal";
import { phoneNumber } from "../../../../lib/services";
import { modalDeletHistory, modalDeleteAccount } from "../../../Modals";
import { useUser } from "../../../../hooks/useUser";

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

  const [inputProfile, setInputProfile] = useState(false);

  return (
    <div className="clientPage__container_bottom">
      <div className="clientPage__container_content">
        <div className="privateDataWrapper thin">
          <div>
            <div>Профиль</div>
            <div>{username}</div>
            <a>Редактировать</a>
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
                  <input placeholder="Введите новый пароль" />
                  <a className="pDPassInvis"></a>
                </div>
                <p className="pDPassWarning">Минимум 8 символов</p>
                <p className="pDPassWarning">Только латинские символы</p>
                <p className="pDPassError">Как минимум одна цифра</p>
                <p className="pDPassError">Строчные и заглавные буквы</p>
                <div className="pDPassInputWrapper">
                  <input placeholder="Повторите пароль еще раз" />
                  <a className="pDPassInvis"></a>
                </div>
                <p className="error small">Пароли не совпадают</p>
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
