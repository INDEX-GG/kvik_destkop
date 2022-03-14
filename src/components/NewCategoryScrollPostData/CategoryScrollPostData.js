import React, { useMemo } from "react"
import { Box } from "@material-ui/core"

import RenderCards from "./RenderCards/RenderCards"
import ScrollPostDataHeader from "./ScrollPostDataHeader/ScrollPostDataHeader"
import CustomButtonUI from "src/UI/UIcomponent/CustomButtonUI/CustomButtonUI"

import { useCategoryScrollPostData } from "./useCategoryScrollPostData"

import { checkActiveClass } from "../../services/services"
import { checkValidArray } from "src/services/services"

import { useCategoryScrollPostDataStyle } from "./style"

/**
 * * Выводит блок похожие объявления
 * @param {url} String
 * @param {product} Object
 * @returns
 */
const CategoryScrollPostData = ({ url, product }) => {
	const classes = useCategoryScrollPostDataStyle()
	const scrollPostData = useCategoryScrollPostData(url, product)

	const {
		postData: { isGrid, setGridView, isMobile },
		renderCards,
		maxCountShow,
		limitShow,
		setLimitShow,
	} = scrollPostData

	const similarLoadPostClass = useMemo(
		() =>
			checkActiveClass(false, classes.locationMapArrow, [
				classes.locationMapArrowActive,
			]),
		[]
	)

    // если лимит на показ меньше кол-ва похожих объявлений -> показываем кнопку показать еще
    // если массив похожих пустой -> не показываем кнопку
    const showButtonShowMore = useMemo(
        () => limitShow < renderCards?.length,
        [limitShow, renderCards?.length]
    )

	const handlerClickShowMore = () => {
		if (limitShow <= renderCards?.length)
			setLimitShow((prevState) => prevState + maxCountShow)
	}

	return checkValidArray(renderCards) ? (
		<>
			<Box>
				<ScrollPostDataHeader
					isGrid={isGrid}
					isMobile={isMobile}
					setGridView={setGridView}
				/>
			</Box>

			<RenderCards
				isGrid={isGrid}
				isMobile={isMobile}
				limitShow={limitShow}
				maxCountShow={maxCountShow}
				renderCards={renderCards}
				setLimitShow={setLimitShow}
			/>

            <Box className={classes.showMore}>
                {/* скрываем здесь, чтобы сохранились отсупы */}
                {showButtonShowMore &&
                    <CustomButtonUI onClick={handlerClickShowMore} customRoot={classes.showMoreButton}>
                        Показать еще
                        <Box component="span" className={similarLoadPostClass} />
                    </CustomButtonUI>
                }
            </Box>
		</>
	) : null
}

export default React.memo(CategoryScrollPostData)
