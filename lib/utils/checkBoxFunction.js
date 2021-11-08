import moment from "moment";

const checkDateNumber = (date) => {
  if (+date < 10) return `0${date}`
  return date
}

const generateDateBack = (dateObj, dayBack) => {
  //! Колицество дней в предыдущем месяце
  const dayInPrevMonth = moment(`${dateObj.year}-${+dateObj.month - 1 ? dateObj.month - 1 : 12}`).daysInMonth()


  let year = dateObj.year
  let month = dateObj.month;
  let day = dateObj.date - dayBack
  let hours = dateObj.hour
  let minutes = dateObj.minutes
  let seconds = dateObj.seconds

  // Переход на предыдущий месяц
  if (day < 1) {
    day = dayInPrevMonth + day
    month = checkDateNumber(month - 1)

    // Переход на предыдущий год
    if (month < 1) {
      year = year - 1
      month = 12
    }

  }

  return `${year}-${month}-${checkDateNumber(day)} ${hours}:${minutes}:${seconds}`
}

export const generateCheckboxTime = (stringTime) => {

  const date = new Date()

  const dateObj = {
    year: date.getUTCFullYear(),
    month: checkDateNumber(date.getUTCMonth() + 1),
    date: checkDateNumber(date.getUTCDate()),
    hour: checkDateNumber(date.getUTCHours()),
    minutes: checkDateNumber(date.getUTCMinutes()),
    seconds: checkDateNumber(date.getUTCSeconds())
  }

  switch (stringTime) {
    case undefined:
      return null
    case 'За все время':
      return null
    case 'За последнюю неделю':
      return generateDateBack(dateObj, 7)
    case 'За последние сутки':
      return generateDateBack(dateObj, 1)
  }
}

const generateRangeKey = (data, fromKey, routeObj = false) => {
  let keyName = fromKey.substring(4,)
  const toKey = `to${keyName}`

  //! Если прилетел ключ to
  if (fromKey.substring(0, 4) !== 'from') {
    keyName = fromKey.substring(2,)
  }

  //! Если оба ключа пустые, то ничего не делаем
  if (!data[fromKey] && !data[toKey] && keyName !== 'Price') {
    return;
  }

  //! Если прелетел ключ from
  if (fromKey.substring(0, 4) === 'from') {
    data[keyName.toLowerCase()] = {
      min: data[fromKey] ? +data[fromKey] : null,
      max: data[toKey] ? +data[toKey] : null
    }
    //  Если прелете ключ to
  } else {
    data[keyName.toLowerCase()] = {
      min: data[toKey] ? +data[toKey] : null,
      max: data[fromKey] ? +data[fromKey] : null,
    }
  }

  //! Генерация router.query объекта
  if (routeObj) {
    if (data[fromKey]) routeObj[fromKey] = String(data[fromKey])
    if (data[toKey]) routeObj[toKey] = String(data[toKey])
  }

  //! Удаляем ненужные ключи
  delete data[fromKey]
  delete data[toKey]
}

export const generateCheckBoxObj = (data, routeObj = false) => {
  for (let key in data) {
    // Ищем слово from в ключе
    const fromKey = key.substring(0, 4)
    // Ищем слово to в ключе
    const toKey = key.substring(0, 2)


    // Если есть, то вызваем генерацию объекта
    if (fromKey === 'from' || toKey == 'to') {
      generateRangeKey(data, key, routeObj)
    }


    //! Если значение ключа не устраивает нас, удаляем ключ из объекта
    if (data[key] === undefined || data[key] === "" || data[key] === 'Любой' || data[key]?.length === 0) {
      delete data[key]
      //! Добовляем в router.query объект
    } else {
      if (routeObj) {
        routeObj[key] = data[key]
      }
    }
  }
}

const generateArray = (item) => {
  return Array.isArray(item) ? item.filter(item => item !== '') : item ? [item]: []
}

export const generateDefaultValue = (obj) => {
  if (obj) {

    if (obj.alias === 'auto') {

      return {
        "type_park_auto": obj?.type_park_auto,
        "fromMileage": obj?.fromMileage,
        "toMileage": obj?.toMileage,
        "modelsAuto": obj?.modelsAuto,
        "submodels": obj?.submodels,
        "generation": obj?.generation,
        "bodytype": generateArray(obj.bodytype),
        "fromYear": obj?.fromYear,
        "toYear": obj?.toYear,
        "drivetype": obj?.drivetype,
        "transmission": obj?.transmission,
        "fueltype": obj?.fueltype,
        "fromEnginesize": obj?.fromEnginesize,
        "toEnginesize": obj?.toEnginesize,
        "steering_wheel": obj?.steering_wheel,
        "fromPower": obj?.fromPower,
        "toPower": obj?.toPower,
        "color": generateArray(obj.color),
        "condition": obj?.condition,
        "status": obj?.status
      }
    }
  }
}

export const formDefaultValue = (query, methods) => {
  if (query) {
    const defaultValue = generateDefaultValue(query)

    const defaultAllCategoryField = {
      "fromPrice": query?.fromPrice,
      "toPrice": query?.toPrice,
      "period": query?.period
    }


    // Изменение defaultValue
    if (defaultValue) {
      methods.reset({
        ...methods.getValues(),
        ...defaultAllCategoryField,
        ...defaultValue
      })
    } else {
      methods.reset()
    }
  }
}