import React from "react";
import CustomLinkUI from "src/UI/UIcomponent/CustomLinkUI/CustomLinkUI";
import { ellipsis } from "../../../../lib/services";

function SearchListCard({ data, parentCheck, getCardId, dataCardId }) {
  const [check, setCheck] = React.useState(false);

  React.useEffect(() => {
    parentCheck
      ? check
        ? null
        : (setCheck(parentCheck),
          getCardId({ id: data.id, isCheck: parentCheck }))
      : check === false
      ? null
      : dataCardId.length == 0
      ? (setCheck(parentCheck),
        getCardId({ id: data.id, isCheck: parentCheck }))
      : null;
  }, [parentCheck]);

  return (
    <div className="searchersContainer">
      <div className="searchLeftCheck">
        <label className="checkbox">
          <input
            type="checkbox"
            onChange={(event) => {
              setCheck(event.target.checked);
              getCardId({ id: data.id, isCheck: event.target.checked });
            }}
            checked={check}
          />
          <div className="checkbox__text" />
        </label>
      </div>

      <CustomLinkUI customRoot={"searchTitle large thin highlight underline"}>
        {ellipsis(data.title, 83)}
      </CustomLinkUI>
      <div className="searchData thin">{data.data}</div>
      <div className="searchLocal thin light">{data.locality}</div>
      <div className="searchRightCheck">
        <label className="checkbox">
          <input type="checkbox" />
          <div className="checkbox__text" />
        </label>
      </div>
    </div>
  );
}
export default SearchListCard;
