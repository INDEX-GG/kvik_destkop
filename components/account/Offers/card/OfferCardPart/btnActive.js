import React from "react";
import Edit from "#UI/icons/Edit";

const BtnActive = (props) => {
  return (
    <div>
      {props.isActive && (
        <div>
          <div
            className={`${props.classes.edit} ${props.classes.mobile__width}`}
          >
            <Edit />
            <button
              type="submit"
              className={`${props.classes.btn__edit}`}
              onClick={() => props.Router.push(`/editPage/${props.offerID}`)}
            >
              Редактировать
            </button>
          </div>
          <button
            id="003"
            value={props.offer.id}
            onClick={(e) => props.pushCheck(e, "003", props.offer.id)}
            className={props.classes.btn__unpublish}
          >
            Снять с публикации
          </button>
        </div>
      )}
    </div>
  );
};
export default React.memo(BtnActive);
