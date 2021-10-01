import FilterCheckboxDefault from "./FilterCheckboxDefault"
import FilterRadio from "./FilterRadio"
import FilterTwoFields from "./FilterTwoFields"



const DefaultFilter = () => {
  return (
    <>
      <FilterTwoFields data={{firstAlias:"fromPrice", secondAlias:'toPrice', title:"Цена, ₽"}} />
      <FilterCheckboxDefault title='Условия' checkboxesData={[{alias: 'safeDeal', value: 'Безопасная сделка'}, {alias: 'delivery', value: 'Доставка'}]} />
      <FilterRadio data={{title:"Срок размещения", alias:'period', fields:['За все время','За последнюю неделю','За последние сутки'] }}  />
    </>
  )
}

export default DefaultFilter
