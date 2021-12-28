import { useForm } from "react-hook-form";
import { validatePassword } from "#lib/account/validatePassword";
import { useAuth } from "#lib/Context/AuthCTX";
import { updatePassword } from "#lib/fetch";
import { makeStyles } from "@material-ui/core";
import clsx from "clsx";
import { createRef, useEffect } from "react";

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
const PasswordValidationBox = ({ results, className }) => {
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
			padding: "1em",
			transform: "translateY(-50%)"
		},
		constraint: {
			color: "#8f8f8f"
		},
		valid: {
			color: "#adff2f"
		},
		invalid: {
			color: "#ff0000"
		},
		length: {},
		number: {},
		letter: {}
	})();
	const blockRef = createRef(undefined);
	const blockClass = clsx(classes.block, className);

	useEffect(() => {
		/**
		 * @type {HTMLParagraphElement}
		 */
		const block = blockRef.current;

		// пробегаемся по ключам `results`
		Object.keys(results).forEach((constraint) => {
			/**
			 * @type {HTMLSpanElement}
			 */
			const constraintEl = block.querySelector(classes[constraint]);

			if (constraint === undefined) {
				constraintEl.classList.remove(classes.valid, classes.invalid);
				return;
			}

			if (constraint === false) {
				constraintEl.classList.add(classes.invalid);
				constraintEl.classList.remove(classes.valid);
				return;
			}

			constraintEl.classList.remove(classes.invalid);
			constraintEl.classList.add(classes.valid);
		})
	}, [results])

	return (
		<p ref={blockRef} className={blockClass}>
			Придумайте пароль от <span className={clsx(classes.constraint, classes.length)}>8 знаков</span>{" "}
			из <span className={clsx(classes.constraint, classes.number)}>цифр</span>{" "}
			и <span className={clsx(classes.constraint, classes.letter)}>латинских букв</span> 
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
					<PasswordValidationBox results={{}}/>
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
					/>
					<button className={`form__button ${classes.eye}`} onClick={handlerPasswordVisiblity}></button>
				</div>
			</div>
			{/* <div className="form__section form__section">
				<PasswordValidationBox results={{}}/>
			</div> */}
		</form >
	)
}