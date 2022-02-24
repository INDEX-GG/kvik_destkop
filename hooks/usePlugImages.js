import jsonData from '/public/placeOfferJson/new_catalog.json'

export function usePlugImages (arr = null, alias_category) {

  let modifiedArrImages = []

  const checkArray = (_arr) => {
    // если null, === 0
    if(_arr === null || !_arr.length) {
      const aliasName = alias_category.split(',')
      const {category} = jsonData

      const findCategory = category.find(item => item.alias === aliasName[0])
      // TODO: добавить проверку на вторую и третью категорию
      const titleCanvas = findCategory.name
      modifiedArrImages = [{ title: titleCanvas }]
    }else {
      modifiedArrImages = _arr
    }
  }

  checkArray(arr)

  return {arr: modifiedArrImages}
}
