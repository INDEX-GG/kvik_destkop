import React from 'react';

const EmptyPlaceholder = ({title, subtitle, img, imgAlt, customClass = ''}) => {
	return (
		<div className="clientPage__container_bottom">
			<div className="clientPage__container_content">
				<div className="notInfContainer">
					{title && <div className="notInf__title">{title}</div>}
					{subtitle && <p className="notInf__subtitle">{subtitle}</p>}
					{img && <img className={`notInf__img-${customClass}`} src={img} alt={imgAlt}/>}
				</div>
			</div>
		</div>
	)
}

export default EmptyPlaceholder;