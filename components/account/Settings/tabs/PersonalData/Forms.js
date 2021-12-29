import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import clsx from "clsx";
import { validatePassword } from "#lib/account/validatePassword";
import { useAuth } from "#lib/Context/AuthCTX";
import { updatePassword } from "#lib/fetch";
import { makeStyles } from "@material-ui/core";

/**
 * @typedef PasswordValidationResults
 * @property {boolean} [length]
 * @property {boolean} [number]
 * @property {boolean} [letter]
 */

/**
 * @param {object} props 
 * @param {string} props.className
 * @param {PasswordValidationResults} props.results
 */
const PasswordValidationBox = ({ results = undefined, className, ...paragraphProps }) => {
	const classes = makeStyles({
		block: {
			position: "absolute",
			top: "50%",
			left: "250px",
			width: "257px",
			fontSize: "16px",
			background: "#FFFFFF",
			borderRadius: "7px",
			boxShadow: "0px 0px 25px rgba(0, 0, 0, 0.15)",
			padding: "0.5em",
			transform: "translateY(-50%)"
		},
		constraint: {
			color: "#8f8f8f",
			transitionDuration: "250ms",
			transitionProperty: "color"
		},
		valid: {
			color: "#008000"
		},
		invalid: {
			color: "#ff0000"
		}
	})();
	const [validationResults, changeValidationResults] = useState(results);
	const blockClass = clsx(classes.block, className);
	const lengthClass = clsx(classes.constraint, validationResults?.length ? classes.valid : classes.invalid);
	const numberClass = clsx(classes.constraint, validationResults?.number ? classes.valid : classes.invalid);
	const letterClass = clsx(classes.constraint, validationResults?.letter ? classes.valid : classes.invalid);

	useEffect(() => {
		changeValidationResults((oldResults) => {
			return {
				...oldResults, 
				...results 
			}
		});
	}, [results])

	return (
		<p className={blockClass} {...paragraphProps}>
			Придумайте пароль от <span className={lengthClass}>8 знаков</span> из <span className={numberClass}>цифр</span> и <span className={letterClass}>латинских букв</span> 
		</p>
	)
}

export const PasswordForm = () => {
	const { token } = useAuth();
	const { register, handleSubmit } = useForm();
	
	/**
	 * @type { [import("./Forms").PasswordValidationResults, Dispatch < SetStateAction < import("./Forms").PasswordValidationResults>>] }
	 */
	const [validationResults, changeValidationResults] = useState(undefined);

	/**
	 * @param {{ old_password: string, password: string }} formData 
	 */
	const handlerPasswordChange = async (formData) => {
		const [isValidPassword, results] = validatePassword(formData.old_password, formData.password);
		changeValidationResults({ ...validationResults, ...results });

		if (!isValidPassword) {
			return;
		}

		try {
			await updatePassword(formData.password, token);
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

	/**
	 * @param {import("react").ChangeEvent<HTMLInputElement>} event 
	 */
	const handlerOnChangeValidator = (event) => {
		// eslint-disable-next-line no-unused-vars
		const [isValid, result] = validatePassword("", event.target.value);
		changeValidationResults(result);
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
						onChange={handlerOnChangeValidator}
					/>
					<button className="form__button" onClick={handlerPasswordVisiblity}></button>
					<PasswordValidationBox results={validationResults}/>
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
			display: "grid",
			gap: "1em",
			padding: "1em",
		},
		section: {
			width: "100%"
		},
		eye: {
			left: "reset",
			right: "1em"
		},
		validContainer: {
			width: "100%",
		},
	})();
	const { token } = useAuth();
	const { register, handleSubmit } = useForm();
	const [validationResults, changeValidationResults] = useState(undefined);

	/**
	 * @param {{ old_password: string, password: string }} formData 
	 */
	const handlerPasswordChange = async (formData) => {
		console.log(formData);
		const [isValidPassword, validResults] = validatePassword(formData.old_password, formData.password);
		changeValidationResults(() => validResults)

		console.log(validResults);

		if (!isValidPassword) {
			return;
		}

		try {
			await updatePassword(formData.password, token);
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

	/**
   * @param {import("react").ChangeEvent<HTMLInputElement>} event 
   */
	const handlerOnChangeValidator = (event) => {
		// eslint-disable-next-line no-unused-vars
		const [isValid, result] = validatePassword("", event.target.value);
		changeValidationResults(result);
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
					<button className={`form__button ${classes.eye}`} onClick={handlerPasswordVisiblity}></button>
				</div>
			</div>

			<div className={`form__section form__section--password ${classes.section}`}>
				<div className="form__content">
					<input
						{...register("password")}
						type="password"
						id="user-new-pass"
						className="form__input"
						autoComplete="new-password"
						placeholder="Новый пароль"
						onChange={handlerOnChangeValidator}
					/>
					<button className={`form__button ${classes.eye}`} onClick={handlerPasswordVisiblity}></button>
				</div>
			</div>
			<div className={`form__section ${classes.validContainer}`}>
				<PasswordValidationBox 
					results={validationResults} 
					className={classes.validBox} 
					style={{ 
						position: "static", 
						transform: "none", 
						boxShadow: "none", 
						width: "100%",
						padding: "0",
					}} 
				/>
			</div>
		</form >
	)
}