import React from 'react'

/**
 * Возвращает компонент по условию test
 * в каждом дочернем компоненте должен быть атрибут testValue для проверки с test
 * @param {*} param0
 * @returns
 */
const Switch = ({test, children}) => {
    return children.find(child => child.props.testValue === test)
}

export default React.memo(Switch)
