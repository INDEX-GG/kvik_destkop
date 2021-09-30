import { useFormContext } from "react-hook-form";
import FilterRadio from "./FilterRadio";
import FilterSelect from "./FilterSelect";
import FilterTwoFields from "./FilterTwoFields";
import FilterAutoYears from "./FilterAutoYears";
import years from './json/years.json'
import enginesize from './json/enginesize.json'
import FilterMultipleSelect from "./FilterMultipleSelect";
import FilterColor from "./FilterColor";



const FilterAuto = () => {
  const methods = useFormContext();



  return (
    <>
      <FilterTwoFields data={{firstAlias:"fromPrice", secondAlias:'toPrice', title:"Цена, ₽"}} /> 
      <FilterSelect data={{alias:"type", title:"Тип автомобиля", fields: ["Любой", "Новые", "С пробегом" ]}} />
      {methods.watch('type') !== 'Новые' && methods.watch('type') ? <FilterTwoFields unmount data={{firstAlias:"fromMileage", secondAlias:'toMileage', title:"Пробег, км"}} /> : null }
      <FilterMultipleSelect data={{alias:"bodytype", title:"Кузов", fields: ["Седан", "Хэтчбек 5 дв.","Хэтчбек 3 дв.","Лифтбек","Джип 5 дв.","Джип 3 дв.", "Универсал", "Минивэн", "Пикап", "Купе",  "Открытый" ]}} />
      <FilterAutoYears data={{firstAlias:"fromYear", secondAlias:'toYear', title:"Год выпуска", fields: years   }} />
      <FilterSelect data={{alias:"drivetype", title:"Привод", fields: ["4WD", "Передний", "Задний" ]}} />
      <FilterSelect data={{alias:"transmission", title:"Коробка передач", fields: ["Автомат", "Механика", "Вариатор", "Робот" ]}} />
      <FilterAutoYears data={{firstAlias:"fromEnginesize", secondAlias:'toEnginesize', title:"Объем двигателя, л.", fields: enginesize }} />
      <FilterRadio data={{title:"Руль", alias:'steeringWheel', radioData:[{value: 'Любой'},{value: 'Правый'},{value: 'Левый'}] }}  />
      <FilterTwoFields data={{firstAlias:"fromPower", secondAlias:'toPower', title:"Мощность, л.с."}} /> 
      <FilterColor alias='color' title='Цвет' />
      {methods.watch('type') !== 'Новые' && methods.watch('type') ? <FilterSelect unmount data={{alias:"condition", title:"Состояние", fields: ["Битый", "Не битый", "На гарантии"]}} /> : null }
      {methods.watch('type') !== 'С пробегом' && methods.watch('type') ? <FilterSelect unmount data={{alias:"status", title:"Статус", fields: ["В пути", "В наличии", "Под заказ"]}} /> : null }
      <FilterRadio data={{title:"Срок размещения", alias:'period', radioData:[{value: 'За все время'},{value: 'За последнюю неделю'},{value: 'За последние сутки'}] }}  />
    </>
  );
};

export default FilterAuto;
