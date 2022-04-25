import { useForm } from "react-hook-form";
import clsx from "clsx";
import { AddressSuggestions } from "react-dadata";
// import { phoneNumber } from "#lib/services";
import { useStore } from "#lib/Context/Store";
import { useAuth } from "#lib/Context/AuthCTX";
// import Search from '#UI/icons/Search';
import { CheckBoxSwitch } from "#components/inputs/CheckBoxSwitch";
import { changePersonalData } from "#lib/account/changePersonalData";
import { useState } from "react";
import { PasswordForm } from "./Forms";
import { formatPhoneNumber } from "#lib/phoneMask";
import CustomButtonUI from "src/UI/UIcomponent/CustomButtonUI/CustomButtonUI";

import { makeStyles } from "@material-ui/core";
import CustomLinkUI from "src/UI/UIcomponent/CustomLinkUI/CustomLinkUI";

const useStyles = makeStyles(() => ({
  formButton: {
    fontSize: 18,
    width: "160px",
    border: "1px solid #c7c7c7",
    borderRadius: "4px",
    fontWeight: 400,
  },
  formButtonString: {
    gridArea: "content",
    justifySelf: "baseline",
    width: "auto",
    minHeight: 0,
    color: "#00a2ad",
    backgroundColor: "transparent",
    borderRadius: 0,
    border: "none",
    fontSize: "1rem",
    "&:hover": {
      backgroundColor: "transparent",
    },
  },
}));
/**
 * TODO: переписать на бесконтрольный вариант.
 * @param {object} props
 * @param {import("#lib/fetch").UserInfo} props.userInfo
 */
const PersonalForm = ({ userInfo }) => {
  const { id: userID, token } = useAuth();
  const { handleSubmit, register } = useForm();
  const [userAddress, changeUserAddress] = useState(
    userInfo.address || userInfo?.location?.name
  );

  const { setUserInfo } = useStore();
  const classes = useStyles();
  /**
   * @param {{ name: string, address: string }} formData
   */
  const handlerUserDataChange = async (formData) => {
    try {
      await changePersonalData({
        userID,
        userName: formData.name,
        userAddress: userAddress,
        token,
      });
      userInfo.name = formData.name;

      setUserInfo((prev) => ({ ...prev, name: formData.name }));
    } catch (error) {
      console.error(error);
    }
  };

  /**
   * @type {import("#components/buttons/Button").ClickCallback}
   */
  const handlerPhoneNumberAddition = async () => {
    return;
  };

  /**
   * @param {import("react-dadata").DaDataSuggestion<import("react-dadata").DaDataAddress>} suggestion
   */
  const handlerLocationSuggestion = (suggestion) => {
    changeUserAddress(suggestion.value);
  };

  return (
    <form className="form " onSubmit={handleSubmit(handlerUserDataChange)}>
      <div className="form__section">
        <label className="form__label user-info__label" htmlFor="user-name">
          Имя
        </label>
        <div className="form__content">
          <input
            className="form__input"
            id="user-name"
            type="text"
            defaultValue={userInfo.name}
            {...register("name")}
          />
        </div>
      </div>

      <div className="form__section user-info__section--location">
        <label className="form__label user-info__label" htmlFor="user-address">
          Адрес
        </label>
        <div className="form__content user-info__location">
          <input className="form__input" type="hidden" value={userAddress} />
          <AddressSuggestions
            containerClassName="user-info__suggest"
            token="3fa959dcd662d65fdc2ef38f43c2b699a3485222"
            filterFromBound="city-region"
            filterToBound="house"
            defaultQuery={userAddress}
            count={5}
            minChars={2}
            delay={5}
            onChange={handlerLocationSuggestion}
          />
        </div>
      </div>

      <div className="form__section form__section--phone">
        <label className="form__label user-info__label" htmlFor="user-phone">
          Телефон
        </label>
        <div className="form__content">
          <span id="user-phone" className="user-info__phone-number">
            {formatPhoneNumber(userInfo.phone)}
          </span>
          <CustomButtonUI
            // customRoot={clsx(
            //   "form__button",
            //   "form__button--button",
            //   "form__button--border"
            // )}
            customRoot={classes.formButton}
            type="button"
            disabled={true}
            onClick={handlerPhoneNumberAddition}
          >
            Добавить номер
          </CustomButtonUI>
        </div>
      </div>
      <div className="form__section">
        <CustomButtonUI
          disableRipple={true}
          //   customRoot="form__button form__submit"
          customRoot={classes.formButtonString}
          type="submit"
        >
          Сохранить
        </CustomButtonUI>
      </div>
    </form>
  );
};

/**
 * @param {object} props
 * @param {string} props.className
 */
