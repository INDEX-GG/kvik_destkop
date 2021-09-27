import categories from '../components/json/categories.json';

export const useFindCategory = () => {

const cats = categories.category;

	const categoryAliasValue = array => {
		let a1 = [];
		array.map(item => a1 = [...a1, {alias: item.alias, label: item.name}])
		return a1;
	};

	const filterByAlias = (array, alias) => {
		return array.filter(item => item.alias == alias)
	}

	const categoryMainAlias = categoryAliasValue(cats);

	const categoriesByAlias = (arr) => {
		const [alias1, alias2, alias3, alias4] = arr
		let a1 = [],
			a2 = [],
			a3 = [];
		if (alias1 && alias2 === undefined && alias3 === undefined && alias4 === undefined) {
			a1 = filterByAlias(cats, alias1)[0]?.children;
				return cats.find(el => el.alias === alias1);
		} else if (alias1 && alias2 && alias3 === undefined) {
			a1 = filterByAlias(cats, alias1)[0]?.children;
			a2 = filterByAlias(a1, alias2)[0]?.children;
			if (a2?.length === 0) {
				return categoryAliasValue(a1).find(el => el.alias === alias2)
			} else {
				return categoryAliasValue(a1).find(el => el.alias === alias2)
			}
		} else if (alias1 && alias2 && alias3) {
			a1 = filterByAlias(cats, alias1)[0]?.children;
			a2 = filterByAlias(a1, alias2)[0]?.children;
			a3 = filterByAlias(a2, alias3)[0]?.children;
			if (a3?.length === 0 || arr.length === 3) {
				return categoryAliasValue(a2).find(el => el.alias === alias3)
			} else {
				return categoryAliasValue(a3).find(el => el.alias === alias4)
			}
				
		}
	};
	
    return { categoryMainAlias, categoriesByAlias }
}
