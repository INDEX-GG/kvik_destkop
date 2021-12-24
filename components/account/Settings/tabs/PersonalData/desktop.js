import { useRef, useState } from "react";
// import { Button, Dialog } from "@material-ui/core";
import { useForm } from "react-hook-form";
import clsx from "clsx";
import { AddressSuggestions } from "react-dadata";
import Modal from "#components/Modal";
import { phoneNumber } from "#lib/services";
import { getTokenDataByPost, updatePassword } from "#lib/fetch";
import { useStore } from "#lib/Context/Store";
import { useAuth } from "#lib/Context/AuthCTX";
import {
	invalidCharacterChangePassword,
	checkLatin,
	checkRegister,
	checkNumber,
	checkWhitespace,
	checkCyrillic,
	endOfValidation
} from "#lib/regulars";
import { useMedia } from "#hooks/useMedia"
import { modalDeletHistory } from "#components/Modals";
import Active_icon from "#UI/icons/ActiveIcon";
import RightArrow from "#UI/icons/RightArrow"
import MobileModal from "#components/MobileModal";
import DeleteAccountModal from "#components/DeleteAccountModal"
import AccountCity from "#components/account/Settings/tabs/components/AccountCity";
import { CheckBoxSwitch } from "#components/inputs/CheckBoxSwitch";
import { InternalLink } from "#components/links/InternalLink";
import { FormSection } from "#components/forms/FormSection";
import { Button } from "#components/buttons/Button";
import { Form } from "#components/forms/Form";
import { SubmitButton } from "#components/buttons/SubmitButton";
import { changePersonalData } from "#lib/account/changePersonalData";
import { validatePassword } from "#lib/account/validatePassword";


/**
 * @param {object} props
 * @param {import("#lib/fetch").UserInfo} props.userInfo
 */
const PersonalForm = ({ userInfo }) => {
	const { id: userID, token } = useAuth();
	const { handleSubmit, register } = useForm();

	/**
	 * @param {{ name: string, address: string }} formData 
	 */
	const handlerUserDataChange = async (formData) => {
		try {
			console.log(formData);
			const resData = await changePersonalData({
				userID,
				userName: formData.name,
				userAddress: formData.address,
				token
			});
			console.log(resData);
		} catch (error) {
			console.error(error);
		}
	}

	/**
	 * @type {import("#components/buttons/Button").ClickCallback}
	 */
	const handlerPhoneNumberAddition = async () => {
		return;
	}

	return (
		<form className="form" onSubmit={handleSubmit(handlerUserDataChange)}>
			<div className="form__section">
				<label className="form__label user-info__label" htmlFor="user-name">Имя</label>
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

			<div className="form__section">
				<label className="form__label user-info__label" htmlFor="user-address">Адрес</label>
				<div className="form__content">
					<input
						className="form__input"
						id="user-address"
						type="text"
						defaultValue={userInfo.address}
						{...register("address")}
					/>
				</div>
			</div>

			<div className="form__section form__section--phone">
				<label className="form__label user-info__label" htmlFor="user-phone">Телефон</label>
				<div className="form__content">
					<span
						id="user-phone"
						className="user-info__phone-number"
					>
						{phoneNumber(userInfo.phone)}
					</span>
					<button
						className={clsx(
							"form__button",
							"form__button--button",
						)}
						type="button"
						disabled
						onClick={handlerPhoneNumberAddition}
					>
						Добавить номер
					</button>

				</div>
			</div>
			<div className="form__section">
				<button
					className="form__button form__submit"
					type="submit"
				>
					Сохранить
				</button>
			</div>
		</form>
	)
}

const SocialForm = () => {
	return (
		<form className="form">
			<div className="form__section">
				<div className="form__content">
					<ul className="social">
						<li className="social__item social__item--vk">
							<a className="social__link">Вконтакте</a>
							<CheckBoxSwitch checkID="social-vk" />
						</li>
						<li className="social__item social__item--ok">
							<a className="social__link">Одноклассники</a>
							<CheckBoxSwitch checkID="social-ok" />
						</li>
						<li className="social__item social__item--inst">
							<a className="social__link">Instagram</a>
							<CheckBoxSwitch checkID="social-inst" />
						</li>
						<li className="social__item social__item--fb">
							<a className="social__link">Facebook</a>
							<CheckBoxSwitch checkID="social-fb" />
						</li>
					</ul>
				</div>
			</div>

			<div className="form__section">
				<div className="user-info__label"></div>
				<button
					className="form__button form__button--button user-info__button"
					type="button"
					disabled
				>
					Добавить почту
				</button>
			</div>
		</form>
	)
}

