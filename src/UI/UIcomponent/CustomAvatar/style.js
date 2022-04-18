import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles(() => ({
  avatar: {
    width: "56px",
    weight: "56px",
    cursor: "pointer",
  },
}));

export const useCustomAvatarUIStyles = () => useStyles();
