import { useCategory } from "../../hooks/useCategory"

export default function aliasName(alias, bread = false) {
    const {categoryMainAlias, categoriesByAlias} = useCategory()

    let aliasName = categoryMainAlias.filter(item => item.alias == alias)
    let aliasBread = null

    if (aliasName.length > 0) {
        aliasBread = [aliasName[0]]

        if (bread) {
            return {aliasName, aliasBread}
        }
        
        return aliasName
    }

    for (let inner1 = 0; inner1 < categoryMainAlias.length; inner1++) {
        aliasName = categoriesByAlias(categoryMainAlias[inner1].alias).filter(item => item.alias == alias)

        if (aliasName.length > 0) {
            aliasBread = [categoryMainAlias[inner1], aliasName[0]]

            if (bread) {
              return {aliasName, aliasBread}
            }

            return aliasName
        }
    }

    for (let inner1 = 0; inner1 < categoryMainAlias.length; inner1++) {
        const test = categoryMainAlias[inner1]

        for (let inner2 = 0; inner2 < 1; inner2++) {
            const test2 = categoriesByAlias(test.alias).filter(item => item.alias)

            for (let inner3 = 0; inner3 < test2.length; inner3++) {
                aliasName = categoriesByAlias(test.alias, test2[inner3].alias)

                if (aliasName != null) {
                    aliasName = aliasName.filter(item => item.alias == alias)
                    if (aliasName.length > 0) {
                        aliasBread = [test, test2[inner3], aliasName[0]]

                        if (bread) {
                            return {aliasName, aliasBread}
                        }

                        return aliasName
                    }
                }
            }
        }
    }

    for (let inner1 = 0; inner1 < categoryMainAlias.length; inner1++) {
        const test = categoryMainAlias[inner1]

        for (let inner2 = 0; inner2 < 1; inner2++) {
            const test2 = categoriesByAlias(test.alias).filter(item => item.alias)

            for (let inner3 = 0; inner3 < test2.length; inner3++) {
                let test3 = categoriesByAlias(test.alias, test2[inner3].alias)

                if (test3 != null) {
                    test3 = test3.filter(item => item.alias)

                    for (let inner4 = 0; inner4 < test3.length; inner4++) {
                      aliasName = categoriesByAlias(test.alias, test2[inner3].alias, test3[inner4].alias)

                      if (aliasName != null) {

                        aliasName = aliasName.filter(item => item.alias == alias)

                        if (aliasName.length > 0) {
                            aliasBread = [test, test2[inner3], test3[inner4], aliasName[0]]

                            if (bread) {
                                return {aliasName, aliasBread}
                            }

                            return aliasName
                        }
                      }
                    }
                }
            }
        }
    }


    aliasName = null

    return null
}