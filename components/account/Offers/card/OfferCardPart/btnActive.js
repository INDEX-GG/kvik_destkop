import React from "react";
import Edit from "#UI/icons/Edit";
import CustomButtonUI from "src/UI/UIcomponent/CustomButtonUI/CustomButtonUI";
const BtnActive = (props) => {
  return (
    <div>
      {props.isActive && (
        <div>
          <div
            className={`${props.classes.edit} ${props.classes.mobile__width}`}
          >
            <Edit />
            <CustomButtonUI
              disableRipple={true}
              type="submit"
              customRoot={`${props.classes.btn__edit}`}
              onClick={() => props.Router.push(`/editPage/${props.offerID}`)}
            >
              Редактировать
            </CustomButtonUI>
          </div>
          <CustomButtonUI
            disableRipple={true}
            id="003"
            value={props.offer.id}
            onClick={(e) => props.pushCheck(e, "003", props.offer.id)}
            customRoot={props.classes.btn__unpublish}
          >
            Снять с публикации
          </CustomButtonUI>
        </div>
      )}
    </div>
  );
};
export default React.memo(BtnActive);
