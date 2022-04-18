import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles(() => ({
  avatar: {
    minWidth: "80px",
    minHeight: "80px",
    cursor: "pointer",
  },
}));

export const useCustomAvatarUIStyles = () => useStyles();
