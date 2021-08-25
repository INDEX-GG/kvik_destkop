import React from "react";

function Placeholder({user}) {
  return (
    <div className="clientPage__container_bottom">
      <div className="clientPage__container_content">
        <div className="phOffers">
          {user ? user == 1 ? 
		  <div className="phTitle dark">У этого пользователя ещё нет объявлений</div> : 
		  <div className="phTitle dark">У этого пользователя нет завершенных объявлений</div> :
		  <div className="phTitle dark">У этого пользователя ещё нет объявлений</div>}
          <div className="phContent">
            <div className="phCard">
              <div className="phCardPhoto"></div>
              <div className="phCardTitle"></div>
              <div className="phCardSubtitle"></div>
            </div>
            <div className="phCard">
              <div className="phCardPhoto"></div>
              <div className="phCardTitle"></div>
              <div className="phCardSubtitle"></div>
            </div>
            <div className="phCard">
              <div className="phCardPhoto"></div>
              <div className="phCardTitle"></div>
              <div className="phCardSubtitle"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Placeholder;
