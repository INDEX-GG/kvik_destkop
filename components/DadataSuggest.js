import React, {useState, useRef, useEffect} from 'react'
import {AddressSuggestions} from 'react-dadata';
// import 'react-dadata/dist/react-dadata.css';
import ProductYMAP from './product/ProductYMAP';
// import {useCity} from '../lib/Context/CityCTX'
import {Controller, useFormContext} from 'react-hook-form';
import {makeStyles, useMediaQuery} from '@material-ui/core';
import {invalid–°haracterLocation} from "../lib/regulars"
import {useStore} from '../lib/Context/Store'
import {useRouter} from "next/router";

const useStyles = makeStyles((theme) => ({
    mapDesc: {
        fontSize: '12px',
        color: '#C7C7C7',
        margin: '2px 0 16px'
    },
    mapError: {
        color: 'red'
    },
    mobile: {
        [theme.breakpoints.down(960)]: {

            '& > *:first-child': {
                '& > div > input': {
                    borderRadius: '0',
                    height: '48px',
                    fontSize: '18px',
                    fontWeight: '500',
                    marginBottom: '18px',
                    background: '#FFFFFF',
                    boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.1)',
                    border: '0',
                    fontFamily: 'inherit',
                    color: '#151515',
                    '&::placeholder': {
                        color: '#8F8F8F',
                    }
                }
            },

            '& > *:last-child': {
                padding: '0 10px',
            }
        }
    }
}))


