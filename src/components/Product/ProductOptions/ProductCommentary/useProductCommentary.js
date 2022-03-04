import {useState} from "react";

export const useProductCommentary = () => {
    const [viewInput, setViewInput] = useState(false);
    const [valueInput, setValueInput] = useState('');

    const handClickView = () => {
        setViewInput(!viewInput);
    }

    const handleChangeInput = (e) => {
        setValueInput(e.target.value)
    }

    return {
        valueInput,
        viewInput,
        handClickView,
        handleChangeInput
    }
}
