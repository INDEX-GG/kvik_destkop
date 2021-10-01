import FilterCheckbox from "./FilterCheckbox";
import FilterRadio from "./FilterRadio";
import FilterSelect from "./FilterSelect";
import FilterTwoFields from "./FilterTwoFields";
import FilterTwoFieldsRadio from "./FilterTwoFieldsRadio";
import FilterTwoFieldsTwoRadio from "./FilterTwoFieldsTwoRadio";

const FilterVacancies = ({ data }) => {
  return (
    <>
      <FilterTwoFields data={{firstAlias:"fromPrice", secondAlias:'toPrice', title:"Заработная плата, ₽"}} /> 
      {data?.map((item, i) => {
        switch (item.type) {
          case "list":
            return <FilterSelect key={i} data={item} />
          case "twoText":
            return <FilterTwoFields key={i} data={item} />
          case "twoTextTwoRadio":
            return <FilterTwoFieldsTwoRadio key={i} data={item} />
          case "twoTextRadio":
            return <FilterTwoFieldsRadio key={i} data={item} />
          case "checkbox":
            return <FilterCheckbox key={i} data={item} />
          case "select":
            return <FilterSelect key={i} data={item} />
        }
      })}
      <FilterRadio data={{title:"Срок размещения", alias:'period', fields:['За все время','За последнюю неделю','За последние сутки'] }}  />
    </>
  );
};

export default FilterVacancies;
