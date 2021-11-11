import { Box, makeStyles, TextField, Typography } from "@material-ui/core";
import { Controller, useFormContext } from "react-hook-form";
import { OnlyNumbersMask } from "../../lib/onlyNumbersMask";
import {useEffect} from "react";
import {useRouter} from "next/router";

const useStyles = makeStyles(() => ({
  formBox: {
    margin: "24px 0",
  },
  formInputField: {
    display: "flex",
  },
  formTitle: {
    marginLeft: 8,
    fontWeight: 500,
    fontSize: 14,
    color: "#2C2C2C",
  },
  input: {
    "&:last-of-type": {
      marginLeft: 0,
    },
    "& .MuiOutlinedInput-input": {
      paddingLeft: 8,
    },
  },
  inputActuve: {
    "& .MuiOutlinedInput-input": {
      paddingLeft: 28,
      maxWidth: 139,
    },
  },
  tooltip: {
    position: "absolute",
    top: 8,
  },
}));

const FilterTwoFields = ({ data, unmount }) => {
  const classes = useStyles();
  const methods = useFormContext();
  const router = useRouter();

  useEffect(() => {
    if (data.firstAlias === 'fromPrice' && data.secondAlias === 'toPrice') {
      if (Object.keys(router.query).length) {
        if (!router.query?.fromPrice) {
          methods.setValue(data.firstAlias, '')
        }

        if (!router.query?.toPrice) {
          methods.setValue(data.secondAlias, '')
        }
      }

    }
  }, [router])


  return (
    <Box className={classes.formBox}>
      <Typography className={classes.formTitle}>{data.title}</Typography>
      <Box className={classes.formInputField}>
        <Box style={{ position: "relative", maxWidth: "50%", margin: 8 }}>
          <Controller
            name={data.firstAlias}
            control={methods.control}
            defaultValue=""
            shouldUnregister={unmount}
            render={({ field: { onChange, value } }) => (
              <>
                <TextField
                  className={`${classes.input} ${
                    value?.length && value.length < 8 ? classes.inputActuve : ""
                  }`}
                  variant="outlined"
                  value={value ? value : ''}
                  placeholder="от"
                  onChange={(e) => onChange(OnlyNumbersMask(e, "num"))}
                  onBlur={(e) => {
                    const watchInput = methods.watch(data.secondAlias)
                    // console.log(+e.target.value, +watchInput)
                    if (+e.target.value > +watchInput && +watchInput !== 0) {
                      console.log(+e.target.value, +watchInput);
                      methods.setValue(data.firstAlias, '')
                    }
                  }}
                />
                {value?.length && value.length < 8 ? (
                  <span className={classes.tooltip} style={{ left: 8 }}>
                    от
                  </span>
                ) : null}
              </>
            )}
          />
        </Box>
        <Box style={{ position: "relative", maxWidth: "50%",  margin: "8px 8px 8px 0" }}>
          <Controller
            name={data.secondAlias}
            shouldUnregister={unmount}
            control={methods.control}
            defaultValue=""
            render={({ field: { onChange, value } }) => (
              <>
                <TextField
                  className={`${classes.input} ${
                    value?.length && value.length < 8 ? classes.inputActuve : ""
                  }`}
                  variant="outlined"
                  value={value ? value : ''}
                  placeholder="До"
                  onChange={(e) => onChange(OnlyNumbersMask(e, "num"))
                  }
                  onBlur={(e) => {
                    const watchInput = methods.watch(data.firstAlias)
                     console.log(+e.target.value < +watchInput)
                      if (+e.target.value < +watchInput && +watchInput !== 0) {
                        methods.setValue(data.secondAlias, '')
                      }
                  }}
                />
                {value?.length && value.length < 8 ? (
                  <span className={classes.tooltip} style={{ left: 8 }}>
                    До
                  </span>
                ) : null}
              </>
            )}
          />
        </Box>
      </Box>
    </Box>
  );
};

export default FilterTwoFields;
