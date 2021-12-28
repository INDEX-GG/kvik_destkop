import { useForm } from "react-hook-form";
import { validatePassword } from "#lib/account/validatePassword";
import { useAuth } from "#lib/Context/AuthCTX";
import { updatePassword } from "#lib/fetch";
import { makeStyles } from "@material-ui/core";

const PasswordValidationBox = () => {
	const classes = makeStyles({
		block: {}
	})();

	return (
		<p className={classes.block}>
			Придумайте пароль от 8 знаков из цифр и латинских букв
		</p>
	)
}

export const PasswordForm = () => {
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
					<PasswordValidationBox />
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

export const PasswordFormMobile = () => {
	const classes = makeStyles({
		form: {
			padding: "1em",
			gap: "1em",
		},
		section: {
			width: "100%"
		},
		input: {
			
		}
	})();
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
			className={classes.form}
			onSubmit={handleSubmit(handlerPasswordChange)}
		>
			<div className={`form__section form__section--password ${classes.section}`}>
				<div className="form__content">
					<input
						{...register("old_password")}
						type="password"
						id="user-current-pass"
						className="form__input"
						autoComplete="current-password"
						placeholder="Текущий пароль"
					/>
					<button className="form__button" onClick={handlerPasswordVisiblity}></button>
				</div>
			</div>

			<div className={`form__section form__section--password" ${classes.section}`}>
				<div className="form__content">
					<input
						{...register("password")}
						type="password"
						id="user-new-pass"
						className="form__input"
						autoComplete="new-password"
						placeholder="Новый пароль"
					/>
					<button className="form__button" onClick={handlerPasswordVisiblity}></button>
				</div>
			</div>
			<div className="form__section form__section">
				<PasswordValidationBox />
			</div>
		</form >
	)
}