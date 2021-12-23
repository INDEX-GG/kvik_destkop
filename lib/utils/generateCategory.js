export const getMoreCategory = (categoryArray, category, category2, category3) => {

    if (category && categoryArray?.length) {

        // Категории первой вложенности
        const categoryArrOne = categoryArray.find(item => item.alias === category)

        // Категории второй вложенности
        if (category2) {

            const categoryArrTwo = categoryArrOne.children.find(item => item.alias === category2);

            // Категории третьей вложенности
            if (category3) {
                return categoryArrTwo.children.find(item => item.alias === category3);

            }

            return categoryArrTwo
        }

        return categoryArrOne
    }
};