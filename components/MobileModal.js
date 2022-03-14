import { Dialog } from '@material-ui/core';
import React from 'react';
import { useMedia } from '../hooks/useMedia';

const MobileModal = ({title, subtitle = false, dialog = false, close, children}) => {
	const {matchesMobile, matchesTablet} = useMedia();
	const MobileDevice = matchesMobile || matchesTablet;
	return (
		MobileDevice ?
		<Dialog open={dialog || false} fullScreen={true}>
			<div className="modal__wrapper_md">
			<div className="modal__block__top mobileModalTop">
				<>
					<div className='modalModalTitleBox'>
                        {MobileDevice ? <div className="mobileModalArrow" onClick={() => close()}/> : null}
                        <h6 className="modal__block__top_title mobileModalTitle">{title}</h6>
						{subtitle && <div className='mobileModalSubtitle'>{subtitle}</div>}
                    </div>
				</>
				{children}
			</div>
		</div>
		</Dialog> : null
	)
}

export default MobileModal;
