import React from "react";
import { ellipsis } from "../../../../lib/services";

function Searches(data) {
	if (data.searches.lenght == 0) {
		return (
			<div className="clientPage__container_bottom">
				<div className="clientPage__container_content">
					<div className="notInfContainer">
						<div className="notInf__title">Сохраните поиск для того, чтобы получать уведомления и сохранить параметры ваших запросов </div>
						<p className="notInf__subtitle">Поставьте галочку (отметку) напротив &quot;сохранить поиск&quot;, чтобы получать уведомления и сохранить параметры ваших запросов(поиска)</p>
						<img className="notInf__img" src="/accountImage/SearchNone.png"></img>
					</div>
				</div>
			</div>
		);
	}

	return (
		<div className="clientPage__container_bottom">
			<div className="clientPage__container_nav__radio">
				<label className="checkbox">
					<input type="checkbox" />
					<div className="checkbox__text"></div>
				</label>
				<a>Удалить</a>
				<a className="clientPage__container_nav__radio_end">Получать на почту:</a>
			</div>
			<div className="clientPage__container_content">
				<div className="searchesWrapper">
					{data.searches.map((search) => {
						return (
							<div key={search.id} className="searchersContainer">
								<div className="searchLeftCheck">
									<label className="checkbox">
										<input type="checkbox" />
										<div className="checkbox__text"></div>
									</label>
								</div>
								<a className="searchTitle large thin highlight underline">{ellipsis(search.title, 83)}</a>
								<div className="searchData thin">{search.data}</div>
								<div className="searchLocal thin light">{search.locality}</div>
								<div className="searchRightCheck">
									<label className="checkbox">
										<input type="checkbox" />
										<div className="checkbox__text"></div>
									</label>
								</div>
							</div>
						);
					})}
				</div>
			</div>
		</div>
	);
}

export default Searches;