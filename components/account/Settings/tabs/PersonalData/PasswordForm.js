import { SubmitButton } from "#components/buttons/SubmitButton"
import { Form } from "#components/forms/Form"
import { FormSection } from "#components/forms/FormSection"
import { Label } from "#components/forms/Label"
import { PasswordInput } from "#components/inputs/PasswordInput"
import { useForm } from "react-hook-form"

/**
 * @typedef Helper
 * @property 
 * @typedef {import("#components/forms/Form").FormProps} PasswordFormProps
 */

/**
 * @param {PasswordFormProps} props 
 */
export const PasswordForm = ({ onSubmit, ...formProps }) => {
	const { handleSubmit } = useForm()

	const handlerPasswordChange = async (data) => {
		onSubmit(data)
	}

	return (
		<Form 
			className="user-info__form user-info__form--password" 
			{...formProps} 
			onSubmit={handleSubmit(handlerPasswordChange)}
		>
			<h2 className="user-info__heading">Смена пароля</h2>
			<FormSection className="user-info__content">
				<FormSection className="user-info__section">
					<Label className="user-info__label" htmlFor="user-current-pass">Текущий пароль</Label>
					<PasswordInput
						id="user-current-pass"
						name="old_password"
						autocomplete="current-password"
					/>
				</FormSection>

				<FormSection className="user-info__section">
					<Label className="user-info__label" htmlFor="user-new-pass">Новый пароль</Label>
					<PasswordInput
						id="user-new-pass"
						name="password"
						autocomplete="new-password"
					/>
				</FormSection>

				<FormSection className="user-info__section">
					<div className="user-info__label"></div>
					<SubmitButton>Изменить</SubmitButton>
				</FormSection>
			</FormSection>
		</Form >
	)
}