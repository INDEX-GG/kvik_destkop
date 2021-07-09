import { makeStyles } from "@material-ui/core";

const MobileFilter = ({ number = 0 }) => {
  let right = 4.5;

  if (number >= 10) {
    right = 2.8;
  }

  const useStyles = makeStyles(() => ({
    number: {
      position: "absolute",
      top: "3.4px",
      right: `${right}px`,
      color: "#fff",
      fontSize: "9px",
    },
    test: {
      position: "absolute",
      stroke: "#fff",
    },
  }));

  const classes = useStyles();
  return (
    <>
      {number > 0 ? (
        <>
          <div className={classes.number}>{number}</div>
          <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M3 8L14 8" stroke="#00A0AB" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
            <path d="M24 8L29 8" stroke="#00A0AB" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
            <path d="M3 24L14 24" stroke="#00A0AB" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
            <path d="M24 24L29 24" stroke="#00A0AB" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
            <circle cx="19" cy="24" r="2" fill="#00A0AB" />
            <path d="M3 16L8 16" stroke="#00A0AB" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
            <path d="M18 16L29 16" stroke="#00A0AB" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
            <circle cx="13" cy="16" r="2" fill="#00A0AB" />
            <circle className={classes.test} cx="24" cy="8.5" r="7" fill="#00A0AB" />
          </svg>
        </>
      ) : (
        <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M3 8L14 8" stroke="#2C2C2C" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
          <path d="M24 8L29 8" stroke="#2C2C2C" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
          <circle cx="19" cy="8" r="2" fill="#2C2C2C" />
          <path d="M3 24L14 24" stroke="#2C2C2C" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
          <path d="M24 24L29 24" stroke="#2C2C2C" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
          <circle cx="19" cy="24" r="2" fill="#2C2C2C" />
          <path d="M3 16L8 16" stroke="#2C2C2C" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
          <path d="M18 16L29 16" stroke="#2C2C2C" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
          <circle cx="13" cy="16" r="2" fill="#2C2C2C" />
        </svg>
      )}
    </>
  );
};

export default MobileFilter;
