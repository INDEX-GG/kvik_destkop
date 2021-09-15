import React, { useState } from "react";
import { Controller } from "react-hook-form";
import { makeStyles, TextField } from "@material-ui/core";
import PhoneMask from "../lib/phoneMask";

const useStyles = makeStyles((theme) => ({
  buyDileveryInputTitel: {
    color: "#2C2C2C",
    fontSize: "14px",
    fontWeight: "500",
    marginBottom: "12px",
  },
  buyDileveryInputBox: {
    width: "100%",
    display: "flex",
    flexWrap: "wrap",
    // paddingRight: '24px',
    "& > *": {
      paddingRight: "28px",
    },
    "& > *:nth-of-type(3)": {
      paddingRight: "0px",
    },
    [theme.breakpoints.down(768)]: {
      "& > *": {
        paddingRight: "0px",
      },
    },
  },
  buyDileveryInputItem: {
    width: "33.33%",
    position: "relative",
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-end",
    marginBottom: "16px",
    // [theme.breakpoints.down("sm")] : {
    //     width: "50%",
    // },
    [theme.breakpoints.down(768)]: {
      width: "100%",
      alignItems: "flex-start",
      paddingLeft: "0",
    },
  },
  buyDileveryInput: {
    width: "100%",
    maxWidth: "270px",
    [theme.breakpoints.down(768)]: {
      maxWidth: "none",
    },
  },
  buyDileveryInputDesc: {
    color: "#C7C7C7",
    fontSize: "12px",
    maxWidth: "264px",
    alignSelgt: "flex-start",
    width: "100%",
    [theme.breakpoints.down(768)]: {
      maxWidth: "none",
    },
  },
  require: {
    "&::before": {
      content: '"•"',
      display: "block",
      position: "absolute",
      lineHeight: 0,
      top: "50%",
      left: "-22px",
      fontSize: "20px",
      color: "#F44545",
    },
  },
}));

