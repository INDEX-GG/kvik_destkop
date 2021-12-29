// eslint-disable-next-line no-unused-vars
import { useRef, useState } from "react";
// eslint-disable-next-line no-unused-vars
import { Button, Dialog, makeStyles } from "@material-ui/core";

import Modal from "#components/Modal";
// import { modalDeletHistory } from "#components/Modals";
import { phoneNumber } from "#lib/services";
import Active_icon from "#UI/icons/ActiveIcon";
// import { useMedia } from "#hooks/useMedia"
// import RightArrow from "#UI/icons/RightArrow"
import { useStore } from "#lib/Context/Store";
import { useAuth } from "#lib/Context/AuthCTX";
// import { invalidCharacterChangePassword, checkLatin, checkRegister, checkNumber, checkWhitespace, checkCyrillic, endOfValidation } from "#lib/regulars"
import MobileModal from "#components//MobileModal";
// import DeleteAccountModal from "#components/DeleteAccountModal"
// import AccountCity from "#components/account/Settings/tabs/components/AccountCity";
// import { getTokenDataByPost } from "#lib/fetch";
import { CheckBoxSwitch } from "#components/inputs/CheckBoxSwitch";
import { InternalLink } from "#components/links/InternalLink";
// import { PersonalDataSection } from "./section";
import { updateUserAddress, updateUserName } from "#lib/fetch";
import DialogUI from "#components/UI/DialogUI";
import { AddressSuggestions } from "react-dadata";
import { PasswordFormMobile } from "./Forms";
// import { NavigationButton } from "#components/buttons/NavigationButton";


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

const UserAddressTab = () => {
	const classes = makeStyles({
		block: {
			position: "relative",
			background: "#FFFFFF",
			boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.1)",
		},
		input: {
			width: "100%",
			fontSize: "100%",
			fontFamily: "inherit",
			height: "48px",
			border: "none",
			padding: "1em",
			"&:focus": {
				
			}
		}
	})();
	const { id: userID, token } = useAuth();
	const { userInfo } = useStore();

	/**
	 * @param {import("react-dadata").DaDataSuggestion<import("react-dadata").DaDataAddress>} suggestion 
	 */
	const handlerLocationSuggestion = async (suggestion) => {
		try {
			await updateUserAddress({
				userAddress: suggestion.value,
				userID,
				token
			})
		} catch (error) {
			console.error(error);
		}

	}

	return (
		<div className={classes.block}>
			<AddressSuggestions
				containerClassName={classes.suggest}
				token="3fa959dcd662d65fdc2ef38f43c2b699a3485222"
				filterFromBound='city-region'
				filterToBound='settlement'
				defaultQuery={userInfo.address}
				count={5}
				minChars={2}
				delay={5}
				onChange={handlerLocationSuggestion}
				inputProps={{ className: classes.input}}
			/>
		</div>)
}

/**
 * @param {object} props
 * @param {import("#lib/fetch").UserInfo} props.userInfo
 * @param {string} props.name 
 */
const UserNameForm = () => {
	const { id: userID, token } = useAuth();
	const { userInfo } = useStore();

	/**
	 * @param {React.FocusEvent<HTMLInputElement>} event 
	 */
	const handlerUserNameChange = async (event) => {
		try {
			await updateUserName({
				userName: event.target.value,
				userID,
				token
			});
		} catch (error) {
			console.error(error)
		}
	}

	return (
		<div className="form user-info__section">
			<div className="form__section">
				<input
					id="user-name"
					className="form__input"
					type="text"
					name="user-name"
					defaultValue={userInfo.name}
					onBlur={handlerUserNameChange}
				/>
			</div>
		</div>
	)
}

