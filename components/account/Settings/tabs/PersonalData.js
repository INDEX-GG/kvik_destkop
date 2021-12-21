import React, { useRef, useState } from "react";
import Modal from "../../../Modal";
import { phoneNumber } from "../../../../lib/services";
// import { modalDeletHistory } from "../../../Modals";
import Active_icon from "../../../../UI/icons/ActiveIcon";
import { useMedia } from "../../../../hooks/useMedia"
// import RightArrow from "../../../../UI/icons/RightArrow"
// eslint-disable-next-line no-unused-vars
import { Button, Dialog } from "@material-ui/core";
import { useStore } from "../../../../lib/Context/Store";
import { useAuth } from "../../../../lib/Context/AuthCTX";
import { invalidCharacterChangePassword, checkLatin, checkRegister, checkNumber, checkWhitespace, checkCyrillic, endOfValidation } from "../../../../lib/regulars"
import MobileModal from "../../../MobileModal";
// import DeleteAccountModal from "../../../DeleteAccountModal"
// import AccountCity from "./components/AccountCity";
import { getTokenDataByPost } from "../../../../lib/fetch";

/**
 * Секция в списке.
 * @param {object} props
 * @param {JSX.Element} [props.children]
 * @param {string} props.className `className`, добавляющийся к корневому элементу как `Element.classList.add()`.
 * @param {any} props.sectionProps `props` `<section>` тэга
 */
const Section = ({ className = undefined, children, ...sectionProps }) => {
	const sectionClass = ["user-info__section", className && className].join(" ");
	return (
		<section className={sectionClass} {...sectionProps} >
			{children}
		</section>
	)
}

const PersonalData = () => {
	const { isAuth, id, token } = useAuth();
	// eslint-disable-next-line no-unused-vars
	const { userInfo, setUserInfo } = useStore();

	const [modal, setModal] = useState({});
	// eslint-disable-next-line no-unused-vars
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
		// eslint-disable-next-line no-unused-vars
		userSettings = {
			phone: phoneNumber(userInfo?.phone),
		};
	}
	// eslint-disable-next-line no-unused-vars
	const { matchesTablet, matchesMobile } = useMedia();
	// eslint-disable-next-line no-unused-vars
	const [inputProfile, setInputProfile] = useState(true);
	// eslint-disable-next-line no-unused-vars
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
	// eslint-disable-next-line no-unused-vars
	const [open, setOpen] = useState(false);

	userInfo?.name === undefined ? "" : test();

	function test() {
		if (limit.current == 0) {
			setValueName(userInfo?.name);
			limit.current = 1;
		}
	}

	//!! Валидация формы

	function changePasswordInput(e) {

		if (!e.target.value.match(invalidCharacterChangePassword())) {
			return;
		}


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
		if (e.target.value.match(checkLatin()) || e.target.value.match(checkLatin()) != null) {
			languageEu = true;
		}
		// ! Провека на цифру
		if (e.target.value.match(checkNumber())) {
			number = true;
		}
		//! Проверка на регистр
		if (e.target.value.match(checkRegister()) && e.target.value.match(checkRegister()) != null) {
			registr = true;
		}
		//! Проверка на пробел
		if (!e.target.value.match(checkWhitespace())) {
			e.target.value = e.target.value
				.split("")
				.splice(0, e.target.value.length - 1)
				.join("");
		}
		//! Проверка на кириллицу
		if (e.target.value.match(checkCyrillic())) {
			lenguageRu = true;
			languageEu = false;
		}

		if (lenguageRu) {
			setPasswordValid(false);
		}

		//! Конец валидации
		if (e.target.value.match(endOfValidation()) && !lenguageRu) {
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

	function passwordSubmit(e) {
		e.preventDefault();
		if (passwordSend.length > 0) {
			setPasswordOne("");
			setPasswordTwo("");
			const obj = { id: id, password: passwordSend };
			getTokenDataByPost("/api/settings/upPassword", obj, token).then((res) => console.log(res));
		}
	}

	return (
		<div className="clientPage__container_bottom">
			<div className="clientPage__container_content">
				<div className="privateDataWrapper thin user-info">
					<Section>
						{userInfo.name}
					</Section>
					{userInfo.address &&
						(<Section>
							{userInfo.address}
						</Section>)
					}
					<Section>
						{userInfo.phone}
					</Section>
					{userInfo.email &&
						(<Section>
							<span>{userInfo.email}</span>
						</Section>)
					}
					<Section className="user-info__section--social">
						<ul className="social">
							<li className="social__item social__item--vk">
								<a className="social__link">Вконтакте</a>
								<span>
									<input type="checkbox" />
								</span>
							</li>
							<li className="social__item social__item--ok">
								<a className="social__link">Одноклассники</a>
								<span>
									<input type="checkbox" />
								</span>
							</li>
							<li className="social__item social__item--inst">
								<a className="social__link">Instagram</a>
								<span>
									<input type="checkbox" />
								</span>
							</li>
							<li className="social__item social__item--fb">
								<a className="social__link">Facebook</a>
								<span>
									<input type="checkbox" />
								</span>
							</li>
						</ul>
					</Section>
					<Section>
						Устройства
					</Section>
					<Section>
						Смена пароля
					</Section>
					<Section>
						Удалить аккаунт
					</Section>
					{/* <div>
						<div>Телефон</div>
						<div>
							<p>{userSettings.phone}</p>
							<a className="small highlight underline clientPage__phone">Добавить ещё телефон</a>
						</div>
						{matchesMobile || matchesTablet ? <a><div className="changeMobile"><div>{userInfo?.phone}</div><RightArrow /></div></a> : <a>Изменить</a>}
					</div> */}
					{/* <div>
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
					</div> */}
					{/* <div>
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
					</div> */}
					{/* <div>
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
					</div> */}
					{/* {matchesTablet || matchesMobile ? null :
						<div>
							<div>Выход</div>
							<div>Выйти</div>
							<div>Выйти со всех устройств</div>
						</div>
					} */}
					{/* <div>
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
			<Modal {...modal} />
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
			</MobileModal>
		</div>
	);
}

export default PersonalData;

/*
	<p className="pDPassWarning">Минимум 8 символов</p>
	<p className="pDPassWarning">Только латинские символы</p>
	<p className="pDPassError">Как минимум одна цифра</p>
	<p className="pDPassError">Строчные и заглавные буквы</p>
*/