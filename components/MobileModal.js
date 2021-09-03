/* 
import React from 'react';
import { useMedia } from '../hooks/useMedia';

const MobileModal = ({title, subtitle = false, close, children}) => {
	const {matchesMobile, matchesTablet} = useMedia();
	return (
		matchesMobile || matchesTablet ? 
		<div className="modal__wrapper_md">
			<div className="modal__block__top mobileModalTop">
				<>
					{matchesMobile || matchesTablet ? <div className="mobileModalBack" onClick={() => close()}></div> : null}
					<div className='modalModalTitleBox'>
                        <h6 className="modal__block__top_title mobileModalTitle">{title}</h6>
						{subtitle && <div className='mobileModalSubtitle'>{subtitle}</div>}
                    </div>
				</>
				{children}
			</div>
		</div> : null
	)
}
export default MobileModal; */