export const PersonalDataMobile = () => {
	// eslint-disable-next-line no-unused-vars
	const { isAuth, id: userID, token } = useAuth();
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

	// const { matchesTablet, matchesMobile } = useMedia();

	// const [inputProfile, setInputProfile] = useState(true);

	// const [valueName, setValueName] = useState("");
	// const limit = useRef(0);
	// eslint-disable-next-line no-unused-vars
	const [validateCheck, setValidateCheck] = useState(["#F44545", "#F44545", "#F44545", "#F44545"]);
	// const [passwordValid, setPasswordValid] = useState(false);
	// eslint-disable-next-line no-unused-vars
	const [passwordOne, setPasswordOne] = useState("");
	// eslint-disable-next-line no-unused-vars
	const [passwordTwo, setPasswordTwo] = useState("");
	// const [passwordSend, setPasswordSend] = useState("");
	// eslint-disable-next-line no-unused-vars
	const [passwordCoincidence, setPasswordCoincidence] = useState(null);
	const [inputFirstEye, setInputFirstEye] = useState(true);
	const [inputSecondEye, setInputSecondEye] = useState(true);
	const [passwordDialog, setPasswordDialog] = useState(false);
	const [isAddressPageOpen, switchAddressPage] = useState(false);
	const [isPasswordPageOpen, switchPasswordPage] = useState(false);

	// const [open, setOpen] = useState(false);

	return (
		<div className="clientPage__container_bottom">
			<div className="clientPage__container_content">
				<div className="privateDataWrapper thin user-info user-info--mobile">
					<UserNameForm />
					<div className="user-info__section">
						<button
							type="button"
							className="nav-button"
							style={{ flexFlow: "row nowrap" }}
							onClick={() => { switchAddressPage(true) }}
						>
							<span className="nav-button__text" style={{ textAlign: "left" }}>
								{userInfo.address || userInfo?.location?.name}
							</span>
							<span className="nav-button__arrow">
								<svg
									width="11"
									height="17"
									viewBox="0 0 11 17"
									fill="none"
									xmlns="http://www.w3.org/2000/svg"
								>
									<path
										d="M1.954 15.883L9.14214 8.92896L1.954 1.97495"
										stroke="#C7C7C7"
										strokeWidth="2"
										strokeLinecap="round"
										strokeLinejoin="round"
									/>
								</svg>
							</span>
						</button>
					</div>
					<Section className="user-info__section--phone">
						<span>{userInfo.phone}</span>
						<InternalLink className="user-info__phone-link" href={location.toString()} >
							Добавить телефон
						</InternalLink>
					</Section>
					{userInfo.email &&
						(<Section>
							<span>{userInfo.email}</span>
						</Section>)
					}
					<div className="form__section" style={{ padding: 0 }}>
						<div className="form__content">
							<ul className="social social--mobile">
								<li className="social__item social__item--vk">
									<a className="social__link">Вконтакте</a>
									<CheckBoxSwitch checkID="social-vk" isMobile />
								</li>
								<li className="social__item social__item--ok">
									<a className="social__link">Одноклассники</a>
									<CheckBoxSwitch checkID="social-ok" isMobile />
								</li>
								<li className="social__item social__item--inst">
									<a className="social__link">Instagram</a>
									<CheckBoxSwitch checkID="social-inst" isMobile />
								</li>
								<li className="social__item social__item--fb">
									<a className="social__link">Facebook</a>
									<CheckBoxSwitch checkID="social-fb" isMobile />
								</li>
							</ul>
						</div>
					</div>
					<div className="user-info__section">
						Устройства
					</div >
					<div className="user-info__section">
						<button
							type="button"
							className="nav-button"
							style={{ flexFlow: "row nowrap" }}
							onClick={() => { switchPasswordPage(true) }}
						>
							<span className="nav-button__text">
								Смена пароля
							</span>
							<span className="nav-button__arrow">
								<svg
									width="11"
									height="17"
									viewBox="0 0 11 17"
									fill="none"
									xmlns="http://www.w3.org/2000/svg"
								>
									<path
										d="M1.954 15.883L9.14214 8.92896L1.954 1.97495"
										stroke="#C7C7C7"
										strokeWidth="2"
										strokeLinecap="round"
										strokeLinejoin="round"
									/>
								</svg>
							</span>
						</button>
					</div>
					<div className="user-info__section">
						Удалить аккаунт
					</div>
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
			<Modal {...modal} />
			<MobileModal dialog={passwordDialog || false} title='Cмена пароля' close={() => setPasswordDialog(false)}>
				<div className="mobilePasswordContainer">
					<div className="privateDataPass">
						<div className="pDPassInputWrapper">
							<input
								placeholder="Введите новый пароль"
								type={inputFirstEye ? "password" : "text"}
								value={passwordOne}
							// onChange={(e) => changePasswordInput(e)} 
							/>
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
							<input
								placeholder="Повторите пароль еще раз"
								type={inputSecondEye ? "password" : "text"}
								value={passwordTwo}
							// onChange={(e) => confirmPassword(e)} 
							/>
							<a
								className="pDPassInvis"
								onClick={() => {
									setInputSecondEye(!inputSecondEye);
								}}
							/>
						</div>
						{passwordCoincidence == null
							? null
							: passwordCoincidence == "noValid"
								? (<p className="error small">Условия не выполнены</p>)
								: passwordCoincidence == "send"
									? (<p className="success small">Пароли совпадают</p>)
									: <p className="error small">Пароли не совпадают</p>}
						{passwordCoincidence == "send" ? (
							<Button
								className="sendButton"
								type="button"
							// onClick={(e) => passwordSubmit(e)}
							>
								Изменить пароль
							</Button>
						) : null}
					</div>
				</div>
			</MobileModal>
			<DialogUI
				title="Местоположение"
				open={isAddressPageOpen}
				onClose={switchAddressPage}
			>
				<UserAddressTab />
			</DialogUI>
			<DialogUI
				title="Смена пароля"
				open={isPasswordPageOpen}
				onClose={switchPasswordPage}
			>
				<PasswordFormMobile />
			</DialogUI>
		</div>
	);
}

/*
	<p className="pDPassWarning">Минимум 8 символов</p>
	<p className="pDPassWarning">Только латинские символы</p>
	<p className="pDPassError">Как минимум одна цифра</p>
	<p className="pDPassError">Строчные и заглавные буквы</p>
*/