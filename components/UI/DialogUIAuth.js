import { Dialog, makeStyles } from "@material-ui/core";
import { useMedia } from "../../hooks/useMedia";

const useStyles = makeStyles((theme) => ({
  wrapper: {
    padding: "8px 12px",
    width: 600,
    [theme.breakpoints.down(960)]: {
      width: "100%",
      padding: 0,
    },
  },
  modalTop: {
    margin: 0,
    color: "#2c2c2c",
    fontWeight: 500,
    fontSize: 18,
    position: "relative",
  },
  titleWrap: {
    padding: "16px 0px 16px",
    textAlign: "center",
    boxShadow: "0px 0px 20px rgba(0, 0, 0, 0.1)",
    marginBottom: 24,
    [theme.breakpoints.down(400)]: {
      "& > h6": {
        fontSize: "14px",
      },
    },
    [theme.breakpoints.up(960)]: {},
  },
  subTitle: {
    fontSize: 14,
    color: "#8f8f8f",
  },
  paragraphTitle: {
    color: "#2C2C2C",
    fontSize: "18px",
    fontWeight: "500",
    borderBottom: "1px solid #E9E9E9",
    paddingBottom: "10px",
    marginBottom: "12px",
  },
  title: {
    fontSize: 18,
  },
}));

/**
 * @param {object} props
 * @param {() => void} props.onClose
 * @param {string} props.title
 * @param {any} props.children
 * @param {boolean} props.open
 * @param {boolean} [props.subTitle]
 * @param {string} [props.maxWidth]
 * @param {boolean} [props.fullWidth]
 * @param {Partial<ClassNameMap<DialogClassKey>>} [props.extraClasses] Аттрибут `classes` диалога.
 */
const DialogUIAuth = ({
  onClose,
  title,
  children,
  open,
  subTitle = false,
  maxWidth = false,
  fullWidth = false,
	extraClasses = undefined
}) => {
  const { matchesMobile, matchesTablet } = useMedia();
  const mobile = matchesMobile || matchesTablet;
  const classes = useStyles();

  return (
    <Dialog
      fullScreen={mobile}
      open={open}
      onClose={() => onClose()}
      maxWidth={maxWidth}
      fullWidth={fullWidth}
			classes={extraClasses}
    >
      <div className={classes.wrapper}>
        {mobile && (
          <div className={classes.modalTop}>
            <div
              className="accountArrowLeft"
              onClick={() => onClose()}
              style={{
                top: subTitle ? 10 : null,
              }}
            />

            <div
              className={mobile ? classes.titleWrap : classes.paragraphTitle}
            >
              <h6 className={classes.title}>{title}</h6>
              {subTitle && <p className={classes.subTitle}>{subTitle}</p>}
            </div>
          </div>
        )}
        {children}
      </div>
    </Dialog>
  );
};

export default DialogUIAuth;
