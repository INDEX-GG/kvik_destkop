import React from 'react';


const MobileModal = ({title, subtitle = false, close, children}) => {
	const {matchesMObi} = 
	return (
		<div className="modal__wrapper_md accountContainer">
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
			{children}
		</div>
	)
}

export default MobileModal;