const SocialForm = ({ className }) => {
  const blockClass = clsx("form", className);
  const classes = useStyles();
  return (
    <form className={blockClass}>
      <div className="form__section form__section--social">
        <div className="form__content">
          <ul className="social social--desktop">
            {/*<li className="social__item social__item--inst">*/}
            {/*<a className="social__link">Instagram</a>*/}
            {/*<CheckBoxSwitch*/}
            {/*	checkID="social-inst"*/}
            {/*	width="45px"*/}
            {/*	height="23px"*/}
            {/*	checkboxSize="19px"*/}
            {/*	borderRadius="4px"*/}
            {/*	checkboxBorderRadius="6px"*/}
            {/*/>*/}
            {/*</li>*/}
            <li className="social__item social__item--vk">
              <CustomLinkUI defaultColor={false} customRoot={"social__link"}>
                Вконтакте
              </CustomLinkUI>
              <CheckBoxSwitch
                checkID="social-vk"
                width="45px"
                height="23px"
                checkboxSize="19px"
                borderRadius="4px"
                checkboxBorderRadius="6px"
              />
            </li>
            <li className="social__item social__item--ok">
              <CustomLinkUI defaultColor={false} customRoot="social__link">
                Одноклассники
              </CustomLinkUI>
              <CheckBoxSwitch
                checkID="social-ok"
                width="45px"
                height="23px"
                checkboxSize="19px"
                borderRadius="4px"
                checkboxBorderRadius="6px"
              />
            </li>
            {/*<li className="social__item social__item--fb">*/}
            {/*	<a className="social__link">Facebook</a>*/}
            {/*	<CheckBoxSwitch*/}
            {/*		checkID="social-fb"*/}
            {/*		width="45px"*/}
            {/*		height="23px"*/}
            {/*		checkboxSize="19px"*/}
            {/*		borderRadius="4px"*/}
            {/*		checkboxBorderRadius="6px"*/}
            {/*	/>*/}
            {/*</li>*/}
          </ul>
        </div>
      </div>

      <div className="form__section">
        <div className="user-info__label" />
        <CustomButtonUI customRoot={classes.formButton} type="button">
          Добавить почту
        </CustomButtonUI>
      </div>
    </form>
  );
};

// eslint-disable-next-line no-unused-vars
const DeviceForm = () => {
  const { handleSubmit } = useForm();
  const handlerClearDevices = async () => {
    return;
  };

  return (
    <form className="form" onSubmit={handleSubmit(handlerClearDevices)}>
      <div className="form__section">
        <div className="form__label" />
        <dl className="devices">
          <div className="devices__item">
            <dt className="devices__device">Windows, браузер Chrome</dt>
            <dd className="devices__visit">
              Сегодня в 12:52, Челябинск, Россия
            </dd>
          </div>
          <div className="devices__item">
            <dt className="devices__device">Windows, браузер Yandex</dt>
            <dd className="devices__visit">Вчера в 12:52, Тюмень, Россия</dd>
          </div>
        </dl>
      </div>

      <div className="form__section">
        <div className="form__label" />
        <button className="form__button form__submit" type="submit">
          Очистить
        </button>
      </div>
    </form>
  );
};

const AccountDeletionForm = () => {
  const { handleSubmit } = useForm();
  const classes = useStyles();
  const handlerDeleteAccount = async () => {
    return;
  };

  return (
    <form className="form" onSubmit={handleSubmit(handlerDeleteAccount)}>
      <div className="form__section">
        <div className="form__label" />
        <span className="user-info__notice">
          Все данные, включая объявления, будут стерты
        </span>
      </div>

      <div className="form__section">
        <CustomButtonUI
          //  customRoot="form__button form__submit"
          customRoot={classes.formButtonString}
          type="submit"
        >
          Удалить
        </CustomButtonUI>
      </div>
    </form>
  );
};

export const PersonalDataDesktop = () => {
  const { userInfo } = useStore();

  return (
    <div className="clientPage__container_bottom">
      <div className="clientPage__container_content">
        <div className="privateDataWrapper thin user-info">
          <section className="user-info__section">
            <h2 className="user-info__heading">Личная информация</h2>
            <PersonalForm userInfo={userInfo} />
          </section>

          <section className="user-info__section user-info__section--disabled">
            <h2 className="user-info__heading">Соцсети и сервисы</h2>
            <SocialForm className="user-info--social" />
          </section>

          <section className="user-info__section user-info__section--disabled">
            <h2 className="user-info__heading">Устройства</h2>
            {/* <DeviceForm /> */}
          </section>

          <section className="user-info__section">
            <h2 className="user-info__heading">Смена пароля</h2>
            <PasswordForm />
          </section>

          <section className="user-info__section user-info__section--disabled">
            <h2 className="user-info__heading">Удаление профиля</h2>
            <AccountDeletionForm />
          </section>
        </div>
      </div>
    </div>
  );
};

/*
	<p className="pDPassWarning">Минимум 8 символов</p>
	<p className="pDPassWarning">Только латинские символы</p>
	<p className="pDPassError">Как минимум одна цифра</p>
	<p className="pDPassError">Строчные и заглавные буквы</p>
*/