const DadataSuggest = ({mobile = false, /**  address */}) => {

    const classes = useStyles()
    const [value, setValue] = useState();
    const [error, setError] = useState(false)
    const media960 = useMediaQuery('(max-width: 960px)');
    const router = useRouter();

    const inputRef = useRef()
    const prevValue = useRef()
    const methods = useFormContext();
    const {userInfo} = useStore()

    const userAddressName = methods.getValues('location') || userInfo?.location?.name
    const userAddressGeo = methods.getValues('coordinates') || userInfo?.location?.geo


    const defaultAddress = methods.watch('address')

    // —ć—Ą—Ą–Ķ–ļ—ā –ī–Ľ—Ź –∑–į–Ņ–ł—Ā–ł –≤ —Ą–ĺ—Ä–ľ—É –∑–Ĺ–į—á–Ķ–Ĺ–ł—Ź, –Ķ—Ā–Ľ–ł –ľ—č –Ĺ–į —Ā—ā—Ä–į–Ĺ–ł—Ü–Ķ —Ä–Ķ–ī–į–ļ—ā–ł—Ä–ĺ–≤–į–Ĺ–ł—Ź –ł –ī–į–Ĺ–Ĺ—č–Ķ –ĺ –ľ–Ķ—Ā—ā–ĺ–Ņ–ĺ–Ľ–ĺ–∂–Ķ–Ĺ–ł–ł –≤ –ĺ–Ī—ä—Ź–≤–Ľ–Ķ–Ĺ–ł–ł —É –Ĺ–į—Ā —É–∂–Ķ –Ķ—Ā—ā—Ć.
    useEffect(() => {
        if (defaultAddress) {

            let value = inputRef.current.state.query
            // –≤—Ä–Ķ–ľ–Ķ–Ĺ–Ĺ—č–Ļ —Ą–ł–ļ—Ā –ī–Ľ—Ź –ļ–ĺ—Ä—Ä–Ķ–ļ—ā–Ĺ–ĺ–≥–ĺ –∑–į–Ņ–ĺ–Ľ–Ĺ–Ķ–Ĺ–ł—Ź –Ņ–ĺ–Ľ—Ź, –≤ –ľ–ĺ–Ī–ł–Ľ—Ć–Ĺ–ĺ–Ļ –≤–Ķ—Ä—Ā–ł–ł
            value = typeof value === 'object' ? defaultAddress : value

            const url = "https://suggestions.dadata.ru/suggestions/api/4_1/rs/suggest/address";
            const token = "3fa959dcd662d65fdc2ef38f43c2b699a3485222";
            var options = {
                method: "POST",
                mode: "cors",
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json",
                    "Authorization": "Token " + token
                },
                body: JSON.stringify({query: value ? value : defaultAddress})
            }

            fetch(url, options)
                .then(response => response.json())
                .then(result => {
                    prevValue.current = value
                    if (result?.suggestions[0] !== undefined) {
                        setValue(result?.suggestions[0])
                        methods.setValue('location', result?.suggestions[0])
                        setError(false)
                    } else {

                        setValue('')
                        setError(true)
                    }
                })
                .catch(error => console.log("error", error));
        }

    }, [defaultAddress])

    // –Ľ–ĺ–≥–ł–ļ–į –ī–Ľ—Ź –Ņ–ĺ–ī—Ā—ā–į–≤–ļ–ł –ī–Ķ—Ą–ĺ–Ľ—ā–Ĺ–ĺ–≥–ĺ –į–ī—Ä–Ķ—Ā–į –ł–∑ —é–∑–Ķ—Ä—Ā—ā–ĺ—Ä–į, –≤—č–Ņ–ĺ–Ľ–Ĺ–ł—ā—Ā—Ź —ā–ĺ–Ľ—Ć–ļ–ĺ –Ņ—Ä–ł –Ņ–ĺ–ī–į—á–Ķ –Ĺ–ĺ–≤–ĺ–≥–ĺ –ĺ–Ī—ä—Ź–≤–Ľ–Ķ–Ĺ–ł—Ź.
    // —ā–ĺ –Ķ—Ā—ā—Ć –į–ī—Ä–Ķ—Ā –Ņ–ĺ —É–ľ–ĺ–Ľ—á–į–Ĺ–ł—é –≤—Ā–Ķ–≥–ī–į –Ī—É–ī–Ķ—ā –į–ī—Ä–Ķ—Ā–ĺ–ľ, –ļ–ĺ—ā–ĺ—Ä—č–Ļ —é–∑–Ķ—Ä —É–ļ–į–∑–į–Ľ –≤ –Ĺ–į—Ā—ā—Ä–ĺ–Ļ–ļ–į—Ö

    useEffect(() => {
        if (!defaultAddress && userInfo) {
            if (router.pathname.match('editPage')) return;
            // const value = inputRef.current.state.query
            const value = userInfo.address ? userInfo.address : userInfo.location.name

            const url = "https://suggestions.dadata.ru/suggestions/api/4_1/rs/suggest/address";
            const token = "3fa959dcd662d65fdc2ef38f43c2b699a3485222";
            var options = {
                method: "POST",
                mode: "cors",
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json",
                    "Authorization": "Token " + token
                },
                body: JSON.stringify({query: value})
            }

            fetch(url, options)
                .then(response => response.json())
                .then(result => {
                    prevValue.current = value
                    if (result?.suggestions[0] !== undefined) {
                        setValue(result?.suggestions[0])
                        methods.setValue('location', result?.suggestions[0])
                        setError(false)
                    } else {

                        setValue('')
                        setError(true)
                    }
                })
                .catch(error => console.log("error", error));
        }

    }, [defaultAddress, userInfo])

    const onSubmit = (onChange) => {
        const value = inputRef.current.state.query
        if (value.length && value.length > 1 && value !== prevValue.current) {
            const url = "https://suggestions.dadata.ru/suggestions/api/4_1/rs/suggest/address";
            const token = "3fa959dcd662d65fdc2ef38f43c2b699a3485222";
            var options = {
                method: "POST",
                mode: "cors",
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json",
                    "Authorization": "Token " + token
                },
                body: JSON.stringify({query: value})
            }
            fetch(url, options)
                .then(response => response.json())
                .then(result => {
                    prevValue.current = value
                    if (result?.suggestions[0] !== undefined) {
                        setValue(result?.suggestions[0])
                        onChange(result?.suggestions[0])
                        setError(false)
                    } else {
                        onChange('')
                        setValue('')
                        setError(true)
                    }
                })
                .catch(error => console.log("error", error));
        }
    }

    return (
        userAddressName && userAddressGeo ?
            <div className={classes.mobile}>
                <Controller
                    name="location"
                    control={methods.control}
                    // defaultValue={address || userInfo?.location?.name}
                    defaultValue={defaultAddress || ''}
                    render={({field: {value, onChange: controlChange}}) => (
                        <AddressSuggestions
                            token="3fa959dcd662d65fdc2ef38f43c2b699a3485222"
                            count={5}
                            ref={inputRef}
                            minChars={3}
                            delay={5}
                            value={value}
                            defaultQuery={value}
                            filterFromBound='city-region'
                            filterToBound='house'
                            // defaultQuery={address || userInfo?.location?.name}
                            // containerClassName='productInputMap'

                            onChange={(e) => {
                                console.log(e, 'onChange')
                                controlChange(e)
                                setValue(e)
                            }}
                            inputProps={{
                                onKeyDown: (e) => {
                                    if (e.key === 'Enter') {
                                        onSubmit(controlChange)
                                    }
                                },
                                onBlur: () => {
                                    onSubmit(controlChange)
                                },
                                placeholder: media960 ? '–í–≤–Ķ–ī–ł—ā–Ķ –į–ī—Ä–Ķ—Ā ' : '–í–≤–Ķ–ī–ł—ā–Ķ –≥–ĺ—Ä–ĺ–ī, —É–Ľ–ł—Ü—É, –ī–ĺ–ľ'
                            }}
                            // selectOnBlur={true}
                        />
                    )}
                    rules={{
                        required: '–£–ļ–į–∂–ł—ā–Ķ –≤–į—ą–Ķ –ľ–Ķ—Ā—ā–ĺ–Ņ–ĺ–Ľ–ĺ–∂–Ķ–Ĺ–ł–Ķ...',
                        pattern: {value: invalid–°haracterLocation(), message: '–Ě–Ķ–ī–ĺ–Ņ—É—Ā—ā–ł–ľ—č–Ķ —Ā–ł–ľ–≤–ĺ–Ľ—č'},
                    }}
                />
                {!media960 && (
                    <>
                        {error || methods.formState.errors?.location ?
                            <div className={`${classes.mapDesc} ${classes.mapError}`}>–í–≤–Ķ–ī–ł—ā–Ķ –ļ–ĺ—Ä—Ä–Ķ–ļ—ā–Ĺ—č–Ļ –į–ī—Ä–Ķ—Ā</div> :
                            <div className={classes.mapDesc}>–í–≤–Ķ–ī–ł—ā–Ķ –Ĺ–į–∑–≤–į–Ĺ–ł–Ķ –ł –í—č–Ī–Ķ—Ä–ł—ā–Ķ –ł–∑ —Ā–Ņ–ł—Ā–ļ–į –Ĺ–į—Ā–Ķ–Ľ–Ķ–Ĺ–Ĺ—č–Ļ –Ņ—É–Ĺ–ļ—ā –ł
                                —É–Ľ–ł—Ü—É</div>}
                    </>
                )}
                <ProductYMAP
                    height={mobile ? 400 : 224}
                    width={490}
                    border={true}
                    coordinates={value ? [value.data.geo_lat, value.data.geo_lon] : [+userAddressGeo[0], +userAddressGeo[1]]}/>
            </div> : null
    )
}

export default DadataSuggest
