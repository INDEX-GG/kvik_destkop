import { useRef, useState } from "react";
// import { Button, Dialog } from "@material-ui/core";
import { useForm } from "react-hook-form";
import Modal from "#components/Modal";
import { phoneNumber } from "#lib/services";
import { getTokenDataByPost } from "#lib/fetch";
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
import { BaseInput } from "#components/inputs/BaseInput";
import { Label } from "#components/forms/Label";
import { Button } from "#components/buttons/Button";
import { Form } from "#components/forms/Form";
import { SubmitButton } from "#components/buttons/SubmitButton";
import { TextInput } from "#components/inputs/TextInput";
import { PasswordForm } from "./PasswordForm";
import { PasswordSection } from "#components/forms/PasswordSection";


export const PersonalDataDesktop = () => {
	const { isAuth, id: userID, token } = useAuth();
	const { userInfo, setUserInfo } = useStore();
	const updatePassForm = useForm()
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

	//!! Валидация формы

	function changePasswordInput(event) {

		if (!event.target.value.match(invalidCharacterChangePassword())) {
			return;
		}


		let length = false;
		let number = false;
		let registr = false;
		let languageEu = false;
		let lenguageRu = false;
		// ! Проверка на длинну

		if (event.target.value.length >= 8) {
			length = true;
		}

		// ! Проверка на Латиницу
		if (event.target.value.match(checkLatin()) || event.target.value.match(checkLatin()) != null) {
			languageEu = true;
		}
		// ! Провека на цифру
		if (event.target.value.match(checkNumber())) {
			number = true;
		}
		//! Проверка на регистр
		if (event.target.value.match(checkRegister()) && event.target.value.match(checkRegister()) != null) {
			registr = true;
		}
		//! Проверка на пробел
		if (!event.target.value.match(checkWhitespace())) {
			event.target.value = event.target.value
				.split("")
				.splice(0, event.target.value.length - 1)
				.join("");
		}
		//! Проверка на кириллицу
		if (event.target.value.match(checkCyrillic())) {
			lenguageRu = true;
			languageEu = false;
		}

		if (lenguageRu) {
			setPasswordValid(false);
		}

		//! Конец валидации
		if (event.target.value.match(endOfValidation()) && !lenguageRu) {
			setPasswordValid(true);
		} else {
			setPasswordValid(false);
		}

		function createArr() {
			return [
				length
					? "#C7C7C7"
					: "#F44545",
				languageEu
					? "#C7C7C7"
					: "#F44545",
				number
					? "#C7C7C7"
					: "#F44545",
				registr
					? "#C7C7C7"
					: "#F44545"
			];
		}

		setPasswordOne(event.target.value);
		confirmPassword(event, "input1");
		setValidateCheck(createArr());
	}

	function confirmPassword(e, field = null) {
		if (field === "input1") {
			if (e.target.value == passwordTwo && passwordTwo.length > 0) {
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

		if (!e.target.value.match(invalidCharacterChangePassword())) {
			return;
		}


		if (!e.target.value.match(checkWhitespace())) {
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

	return (
		<div className="clientPage__container_bottom">
			<div className="clientPage__container_content">
				<div className="privateDataWrapper thin user-info">
					{/* <PasswordSection id="example-pass">Пример</PasswordSection> */}
					<Form className="user-info__form">
						<h2 className="user-info__heading">Личная информация</h2>
						<FormSection className="user-info__section">
							<Label className="user-info__label" htmlFor="user-name">Имя</Label>
							<FormSection className="user-info__content">
								<TextInput id="user-name" defaultValue={userInfo.name} />
							</FormSection>
						</FormSection>

						<FormSection className="user-info__section user-info__section--address">
							<span className="user-info__label">Адрес</span>
							<FormSection className="user-info__content">
								<FormSection className="user-info__section">
									<Label className="user-info__label" htmlFor="user-city">Город</Label>
									<TextInput id="user-city" />
								</FormSection>
								<FormSection className="user-info__section">
									<Label className="user-info__label" htmlFor="user-street">Улица</Label>
									<TextInput id="user-street" />
								</FormSection>
							</FormSection>
						</FormSection>

						<FormSection className="user-info__section user-info__section--phone">
							<Label className="user-info__label" htmlFor="user-phone">Телефон</Label>
							<FormSection className="user-info__content">
								<span 
									id="user-phone" 
									className="user-info__phone-number"
								>
									{phoneNumber(userInfo.phone)}
								</span>
								<Button className="user-info__button" disabled >
									Добавить номер
								</Button>
								<SubmitButton>Сохранить</SubmitButton>
							</FormSection>
						</FormSection>
					</Form>

					<Form className="user-info__form user-info__form--social">
						<h2 className="user-info__heading">Соцсети и сервисы</h2>
						
						<FormSection className="user-info__content">
							<FormSection className="user-info__section">
								<div className="user-info__label"></div>
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
							</FormSection>

							<FormSection className="user-info__section">
								<div className="user-info__label"></div>
								<Button className="user-info__button" disabled>Добавить почту</Button>
							</FormSection>
						</FormSection>
					</Form>

					<Form className="user-info__form">
						<h2 className="user-info__heading">Устройства</h2>
						<FormSection className="user-info__content">
							<FormSection className="user-info__section">
								{/* <div className="user-info__label"></div>
									<dl>
										<div>
											<dt className="user-info__device">Windows, браузер Chrome</dt>
											<dd className="user-info__visit">Сегодня в 12:52, Челябинск, Россия</dd>
										</div>
										<div>
											<dt className="user-info__device">Windows, браузер Yandex</dt>
											<dd className="user-info__visit">Вчера в 12:52, Тюмень, Россия</dd>
										</div>
									</dl>						 */}
							</FormSection>

							<FormSection className="user-info__section">
								<div className="user-info__label"></div>
								{/* <SubmitButton>Очистить</SubmitButton> */}
							</FormSection>
							
						</FormSection>
					</Form>
					
					<PasswordForm onSubmit={(data) => console.log(data)} />

					<Form className="user-info__form user-info__form--erase">
						<h2 className="user-info__heading">Удаление профиля</h2>
						<FormSection className="user-info__content">
							<FormSection className="user-info__section">
								<div className="user-info__label"></div>
								<span>Все данные, включая объявления будут стерты</span>
							</FormSection>
							
							<FormSection className="user-info__section">
								<div className="user-info__label"></div>
								<SubmitButton>Удалить</SubmitButton>
							</FormSection>	
						</FormSection>
					</Form>
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