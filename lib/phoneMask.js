import React, {useState} from "react"
import { useForm, Controller } from 'react-hook-form';
import { TextField } from "@material-ui/core" 

export default function PhoneMask() {
    const { handleSubmit, control } = useForm()
    const [valueInp, setValueInp] = useState("")
    let arrTest = []
    function maskChange(e, key) {
        let value = e.target.value

        if (value.length <= 16 && value.length >= 0) {
            arrTest = (value.split(""))
            setValueInp(arrTest.join(""))
        }

        if (value[0] === "9") {
            // setValueInp(`+7 (${arrTest.join("")}`)
        } else if (e.target.value.match(/^[0-8]/g)) {
            setValueInp(`+7 (${value.split("").splice(1, value.length).join("")}`)
        }


        // Пробел
        if (!e.target.value.match(/^\S*$/g)) {
            setValueInp(e.target.value.split("").splice(0, e.target.value.length - 1).join(""))
        }

        //  Без спц символов

        if (e.target.value.match(/[-!@$%^#&*()_|~=`{}\[\]:";'<>?,.\/]/g)) {
            setValueInp(e.target.value.split("").splice(0, e.target.value.length - 1).join(""))
        }

        //! Если начинается с + то пропускаем
        //! Если продолжается с 7 то пропускаем


        //! Если начниается с 9 то додовляем +7
        //! Если начинаем с 8 то заменяем на + 7
        //! Если начниаем с 2 то добовляем + 7 и очищаем 2
        

        // if (e.target.value.match(/[+][7][9]/)) {

        // }


        // if (!e.target.value.match(/[-!@$%^#&*()_|~=`{}\[\]:";'<>?,.\/]/g) && e.target.value.match(/[0-7]/) && e.target.value.length == 1) {
        //     setValueInp("+7 (")
        // }

        
        // if (!e.target.value.match(/^[+]/)) {
        //     // setValueInp("+ 7 (")
        // }

        // if (!e.target.value.match(/^[+89]/) && !e.target.value.match(/[\b]/)) {
        //     setValueInp("+7 (")
        // }



        // Только чила

        // if (!e.target.value.match(/^\d+$/)) {
        //     setValueInp(e.target.value.split("").splice(0, e.target.value.length - 1).join("")) 
        // }

    
        // // Конечный результат
        // if (e.target.value.match(/^[+][7][ ][(][9][1-9][1-9][)][1-9][1-9][1-9][-][1-9][1-9][-][1-9][1-9]$/)) {
        //     console.log("УСПЕХ")
        // }
    }


    return (
        <Controller
            name="phone"
            control={control}
            defaultValue=''
            render={({ field: { onChange, value }, fieldState: { error } }) => (
                <TextField label='Номер телефона'
                    variant='outlined' size='small'
                    type="tel"
                    value={valueInp}
                    onKeyDown={e => onChange(maskChange(e, true))}
                    onChange={e => onChange(maskChange(e))}
                    error={!!error} helperText={error ? error.message : ' '} />
            )}
            rules={{ required: 'Введите номер телефона' }}
        />
    )
}