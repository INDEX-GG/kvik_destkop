import { useForm } from "react-hook-form";
import clsx from "clsx";
import { AddressSuggestions } from "react-dadata";
import { phoneNumber } from "#lib/services";
import { useStore } from "#lib/Context/Store";
import { useAuth } from "#lib/Context/AuthCTX";
// import Search from '#UI/icons/Search';
import { CheckBoxSwitch } from "#components/inputs/CheckBoxSwitch";
import { changePersonalData } from "#lib/account/changePersonalData";
import { useState } from "react";
import { PasswordForm } from "./Forms";

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

/**
 * @param {object} props
 * @param {string} props.className
 */
const SocialForm = ({ className }) => {
	const blockClass = clsx("form", className);

	return (
		<form className={blockClass}>
			<div className="form__section form__section--social">
				<div className="form__content">
					<ul className="social social--desktop">
						<li className="social__item social__item--inst">
							<a className="social__link">Instagram</a>
							<CheckBoxSwitch
								checkID="social-inst"
								width="45px"
								height="23px"
								checkboxSize="19px"
								borderRadius="4px"
								checkboxBorderRadius="4px"
							/>
						</li>
						<li className="social__item social__item--vk">
							<a className="social__link">Вконтакте</a>
							<CheckBoxSwitch 
								checkID="social-vk"  
								width="45px"
								height="23px"
								checkboxSize="19px"
								borderRadius="4px" 
								checkboxBorderRadius="4px"
							/>
						</li>
						<li className="social__item social__item--ok">
							<a className="social__link">Одноклассники</a>
							<CheckBoxSwitch 
								checkID="social-ok"  
								width="45px"
								height="23px"
								checkboxSize="19px"
								borderRadius="4px" 
								checkboxBorderRadius="4px"
							/>
						</li>
						
						<li className="social__item social__item--fb">
							<a className="social__link">Facebook</a>
							<CheckBoxSwitch 
								checkID="social-fb"  
								width="45px"
								height="23px"
								checkboxSize="19px"
								borderRadius="4px" 
								checkboxBorderRadius="4px"
							/>
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
					style={{ fontSize: "18px" }}
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
						<SocialForm className="user-info--social" />
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