const DeviceForm = () => {
	const { handleSubmit } = useForm();
	const handlerClearDevices = async () => {
		return
	}

	return (
		<form className="form" onSubmit={handleSubmit(handlerClearDevices)}>
			<div className="form__section">
				<div className="form__label"></div>
				<dl className="devices">
					<div className="devices__item">
						<dt className="devices__device">Windows, браузер Chrome</dt>
						<dd className="devices__visit">Сегодня в 12:52, Челябинск, Россия</dd>
					</div>
					<div className="devices__item">
						<dt className="devices__device">Windows, браузер Yandex</dt>
						<dd className="devices__visit">Вчера в 12:52, Тюмень, Россия</dd>
					</div>
				</dl>
			</div>

			<div className="form__section">
				<div className="form__label"></div>
				<button
					className="form__button form__submit"
					type="submit"
				>
					Очистить
				</button>
			</div>
		</form>
	)
}

const PasswordForm = () => {
	const { token } = useAuth();
	const { register, handleSubmit } = useForm()

	/**
	 * @param {{ old_password: string, password: string }} formData 
	 */
	const handlerPasswordChange = async (formData) => {
		const [isValidPassword, formattedPassword] = validatePassword(formData.old_password, formData.password);

		if (!isValidPassword) {
			return;
		}

		try {
			const data = await updatePassword(formattedPassword, token);
			console.log(data);
		} catch (error) {
			console.error(error);
		}

	}

	return (
		<form
			id="user-password-change"
			className="form"
			onSubmit={handleSubmit(handlerPasswordChange)}
		>
			<div className="form__section">
				<label className="form__label" htmlFor="user-current-pass">Текущий пароль</label>
				<div className="form__content">
					<input
						{...register("old_password")}
						type="password"
						id="user-current-pass"
						className="form__input"
						autoComplete="current-password"
					/>
				</div>
			</div>

			<div className="form__section">
				<label className="form__label" htmlFor="user-new-pass">Новый пароль</label>
				<div className="form__content">
					<input
						{...register("password")}
						type="password"
						id="user-new-pass"
						className="form__input"
						autoComplete="new-password"
					/>
				</div>
			</div>

			<div className="form__section">
				<button
					className="form__button form__submit"
					type="submit"
				>
					Изменить
				</button>
			</div>
		</form >
	)
}

const AccountDeletionForm = () => {
	const { handleSubmit } = useForm()
	const handlerDeleteAccount = async () => {
		return;
	}

	return (
		<form className="form" onSubmit={handleSubmit(handlerDeleteAccount)}>
			<div className="form__section">
				<div className="form__label"></div>
				<span>Все данные, включая объявления, будут стерты</span>
			</div>

			<div className="form__section">
				<button
					className="form__button form__submit"
					type="submit"
				>
					Удалить
				</button>
			</div>
		</form>
	)
}

