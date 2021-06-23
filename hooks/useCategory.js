import navObj from '../components/json/navobj.json';

export const useCategory = () => {
    console.log(navObj)

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

    const categoriesById = (id) => {
        let c1 = [],
            c2 = [],
            c3 = [];

        function obj2Arr(object) {
            let array = [];
            for (let key = 0; key < Object.keys(object).length; key++) {
                array = [...array, object[Object.keys(object)[key]]]
            };
            return array
        }

        console.log(obj2Arr(navObj))

        c2 = obj2Arr(navObj).filter(category => category.id == id);
        console.log('отфильтрованный массив', c2);
        if (c2[0] !== undefined) {
            console.log(categoryIdValueSorted(c2[0].subCategories))
        } else {
            console.log('ошибка катеории второго уровня')
        }
        return categoryIdValueSorted(c2[0].subCategories);
    }
    console.log(categoriesById(61))

    const categoryMain = (categoryIdValueSorted(navObj));

    return { categoryMain, categoriesById }
}