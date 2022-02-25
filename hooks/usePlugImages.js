import jsonData from '/public/placeOfferJson/new_catalog.json'

/**
 * * Function returns the original array if the array is not empty and not null,
 * * otherwise the category title (alias) for rendering the canvas stub
 * @param {arr} Array || null
 * @param {alias_category} String "transport, auto..."
 * @returns Array [{...}]
 */
export function usePlugImages (arr = null, alias_category) {

  let modifiedArrImages = []

  const checkArray = (_arr) => {
    // если null, === 0
    if(_arr === null || !_arr.length) {
      const aliasNameArray = alias_category.split(',')
      const {category} = jsonData

      const findCategoryStep1 = category.find(item => item.alias === aliasNameArray[0])
      const findCategoryStep2 = findCategoryStep1.children.find(item => item.alias === aliasNameArray[1])
      
      const titleCanvas = findCategoryStep2?.name || findCategoryStep1?.name
      modifiedArrImages = [{ title: titleCanvas }]
    }else {
      modifiedArrImages = _arr
    }
  }

  checkArray(arr)

  return {arr: modifiedArrImages}
}
