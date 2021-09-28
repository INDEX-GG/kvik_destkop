import React, { useState } from "react";
import EmptyPlaceholder from "../../../EmptyPlaceholder";
import SearchListCard from "../card/SearchListCard";

function Searches(data) {
	if (data.searches.lenght == 0) {
		return (
			<EmptyPlaceholder 
			title='Сохраните поиск для того, чтобы получать уведомления и сохранить параметры ваших запросов'
			subtitle='Поставьте галочку (отметку) напротив &quot;сохранить поиск&quot;, чтобы получать уведомления и сохранить параметры ваших запросов(поиска)'
			img='/accountImage/SearchNone.png'
			alt='search_placeholder' />
		);
	}

	const [check, setCheck] = useState(false);
	const [dataCardId, setCardId] = useState([])

	function getCardId ({id, isCheck}) {
			setCardId( isCheck ? prev => [...prev, id] : prev => prev.filter( item => item !== id) )
	}

	return (
		<div className="clientPage__container_bottom">
			<div className="clientPage__container_nav__radio">
				<label className="checkbox">
					<input 
						type="checkbox"
						onChange={(event) => {setCheck(event.target.checked); event.target.checked ? null : setCardId([])}}
						checked={check}
					/>
					<div className="checkbox__text"></div>
				</label>
				<a className="small light underline" style={dataCardId.length > 0 ? {color: "black"} : null} onClick={() => {
						if (dataCardId.length > 0){
							///
						}
				}}>Удалить</a>
				<a className="clientPage__container_nav__radio_end">Получать на почту:</a>
			</div>
			<div className="clientPage__container_content">
				<div className="searchesWrapper">
					{data.searches.map((search) => {
						return (
							<SearchListCard 
							key={search.id} 
							data={search}
							parentCheck={check}
							getCardId={getCardId}
							dataCardId={dataCardId}
							/>
						);
					})}
				</div>
			</div>
		</div>
	);
}

export default Searches;
