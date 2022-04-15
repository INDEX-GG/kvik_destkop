import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles(() => ({
  avatar: {
    minWidth: "56px",
    minHeight: "56px",
    cursor: "pointer",
  },
}));

export const useCustomAvatarUIStyles = () => useStyles();
