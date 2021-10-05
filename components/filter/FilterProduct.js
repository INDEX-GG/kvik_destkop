import FilterCheckbox from "./FilterCheckbox";
import FilterCheckboxDefault from "./FilterCheckboxDefault";
import FilterRadio from "./FilterRadio";
import FilterSelect from "./FilterSelect";
import FilterTwoFields from "./FilterTwoFields";
import FilterTwoFieldsRadio from "./FilterTwoFieldsRadio";
import FilterTwoFieldsTwoRadio from "./FilterTwoFieldsTwoRadio";

const FilterProduct = ({ data }) => {
  return (
    <>
      { data?.[0]?.type !== "price" ? <FilterTwoFields data={{firstAlias:"fromPrice", secondAlias:'toPrice', title:"Цена, ₽"}} /> : null }
      {data?.map((item, i) => {
        switch (item.type) {
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
          case "radio":
            return <FilterRadio key={i} data={item} />
        }
      })}
      <FilterCheckboxDefault title='Условия' checkboxesData={[{alias: 'safeDeal', value: 'Безопасная сделка'}, {alias: 'delivery', value: 'Доставка'}]} />
      <FilterRadio data={{title:"Срок размещения", alias:'period', fields:['За все время','За последнюю неделю','За последние сутки'] }}  />
    </>
  );
};

export default FilterProduct;
