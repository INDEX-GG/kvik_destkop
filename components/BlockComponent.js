import clsx from "clsx";

/**
 * Декоратор для реактовских компонентов. 
 * Добавляет базовый класс в корневой элемент компонента.
 * @example
 * ```javascript
 * const BaseButton = blockComponent("base-button", ({ children, ...props }) => {
 * 	return (
 * 		<button {...props}>{children}</button>
 * 	)
 * });
 * 
 * const SubmitButton = blockComponent("submit-button", ({children, ...props}) => {
 * 	return (
 * 		<BaseButton {...props} type="submit">{children}</BaseButton>
 * 	)
 * });
 * 
 * <SubmitButton>Отправить</SubmitButton>
 * ```
 * @example
 * ```html
 * <button class="base-button submit-button" type="submit">Отправить</button>
 * ```
 * @param {string} baseClassName Базовый класс корневого элемента.
 * @param {(props) => JSX.Element} componentFunc Реактовский функциональный компонент.
 * @returns {(props) => JSX.Element} Реактовский функциональный компонент со смерженными классами.
 */
export const blockComponent = (baseClassName, componentFunc) => {
	return ({className, ...props}) => {
		const blockClass = clsx(baseClassName, className);
		return componentFunc({ className: blockClass, ...props})
	}
}