export const PersonalDataDesktop = () => {
	const { isAuth, id: userID, token } = useAuth();
	const { userInfo, setUserInfo } = useStore();
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
			phone: phoneNumber(userInfo?.phone),
		};
	} else {
		userSettings = {
			phone: phoneNumber(userInfo?.phone),
		};
	}

	const { matchesTablet, matchesMobile } = useMedia();
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
	const [passwordDialog, setPasswordDialog] = useState(false);
	const [open, setOpen] = useState(false);

	userInfo?.name === undefined ? "" : test();

	function test() {
		if (limit.current == 0) {
			setValueName(userInfo?.name);
			limit.current = 1;
		}
	}

	return (
		<div className="clientPage__container_bottom">
			<div className="clientPage__container_content">
				<div className="privateDataWrapper thin user-info">
					<section className="user-info__section">
						<h2 className="user-info__heading">Личная информация</h2>
						<PersonalForm userInfo={userInfo} />
					</section>

					<section className="user-info__section">
						<h2 className="user-info__heading">Соцсети и сервисы</h2>
						<SocialForm />
					</section>

					<section className="user-info__section">
						<h2 className="user-info__heading">Устройства</h2>
						<DeviceForm />
					</section>

					<section className="user-info__section">
						<h2 className="user-info__heading">Смена пароля</h2>
						<PasswordForm />
					</section>

					<section className="user-info__section">
						<h2 className="user-info__heading">Удаление профиля</h2>
						<AccountDeletionForm />
					</section>


					{/* <div>
						<div>Телефон</div>
						<div>
							<p>{userSettings.phone}</p>
							<a className="small highlight underline clientPage__phone">Добавить ещё телефон</a>
						</div>
						{matchesMobile || matchesTablet ? <a><div className="changeMobile"><div>{userInfo?.phone}</div><RightArrow /></div></a> : <a>Изменить</a>}
					</div>
					<div>
						<div>E-mail</div>
						<div>
							<p>{userInfo?.email === undefined ? "E-mail не указан" : userInfo?.email}</p>
							<p className="error small">E-mail не подтвержден</p>
							<p className="light small">Укажите E-mail для получения уведомлений, новостей, спец. предложений и для восстановления пароля.</p>
						</div>
						{matchesTablet || matchesMobile ? (
							<>
								<a><div className="changeMobile"><p className="error small">E-mail не подтвержден</p><RightArrow /></div></a>
								<p className="light small">Укажите E-mail для получения уведомлений, новостей, спец. предложений и для восстановления пароля.</p>
							</>
						) : <a>Указать</a>}
					</div>
					<div>
						<div>Социальные сети</div>
						<div>

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
						{matchesTablet || matchesMobile ? <RightArrow /> : <div>Очистить</div>}
					</div>
					{matchesTablet || matchesMobile ? null :
						<div>
							<div>Выход</div>
							<div>Выйти</div>
							<div>Выйти со всех устройств</div>
						</div>
					}
					<div>
						{matchesMobile || matchesTablet
							? <div>Удалить аккаунт</div>
							: <div>Аккаунт</div>
						}
						<div>Удалить аккаунт</div>
						{matchesMobile || matchesTablet
							? <RightArrow />
							: (<a
								onClick={() => {
									setOpen(!open)
									// modalOlen(e, "sm", modalDeleteAccount()); старая модалка
								}}
								className="offerUnpublish thin superLight"
							>
								Удалить навсегда
							</a>)
						}
						<Dialog
							open={open}
							onClose={() => setOpen(!open)}
						>
							<DeleteAccountModal setOpen={setOpen} />
						</Dialog>
					</div> */}
					{/* <div>
						<div>Сменить пароль</div>
						<div>
							<div className="privateDataPass">
								<div className="pDPassInputWrapper">
									<input placeholder="Введите новый пароль" type={inputFirstEye ? "password" : "text"} value={passwordOne} onChange={(e) => changePasswordInput(e)} />
									<a className={inputFirstEye ? "pDPassInputWrapperInv" : "pDPassInputWrapperVis"} onClick={() => setInputFirstEye(!inputFirstEye)}></a>
								</div>
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
										className={inputSecondEye ? "pDPassInputWrapperInv" : "pDPassInputWrapperVis"}
										onClick={() => {
											setInputSecondEye(!inputSecondEye);
										}}
									/>
								</div>
								{passwordCoincidence == null ? null : passwordCoincidence == "noValid" ? <p className="error small">Условия не выполнены</p> : passwordCoincidence == "send" ? <p className="success small">Пароли совпадают</p> : <p className="error small">Пароли не совпадают</p>}
							</div>
						</div>
						{matchesTablet || matchesMobile ?
							<div onClick={() => setPasswordDialog(!passwordDialog)}>
								<RightArrow />
							</div> : null}
						{passwordCoincidence == "send" ? (
							<a href="#" className="sendButton" type="button" onClick={(e) => passwordSubmit(e)}>
								Изменить пароль
							</a>
						) : null}
					</div> */}
				</div>
			</div>
			{/* <Modal {...modal} />
			<MobileModal dialog={passwordDialog || false} title='Cмена пароля' close={() => setPasswordDialog(false)}>
				<div className="mobilePasswordContainer">
					<div className="privateDataPass">
						<div className="pDPassInputWrapper">
							<input placeholder="Введите новый пароль" type={inputFirstEye ? "password" : "text"} value={passwordOne} onChange={(e) => changePasswordInput(e)} />
							<a className="pDPassInvis" onClick={() => setInputFirstEye(!inputFirstEye)} />
						</div>
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
							/>
						</div>
						{passwordCoincidence == null ? null : passwordCoincidence == "noValid" ? <p className="error small">Условия не выполнены</p> : passwordCoincidence == "send" ? <p className="success small">Пароли совпадают</p> : <p className="error small">Пароли не совпадают</p>}
						{passwordCoincidence == "send" ? (
							<Button className="sendButton" type="button" onClick={(e) => passwordSubmit(e)}>
								Изменить пароль
							</Button>
						) : null}
					</div>
				</div>
			</MobileModal> */}
		</div>
	);
}

/*
	<p className="pDPassWarning">Минимум 8 символов</p>
	<p className="pDPassWarning">Только латинские символы</p>
	<p className="pDPassError">Как минимум одна цифра</p>
	<p className="pDPassError">Строчные и заглавные буквы</p>
*/