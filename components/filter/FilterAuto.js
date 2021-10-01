import { useFormContext } from "react-hook-form";
import FilterRadio from "./FilterRadio";
import FilterSelect from "./FilterSelect";
import FilterTwoFields from "./FilterTwoFields";
import FilterAutoYears from "./FilterAutoYears";
import years from './json/years.json'
import enginesize from './json/enginesize.json'
import FilterMultipleSelect from "./FilterMultipleSelect";
import FilterColor from "./FilterColor";
import axios from "axios";
import { BASE_URL } from "../../lib/constants";
import { useEffect, useState } from "react";



const FilterAuto = () => {
  const methods = useFormContext();
  const [mark, setMark] = useState([]),
    [model, setModel] = useState(undefined),
    [generation, setGeneration] = useState(undefined)



  useEffect(()=>{
    axios.get(`${BASE_URL}/subcategories/auto.json`)
    .then(r => setMark(r.data.auto.find(el => el.alias === 'marks' ).fields))
  }, [])

  useEffect(() => {
    if (methods.watch('mark')) {
        axios.get(`/auto_brand/` + (methods.watch('mark')) + `.json`)
            .then((result) => setModel(result.data.children));
            // .catch((e) => console.log(e))
        setGeneration()
        methods.setValue('generation', '')
        methods.setValue('modelsAuto', '')
    }

  }, [methods.watch('mark')])

  useEffect(() => {
    if (methods.watch('modelsAuto')) {
      // console.log(model.find(el => el.value === methods.watch('modelsAuto')));
      setGeneration(model.find(el => el.value === methods.watch('modelsAuto')).children)
      methods.setValue('generation', '')
    }

  }, [methods.watch('modelsAuto')])


  return (
    <>
      <FilterTwoFields data={{firstAlias:"fromPrice", secondAlias:'toPrice', title:"Цена, ₽"}} /> 
      <FilterSelect data={{alias:"type", title:"Тип автомобиля", fields: ["Любой", "Новые", "С пробегом" ]}} />
      {methods.watch('type') !== 'Новые' && methods.watch('type') ? <FilterTwoFields unmount data={{firstAlias:"fromMileage", secondAlias:'toMileage', title:"Пробег, км"}} /> : null }
      <FilterSelect data={{alias:"mark", title:"Марка", fields: mark}} />
      {model && <FilterSelect data={{alias:"modelsAuto", title:"Модель", fields: model.map(el => el.value)}} />}
      {generation && <FilterSelect data={{alias:"generation", title:"Поколение", fields: generation.map(el => el.value)}} />}
      <FilterMultipleSelect data={{alias:"bodytype", title:"Кузов", fields: ["Седан", "Хэтчбек 5 дв.","Хэтчбек 3 дв.","Лифтбек","Джип 5 дв.","Джип 3 дв.", "Универсал", "Минивэн", "Пикап", "Купе",  "Открытый" ]}} />
      <FilterAutoYears data={{firstAlias:"fromYear", secondAlias:'toYear', title:"Год выпуска", fields: years   }} />
      <FilterSelect data={{alias:"drivetype", title:"Привод", fields: ["4WD", "Передний", "Задний" ]}} />
      <FilterSelect data={{alias:"transmission", title:"Коробка передач", fields: ["Автомат", "Механика", "Вариатор", "Робот" ]}} />
      <FilterSelect data={{alias:"fueltype", title:"Двигатель", fields: ["Бензин", "Дизель", "Электро", "Гибрид" ]}} />
      <FilterAutoYears data={{firstAlias:"fromEnginesize", secondAlias:'toEnginesize', title:"Объем двигателя, л.", fields: enginesize }} />
      <FilterRadio data={{title:"Руль", alias:'steeringWheel', fields:['Любой','Правый','Левый'] }}  />
      <FilterTwoFields data={{firstAlias:"fromPower", secondAlias:'toPower', title:"Мощность, л.с."}} /> 
      <FilterColor alias='color' title='Цвет' />
      {methods.watch('type') !== 'Новые' && methods.watch('type') ? <FilterSelect unmount data={{alias:"condition", title:"Состояние", fields: ["Битый", "Не битый", "На гарантии"]}} /> : null }
      {methods.watch('type') !== 'С пробегом' && methods.watch('type') ? <FilterSelect unmount data={{alias:"status", title:"Статус", fields: ["В пути", "В наличии", "Под заказ"]}} /> : null }
      <FilterRadio data={{title:"Срок размещения", alias:'period', fields:['За все время','За последнюю неделю','За последние сутки'] }}  />
    </>
  );
};

export default FilterAuto;
