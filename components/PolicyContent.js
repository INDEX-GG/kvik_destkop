import { Collapse } from '@material-ui/core';
import React, { useState } from 'react';


export default function PolicyContent({policy, id}) {

	const [open, setOpen] = useState(false);

	const {title, subtitle, rules} = policy

	return (
		<div className='offerPage__item'>
			<h3 onClick={() => setOpen(!open)} className={`offerPage__title ${open ? 'offerPage__title--active' : ''}`}>{title}</h3>
			<Collapse in={open}>
			<div className='offerPage__item-content'>
				<div className='offerPage__paragraph'>
					{subtitle.length > 1 ? 
						subtitle.map((item, index) => {
							return <p key={index} className='offerPage__subtitle'>{item}</p>	
						})
					: <p className={`offerPage__subtitle ${id == 2 ? 'offerPage__bigSubtitle' : null}`}>{subtitle[0]}</p>}
					{rules.map((item, index) => {
						return (
							<div key={index} className='offerPage__rules'>
								<h4 className='offerPage__rules-title'>{index + 1}. {item.title}</h4>
								{item.rules.map((item2, index2) => {
									console.log(item2.rules2[0])
									return (
										<div key={index2}>
											 {item2.rules1.map((item3, index3) => {
												 return (
													<div key={index3}>
														<p className='offerPage__subtitle'>{ index3 == 0 ? `${index + 1}.${index2 + 1}.` : null} {item3}</p>
													</div>
												 )
								 			})}
											{item2.rules2.map((item3, index3) => {

												let beforeNumber = `${index + 1}.${index2 + 1}.${index3 + 1}.`;

												if (id == 1 && index + 1 == 6 && index2 + 1 == 2 && index3 + 1 > 4) beforeNumber = '';

												if (id == 1 && index + 1 == 6 && index2 + 1 == 3 && index3 + 1 > 2) beforeNumber = '';

												if (id == 2 && index + 1 == 2 && index2 + 1 == 6 && index3 + 1 > 3 && index3 + 1 < 9) beforeNumber = '';
												
												if (id == 2 && index + 1 == 2 && index2 + 1 == 6 && index3 + 1 > 3 && index3 + 1 >= 9) beforeNumber = `${index + 1}.${index2 + 1}.${index3 + 1 - 5}.`;
												
												if (id == 2 && index + 1 == 2 && index2 + 1 == 6 && index3 + 1 > 3 && index3 + 1 - 5 > 16) beforeNumber = ``;

												if (id == 2 && index + 1 == 2 && index2 + 1 == 6 && index3 + 1 > 3 && index3 + 1 - 5 == 29) beforeNumber = `${index + 1}.${index2 + 1}.${index3 + 1 - 17}.`;

												if (id == 2 && index + 1 == 2 && index2 + 1 == 6 && index3 + 1 > 3 && index3 + 1 - 5 == 33) beforeNumber = `${index + 1}.${index2 + 1}.${index3 + 1 - 20}.`;
												

												return (
													<div key={index3} className='offerPage__subtitle'>{beforeNumber} {item3}</div>
												)
											})} 
										</div>
									)
								})}
							</div>
						)
					})}
					<p className='offerPage__redact'><strong>Редакция от 25.09.2020</strong></p>
				</div>
			</div>
			</Collapse>
		</div>
	)
}