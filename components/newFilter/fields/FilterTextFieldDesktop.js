import React from 'react'
import {Box, TextField, MenuItem} from "@material-ui/core";
import {Controller, useFormContext} from "react-hook-form";

import {searchItemInArray} from "#components/placeOffer/newPlaceOffer/AdditionalServices";

const FilterTextFieldDesktop = ({ title, data, alias, type }) => {

  const methods = useFormContext()

  const currentValue = methods.watch(alias, true)
  const item = searchItemInArray(data, currentValue, 'alias')
  const name = item?.name

  return (
    <Box>
      <Box>
        {title}
      </Box>
      <Controller
        name={alias}
        control={methods.control}
        defaultValue=''
        render={({field: {value, onChange}}) => {
          return (
            <TextField
            select
            variant="outlined"
            value={value}
            defaultValue={value}
            onChange={onChange}
            // TODO: переписать на makeStyles
            style={{width: '100%'}}
          >
            {Array.isArray(data) && (
              data.map((item, i) => (
                <MenuItem
                  key={i}
                  value={item.name}
                >
                  {item.name}
                </MenuItem>
              ))
            )}
          </TextField>
          )

        }}
      />
    </Box>
  )
}

export default FilterTextFieldDesktop
