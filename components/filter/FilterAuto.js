import {useFormContext} from "react-hook-form";
import FilterRadio from "./FilterRadio";
import FilterSelect from "./FilterSelect";
import FilterTwoFields from "./FilterTwoFields";
import FilterAutoYears from "./FilterAutoYears";
import years from './json/years.json'
import enginesize from './json/enginesize.json'
import FilterMultipleSelect from "./FilterMultipleSelect";
import FilterColor from "./FilterColor";
import axios from "axios";
import {BASE_URL} from "../../lib/constants";
import {useEffect, useState} from "react";
import {formDefaultValue} from "../../lib/utils/checkBoxFunction";
import {useRouter} from "next/router";


const FilterAuto = () => {
  const methods = useFormContext();
  const [mark, setMark] = useState([]),
    [model, setModel] = useState(undefined),
    [generation, setGeneration] = useState(undefined),
    router = useRouter()


  useEffect(() => {
    // Изменение изначальных значений формы (defaultValue)
    formDefaultValue(router.query, methods)
  }, [router, methods.reset, methods.getValues])

  useEffect(() => {
    axios.get(`${BASE_URL}/subcategories/auto.json`)
      .then(r => setMark(r.data.auto.find(el => el.alias === 'marks').fields))
  }, [])

  useEffect(async () => {
    if (methods.watch('modelsAuto')) {
      await axios.get(`/auto_brand/` + (methods.watch('modelsAuto')) + `.json`)
        .then((result) => setModel(result.data.children));

      // Проверка на взаимодействие пользователя с формой
      if (methods.formState.isDirty) {
        setGeneration(undefined)
        methods.setValue('generation', '')
        methods.setValue('submodels', '')
      }
    }

  }, [methods.watch('modelsAuto'), methods.getValues])

  useEffect(() => {
    if (methods.watch('submodels')) {
      if (model) {
        setGeneration(model?.find(el => el.value === methods.watch('submodels'))?.children)
      }

      // Проверка на взаимодействие пользователя с формой
      if (methods.formState.isDirty) {
        methods.setValue('generation', '')
      }
    }

  }, [methods.watch('submodels'), methods.getValues, model])


  return (
    <>
      <FilterTwoFields data={{firstAlias: "fromPrice", secondAlias: 'toPrice', title: "Цена, ₽"}}/>
      <FilterSelect
        data={{alias: "type_park_auto", title: "Тип автомобиля", fields: ["Любой", "Новый", "С пробегом"]}}/>
      {methods.watch('type_park_auto') !== 'Новый' && methods.watch('type_park_auto') ? <FilterTwoFields unmount data={{
        firstAlias: "fromMileage",
        secondAlias: 'toMileage',
        title: "Пробег, км"
      }}/> : null}
      <FilterSelect data={{alias: "modelsAuto", title: "Марка", fields: mark}}/>
      {model && <FilterSelect data={{alias: "submodels", title: "Модель", fields: model.map(el => el.value)}}/>}
      {generation &&
      <FilterSelect data={{alias: "generation", title: "Поколение", fields: generation.map(el => el.value)}}/>}
      <FilterMultipleSelect data={{
        alias: "bodytype",
        title: "Кузов",
        fields: ["Седан", "Хетчбэк", "Минивэн", "Лифтбек", "Внедорожник", "Универсал", "Купе", "Кабриолет", "Фургон", "Пикап", "Микроавтобус"]
      }}/>
      <FilterAutoYears data={{firstAlias: "fromYear", secondAlias: 'toYear', title: "Год выпуска", fields: years}}/>
      <FilterSelect data={{alias: "drivetype", title: "Привод", fields: ["4WD", "Передний", "Задний"]}}/>
      <FilterSelect
        data={{alias: "transmission", title: "Коробка передач", fields: ["Автомат", "Механика", "Вариатор", "Робот"]}}/>
      <FilterSelect data={{alias: "fueltype", title: "Двигатель", fields: ["Бензин", "Дизель", "Электро", "Гибрид"]}}/>
      <FilterAutoYears data={{
        firstAlias: "fromEnginesize",
        secondAlias: 'toEnginesize',
        title: "Объем двигателя, л.",
        fields: enginesize
      }}/>
      <FilterRadio data={{title: "Руль", alias: 'steering_wheel', fields: ['Любой', 'Правый', 'Левый']}}/>
      <FilterTwoFields data={{firstAlias: "fromPower", secondAlias: 'toPower', title: "Мощность, л.с."}}/>
      <FilterColor alias='color' title='Цвет'/>
      {methods.watch('type_park_auto') !== 'Новый' && methods.watch('type_park_auto') ? <FilterSelect unmount data={{
        alias: "condition",
        title: "Состояние",
        fields: ["Битый", "Не битый", "На гарантии"]
      }}/> : null}
      {methods.watch('type_park_auto') !== 'С пробегом' && methods.watch('type_park_auto') ? <FilterSelect unmount
                                                                                                           data={{
                                                                                                             alias: "status",
                                                                                                             title: "Статус",
                                                                                                             fields: ["В пути", "В наличии", "Под заказ"]
                                                                                                           }}/> : null}
      <FilterRadio data={{
        title: "Срок размещения",
        alias: 'period',
        fields: ['За все время', 'За последнюю неделю', 'За последние сутки']
      }}/>
    </>
  );
};

export default FilterAuto;