const DeliveryBuyerForm = ({ courier = false, control }) => {
  const classes = useStyles();
  const [phoneValue, setPhoneValue] = useState("");

  return (
    <>
      <h3 className={classes.buyDileveryInputTitel}>
        Данные покупателя для получения заказа
      </h3>
      <div className={classes.buyDileveryInputBox}>
        <div className={classes.buyDileveryInputItem}>
          <Controller
            name="firstName"
            control={control}
            defaultValue=""
            render={({ field: { onChange, value }, fieldState: { error } }) => (
              <>
                <TextField
                  className={`${classes.buyDileveryInput} ${
                    error ? classes.require : ""
                  }`}
                  onChange={onChange}
                  value={value}
                  error={!!error}
                  label="Имя"
                  variant="outlined"
                  size="small"
                  type="text"
                />
                <p
                  className={classes.buyDileveryInputDesc}
                  style={{ color: error ? "#f44336" : null }}
                >
                  {error
                    ? error.message
                    : "Данные как в паспорте, посылку выдадут только лично вам"}
                </p>
              </>
            )}
            rules={{ required: "Введите имя" }}
          />
        </div>
        <div className={classes.buyDileveryInputItem}>
          <Controller
            name="lastName"
            control={control}
            defaultValue=""
            render={({ field: { onChange, value }, fieldState: { error } }) => (
              <>
                <TextField
                  className={`${classes.buyDileveryInput} ${
                    error ? classes.require : ""
                  }`}
                  onChange={onChange}
                  value={value}
                  error={!!error}
                  label="Фамилия"
                  variant="outlined"
                  size="small"
                  type="text"
                />
                <p
                  className={classes.buyDileveryInputDesc}
                  style={{ color: error ? "#f44336" : null }}
                >
                  {error ? error.message : ""}
                </p>
              </>
            )}
            rules={{ required: "Введите фамилию" }}
          />
        </div>
        <div className={classes.buyDileveryInputItem}>
          <Controller
            name="middleName"
            control={control}
            defaultValue=""
            render={({ field: { onChange, value }, fieldState: { error } }) => (
              <>
                <TextField
                  className={`${classes.buyDileveryInput} ${
                    error ? classes.require : ""
                  }`}
                  onChange={onChange}
                  value={value}
                  error={!!error}
                  label="Отчество"
                  variant="outlined"
                  size="small"
                  type="text"
                />
              </>
            )}
          />
        </div>
        <div className={classes.buyDileveryInputItem}>
          <Controller
            name="phone"
            control={control}
            defaultValue=""
            render={({ field: { onChange }, fieldState: { error } }) => (
              <>
                <TextField
                  className={`${classes.buyDileveryInput} ${
                    error ? classes.require : ""
                  }`}
                  onChange={(e) =>
                    onChange(PhoneMask(e, phoneValue, setPhoneValue))
                  }
                  value={phoneValue}
                  error={!!error}
                  label="+7 (_ _ _) _ _ _ - _ _ - _ _"
                  variant="outlined"
                  size="small"
                  type="tel"
                />
                <p
                  className={classes.buyDileveryInputDesc}
                  style={{ color: error ? "#f44336" : null }}
                >
                  {error
                    ? error.message
                    : "На указанный номер телефона будут приходить SMS сообщения о статусе доставки и оплаты"}
                </p>
              </>
            )}
            rules={{ required: "Введите номер телефона", minLength: 11 }}
          />
        </div>
        <div className={classes.buyDileveryInputItem}>
          <Controller
            name="email"
            control={control}
            defaultValue=""
            render={({ field: { onChange, value }, fieldState: { error } }) => (
              <>
                <TextField
                  className={`${classes.buyDileveryInput} ${
                    error ? classes.require : ""
                  }`}
                  onChange={onChange}
                  autoComplete="email"
                  value={value}
                  error={!!error}
                  label="Почта"
                  variant="outlined"
                  size="small"
                  type="email"
                />
                <p
                  className={classes.buyDileveryInputDesc}
                  style={{ color: error ? "#f44336" : null }}
                >
                  {error ? error.message : "На этот адрес придёт чек"}
                </p>
              </>
            )}
            rules={{ required: "Введите email" }}
          />
        </div>
      </div>
      {courier ? (
        <>
          <h3 className={`${classes.buyDileveryInputTitel} ${classes.mt24}`}>
            Адрес доставки для курьера
          </h3>
          <div className={classes.buyDileveryInputBox}>
            <div className={classes.buyDileveryInputItem}>
              <Controller
                name="street"
                control={control}
                defaultValue=""
                render={({
                  field: { onChange, value },
                  fieldState: { error },
                }) => (
                  <>
                    <TextField
                      className={`${classes.buyDileveryInput} ${
                        error ? classes.require : ""
                      }`}
                      onChange={onChange}
                      value={value}
                      error={!!error}
                      label="Улица"
                      variant="outlined"
                      size="small"
                      type="text"
                    />
                    <p
                      className={classes.buyDileveryInputDesc}
                      style={{ color: error ? "#f44336" : null }}
                    >
                      {error ? error.message : ""}
                    </p>
                  </>
                )}
                rules={{ required: "Введите улицу" }}
              />
            </div>
            <div className={classes.buyDileveryInputItem}>
              <Controller
                name="houseNumber"
                control={control}
                defaultValue=""
                render={({
                  field: { onChange, value },
                  fieldState: { error },
                }) => (
                  <>
                    <TextField
                      className={`${classes.buyDileveryInput} ${
                        error ? classes.require : ""
                      }`}
                      onChange={onChange}
                      value={value}
                      error={!!error}
                      label="Номер дома"
                      variant="outlined"
                      size="small"
                      type="text"
                    />
                    <p
                      className={classes.buyDileveryInputDesc}
                      style={{ color: error ? "#f44336" : null }}
                    >
                      {error ? error.message : ""}
                    </p>
                  </>
                )}
                rules={{ required: "Введите номер дома" }}
              />
            </div>
            <div className={classes.buyDileveryInputItem}>
              <Controller
                name="apartmentNumber"
                control={control}
                defaultValue=""
                render={({
                  field: { onChange, value },
                  fieldState: { error },
                }) => (
                  <>
                    <TextField
                      className={`${classes.buyDileveryInput} ${
                        error ? classes.require : ""
                      }`}
                      onChange={onChange}
                      value={value}
                      error={!!error}
                      label="Квартира/Офис"
                      variant="outlined"
                      size="small"
                      type="text"
                    />
                  </>
                )}
              />
            </div>
          </div>
        </>
      ) : null}
    </>
  );
};

export default DeliveryBuyerForm;
