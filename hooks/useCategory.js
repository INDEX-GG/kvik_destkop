import navObj from '../components/json/navobj.json';

export const useCategory = () => {

    const categoryIdValueSorted = (object) => {
        let c1 = [],
            c2 = [];
        for (let key = 0; key < Object.keys(object).length; key++) {
            c1 = [...c1, object[Object.keys(object)[key]]]
        };
        c1.forEach(category => {
            c2 = [...c2, { value: category.id, label: category.name }]
        })
        return (c2.sort((a, b) => a.value - b.value));
    }

    const categoriesById = (id1, id2, id3) => {
        let c1 = [],
            c2 = [],
            c3 = [],
            c4 = [];
        function obj2Arr(object) {
            let array = [];
            for (let key = 0; key < Object.keys(object).length; key++) {
                array = [...array, object[Object.keys(object)[key]]]
            };
            return array
        }
        c1 = obj2Arr(navObj)
        c2 = obj2Arr(navObj).filter(category => category.id == id1);
        if (id1 && id2 === undefined && id3 === undefined) {
            return categoryIdValueSorted(c2[0].subCategories);
        } else if (id1 && id2 && id3 === undefined) {
            c3 = obj2Arr(c2.map(item=>item.subCategories)[0]).filter(res => res.id == id2)
            if (c3[0].hasOwnProperty('subCategories')){
                return categoryIdValueSorted(c3[0].subCategories);
            } 
        } else if (id1 && id2 && id3) {
            c3 = obj2Arr(c2.map(item=>item.subCategories)[0]).filter(res => res.id == id2)
            c4 = obj2Arr(c3.map(item=>item.subCategories)[0]).filter(res => res.id == id3)
            if (c4[0].hasOwnProperty('subCategories')){
                return categoryIdValueSorted(c4[0].subCategories);
            } 
        } 
    }
    const categoryMain = (categoryIdValueSorted(navObj));
    return { categoryMain, categoriesById }
}