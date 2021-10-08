import Comments from "./Comments";
import Subscribes from "./Subscribes";
import StarRating from "./StarRating";
import Chat from "./account/Notifications/tabs/Chat";
import { STATIC_URL } from "../lib/constants";
import { generateProductPhoto } from "./account/Notifications/tabs/chatFunctions";

/* Модальное окно "отзывы и рейтинг" */
export function ModalRating({ rate = 0, comments = 0, modal, mobile }) {
	return (
		<div className="modal__wrapper_md">
			<div className="modal__block__top accountTop">
				<>
					{mobile ? <div className="accountArrowLeft" onClick={() => modal()}></div> : null}
					<h6 className="modal__block__top_title accountTitle">Рейтинг и отзывы</h6>
				</>
				<div className="accountRatingBox">
					<div className="accountRaitingNumber">{rate ? rate + "." : null}0</div>
					<StarRating rating={rate} />
				</div>
			</div>
			{comments == 0 ? (
				<div className="modal__block__middle">
					<h6 className="modal__block__middle__title">У Вас еще нет отзывов</h6>
					<p className="modal__block__middle_rating_description">
						Здесь будут отображаться отзывы,
						<br />и на их основе составляться ваш рейтинг
					</p>
				</div>
			) : (
				<div className="comment__block">
					<Comments />
					<Comments />
					<Comments />
				</div>
			)}
		</div>
	);
}

/* Модальное окно "Подписчики" */
export function ModalSubscribers({ data, modal, mobile }) {
	return (
		<div className="modal__wrapper_md acoountContainer">
			<div className="modal__block__top accountTop">
				<>
					{mobile ? <div className="accountArrowLeft" onClick={() => modal()}></div> : null}
					<h6 className="modal__block__top_title accountTitle">{data?.message ? 0 : data.length} подписчиков</h6>
				</>
			</div>
			{data?.message ? (
				<div className="modal__block__middle_wrepper">
					<div className="modal__block__middle">
						<h6 className="modal__block__middle__title">У Вас еще нет подписчиков</h6>
						<p className="modal__block__middle_rating_description">Здесь будет отображаться список подписанных на вас пользователей</p>
					</div>
				</div>
			) : (
				data.map((item, index) => {
					return (
						<div key={index}>
							<Subscribes data={item} />
						</div>
					)
				})
			)}
		</div>
	);
}

/* Модальное окно "Подписка" */
export function ModalSubscription({ data, subscription = 0, modal, mobile }) {
	return (
		<div className="modal__wrapper_md acoountContainer">
			<div className="modal__block__top accountTop">
				<>
					{mobile ? <div className="accountArrowLeft" onClick={() => modal()}></div> : null}
					<h6 className="modal__block__top_title accountTitle">{subscription} подписок</h6>
				</>
			</div>
			{subscription == 0 ? (
				<div className="modal__block__middle">
					<h6 className="modal__block__middle__title">У Вас еще нет подписок</h6>
					<p className="modal__block__middle_rating_description">Здесь будет отображаться список пользователей на которых вы подпишетесь</p>
				</div>
			) : (
				data.map((item, index) => {
					return (
						<div key={index}>
							<Subscribes data={item} />
						</div>
					)
				})
			)}
		</div>
	);
}
/* Модальное окно "Диалог" */
export function ModalMessage({ modal, usersData, room, userChatPhoto }) {
	return (
		<div className="modal__wrapper_md acoountContainer">
			<div className="modal__block__top accountTop">
				<>
					<div className="accountArrowLeft" onClick={() => modal()}></div>
					<h6 className="modal__block__top_title accountTitle">Диалоги</h6>
				</>
			</div>

			<div className="messageMobile" style={{height: window.innerHeight - 98 - 68 + 'px' }}>
				<div className="messageHeader small">
					<img src={`${STATIC_URL}/${generateProductPhoto(room?.product_photo)}`} />
					<div>
						<div>
							<div>
								<div>{room?.seller_name}</div>
								<div className="light">00.00.00 00:00</div>
							</div>
							<img src={room?.seller_photo ? `${STATIC_URL}/${room?.seller_photo}` : null} />
						</div>
						<div>{room?.product_price}</div>
						<div>{room?.product_name}</div>
					</div>
				</div>
				<Chat usersData={usersData} userChatPhoto={userChatPhoto}/>
			</div>
		</div>
	)
}

// /* Модальное окно "Выход" */
// вынесен в отдельный компонент на mui
// export function modalLogout() {
// 	return (
// 		<div className="modal__wrapper">
// 			<h6 className="modal__block_title accountLogout">Вы уверены что хотите выйти?</h6>
// 			<div className="modal__block_btn ">
// 				<a className="btn-blue accountLogoutButtonYes" href="">
// 					ОТМЕНА
// 				</a>
// 				<a className="btn-red accountLogoutButtonNo" href="">
// 					ВЫЙТИ
// 				</a>
// 			</div>
// 		</div>
// 	);
// }

/* Модальное окно "Удалить аккаунт" */
export function modalDeleteAccount() {
	return (
		<div className="modal__wrapper">
			<h6 className="modal__block_title">
				Вы уверены удалить аккаунт? <br />
				Аккаунт будет удален навсегда
			</h6>

			<div className="modal__block_btn ">
				<a className="btn-blue" href="">
					ОТМЕНА
				</a>
				<a className="btn-red" href="">
					УДАЛИТЬ
				</a>
			</div>
		</div>
	);
}

/* Модальное окно "Удалить историю" */
export function modalDeletHistory() {
	return (
		<div className="modal__wrapper">
			<h6 className="modal__block_title">Вы уверены что хотите выйти?</h6>

			<div className="modal__block_btn ">
				<a className="btn-blue" href="">
					ОТМЕНА
				</a>
				<a className="btn-red" href="">
					ОЧИСТИТЬ
				</a>
			</div>
		</div>
	);
}

/* Модальное окно админа"Отклонение" */

