import {makeStyles} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  card__bottom: {
    padding: '2px 12px 12px',
  },
  card__bottomSeen: {

  },
  card__noBorder: {
    border: 'none',
  },
  card__borderYellow: {
    // border: '1px solid #00A0AB',
    // borderTop: 'none',
    // borderRadius: '0px 0px 8px 8px',
  },
  card__border2Yellow: {
    // border: '2px solid #00A0AB',
    // borderRadius: '0px 0px 8px 8px',
    // borderTop: 'none',
  },
  card__bottom_info_right: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  card__bottom_info_left: {

  },
  card__bottom_info: {
    marginBottom: '6px',
  },
  new__price: {
    fontSize: '22px',
    color: '#2c2c2c',
    fontWeight: '700',
  },
  new__priceV2: {
    display: 'block',
    marginTop: '12px',
    fontSize: '18px',
    color: '#2c2c2c',
    fontWeight: '700',
  },
  info_middle: {
    fontSize: '14px',
    color: '#2c2c2c',
    fontWeight: '500',
    marginBottom: '10px',
  },
  info_middleV2: {
    marginTop: '14px',
    marginBottom: '33px',
    fontSize: '16px',
    fontWeight: '500',
  },
  card__bottom_info_footer: {
    fontSize: '12px',
    fontWeight: '400',
    color: '#8f8f8f',
  },
  card__bottom_info_footer_left: {
    overflow: 'hidden',
    whiteSpace: 'nowrap',
    textOverflow: 'ellipsis',
  },
  card__bottom_info_footer_leftV2: {
    overflow: 'hidden',
    whiteSpace: 'nowrap',
    textOverflow: 'ellipsis',
    fontSize: '12px',
  },
  card__bottom_info_footer_right: {

  },
  card__bottom_info_footer_rightV2: {
    fontSize: '12px',
  },
}));

export const useAdCardBottomStyles = () => useStyles();
