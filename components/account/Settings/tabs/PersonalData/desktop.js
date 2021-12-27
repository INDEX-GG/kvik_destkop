import { useForm } from "react-hook-form";
import clsx from "clsx";
import { AddressSuggestions } from "react-dadata";
import { phoneNumber } from "#lib/services";
import { useStore } from "#lib/Context/Store";
import { useAuth } from "#lib/Context/AuthCTX";
// import Search from '#UI/icons/Search';
import { CheckBoxSwitch } from "#components/inputs/CheckBoxSwitch";
import { changePersonalData } from "#lib/account/changePersonalData";
import { validatePassword } from "#lib/account/validatePassword";
import { useState } from "react";
import { updatePassword } from "#lib/fetch";


/**
 * TODO: переписать на бесконтрольный вариант.
 * @param {object} props
 * @param {import("#lib/fetch").UserInfo} props.userInfo
 */
const PersonalForm = ({ userInfo }) => {
	const { id: userID, token } = useAuth();
	const { handleSubmit, register } = useForm();
	const [userAddress, changeUserAddress] = useState(userInfo.address || userInfo?.location?.name);

	/**
	 * @param {{ name: string, address: string }} formData 
	 */
	const handlerUserDataChange = async (formData) => {
		try {
			const resData = await changePersonalData({
				userID,
				userName: formData.name,
				userAddress: userAddress,
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

	/**
	 * @param {import("react-dadata").DaDataSuggestion<import("react-dadata").DaDataAddress>} suggestion 
	 */
	const handlerLocationSuggestion = (suggestion) => {
		changeUserAddress(suggestion.value)
	}

	return (
		<form className="form " onSubmit={handleSubmit(handlerUserDataChange)}>
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

			<div className="form__section user-info__section--location">
				<label className="form__label user-info__label" htmlFor="user-address">Адрес</label>
				<div className="form__content user-info__location">
					<input 
						className="form__input" 
						type="hidden"
						value={userAddress} 
					/>
					<AddressSuggestions
						containerClassName="user-info__suggest"
						token="3fa959dcd662d65fdc2ef38f43c2b699a3485222"
						filterFromBound='city-region'
						filterToBound='settlement'
						defaultQuery={userAddress}
						count={5}
						minChars={2}
						delay={5}
						onChange={handlerLocationSuggestion}
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

	/**
	 * @param {React.MouseEvent<HTMLButtonElement, MouseEvent>} event 
	 */
	const handlerPasswordVisiblity = (event) => {
		/**
		 * @type {HTMLButtonElement}
		 */
		const button = event.target;
		const content = button.closest(".form__content");
		/** 
		 * @type {HTMLInputElement}
		 */
		const input = button.previousElementSibling;

		if (content.classList.contains("form__content--visible")) {
			content.classList.remove("form__content--visible");
			input.type = "password"
		} else {
			content.classList.add("form__content--visible");
			input.type = "text"
		}
	}

	return (
		<form
			id="user-password-change"
			className="form"
			onSubmit={handleSubmit(handlerPasswordChange)}
		>
			<div className="form__section form__section--password">
				<label className="form__label" htmlFor="user-current-pass">Текущий пароль</label>
				<div className="form__content">
					<input
						{...register("old_password")}
						type="password"
						id="user-current-pass"
						className="form__input user-info__password"
						autoComplete="current-password"
					/>
					<button className="form__button" onClick={handlerPasswordVisiblity}></button>
				</div>
			</div>

			<div className="form__section form__section--password">
				<label className="form__label" htmlFor="user-new-pass">Новый пароль</label>
				<div className="form__content">
					<input
						{...register("password")}
						type="password"
						id="user-new-pass"
						className="form__input user-info__password"
						autoComplete="new-password"
					/>
					<button className="form__button" onClick={handlerPasswordVisiblity}></button>
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
				<span className="user-info__notice">Все данные, включая объявления, будут стерты</span>
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
	const { userInfo } = useStore();

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
				</div>
			</div>
		</div>
	);
}

/*
	<p className="pDPassWarning">Минимум 8 символов</p>
	<p className="pDPassWarning">Только латинские символы</p>
	<p className="pDPassError">Как минимум одна цифра</p>
	<p className="pDPassError">Строчные и заглавные буквы</p>
*/