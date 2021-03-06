import React, { useEffect, useState } from "react";
// import EmptyPlaceholder from "../../../EmptyPlaceholder";
import OfferWaitPlaceHolder from "../../../placeHolders/OfferPlaceHolder/OfferWaitPlaceHolder/OfferWaitPlaceHolder";
import Placeholder from "../../../User/tabs/Placeholder";
import { useOfferAccount } from "../../../../lib/Context/OfferAccountCTX";
import OfferCard from "../card/OfferCard";
import OfferModal from "../../../OfferModal";
import { Checkbox, makeStyles, Dialog } from "@material-ui/core";
import FiberManualRecordOutlinedIcon from '@material-ui/icons/FiberManualRecordOutlined';
import FiberManualRecordSharpIcon from '@material-ui/icons/FiberManualRecordSharp';

const useStyles = makeStyles((theme) => ({
	check: {
		padding: "0px",
		background: theme.palette.secondary.main,
		width: "14px",
		height: "14px",

		"&:hover": {
			background: theme.palette.secondary.main,
		},
	},
	btn__delete: {
		marginLeft: "12px",
		background: "none",
		color: theme.palette.grey[200],
		cursor: "pointer",
		transition: "all 200ms ease-in-out",

		"&:hover": {
			transition: "all 200ms ease-in-out",
			textDecoration: "underline",
		},
	},
	btn__publish: {
		marginLeft: "12px",
		background: "none",
		color: theme.palette.grey[200],
		cursor: "pointer",
		transition: "all 200ms ease-in-out",

		"&:hover": {
			transition: "all 200ms ease-in-out",
			textDecoration: "underline",
		},
	},
	archive: {
		display: "flex",
		justifyContent: "center",
	},
	text: {
		fontSize: "18px"
	},
}));

function Wait({offers}) {
	const classes = useStyles();
  const { page, setPage, totalPosts, page_limit } = useOfferAccount()
  const [isFirstRender, setIsFirstRender] = useState(true)
  const [check, setCheck] = useState(false);
  const [offerId, setOfferId] = useState([])
	const [openOfferModal, setOpenOfferModal] = useState(false);
	const [offerData, setOfferData] = useState([]);
	const [buttonId, setButtonId] = useState('');
	const offersLength = offers.length

	const cleanAll = () =>  {
		setCheck(false);
		setOfferId([]);
		setOfferData([]);
	}

	function getChildCheck ({id, isCheck}) {
		setOfferId( isCheck ? prev => [...prev, id] : prev => prev.filter( item => item !== id) );
		setOfferData( isCheck ? prev => [...prev, offers.filter( item => item.id === id )[0]] : prev => prev.filter( item => item.id !== id) );
	}

	useEffect(() => {
		offerId.length === offers.length
      ? check
        ? null
        : setCheck(false)
      : check===false
        ? null
        : setCheck(true);
	}, [offerId])

  // ?????????????????? ???????????? ?????????????????? ????????????, ?????? ???????????? ?????????????? ??.??. ???????????? ?????? ???? ????????????.
  useEffect(()=> {
		if(isFirstRender) {
			setIsFirstRender(false)
			return
		}
        document.addEventListener('scroll', scrollHandler )
        return ()=>{
            document.removeEventListener('scroll', scrollHandler )
        }
    }, [totalPosts, isFirstRender] )

  // pageNumber - ???????????????????? ?????? ???????????????????? ????????????????. (?????????????? ????-???? ????????, ?????? ?????? ?????????????? scrollHandler page ???????????? ?????????? ?????????????? ????????????????)
	let pageNumber = page
	function scrollHandler (e) {
    // ?????????????????????? ???????????? ?????????????? ?????????? ?????????????? ?? ?????????? ????????????????
		const pixelsFromBottom = (e.target.documentElement.scrollHeight - e.target.documentElement.scrollTop)-window.innerHeight;
		const maxPossiblePage = Math.ceil(totalPosts.wait / page_limit);
		if(maxPossiblePage <= pageNumber && !isFirstRender) {
			return
		}
		// ???????? ?????????????????? ???????????? ?????? ????????????, ?????????????????? ???????????????? ?????? ?????????????????? ??????????????.
		if(pixelsFromBottom <= 200){
			setPage(pageNumber + 1)
			pageNumber += 1
		}
	}

  	/* ?????????????????? ???????? */
	function pushCheck(e) {
		setButtonId(e.target.id)
		setOpenOfferModal(!openOfferModal);
	}

  if (offers.length === 0) {
    return (
     <>
       {!offers ? <OfferWaitPlaceHolder/> :<Placeholder />}
     </>
    );
  }

  return (
      <>
        {!offers
        ? <OfferWaitPlaceHolder/>
        :
        <div className="clientPage__container_bottom">
          {offers.length > 1 && <div className="clientPage__container_nav__radio">
              <Checkbox
                className={classes.check}
                color="primary"
                value=""
                icon={<FiberManualRecordOutlinedIcon/>}
                checkedIcon={<FiberManualRecordSharpIcon/>}
                onChange={(e) => {
									e.target.checked === false ? cleanAll() : setCheck(e.target.checked);
								}}
                checked={check}
              />
              <button id='002' className={classes.btn__delete} onClick={(e) => {
                offerData.length > 0 ? pushCheck(e) : null
              }}>
                ??????????????
              </button>
            </div>
          }
          <div className="clientPage__container_content">
            {offers.map((offer) => (
                <OfferCard
                    key={offer.id}
                    offer={offer}
                    typeTab='waitTab'
                    typeButton={'002'}
                    parentCheck={check}
                    getChildCheck={getChildCheck}
                    parentUnpublishForm={openOfferModal}
                    allDataCheck={offerId}
                    offersLength={offersLength}
                />
            ))}
          </div>
          </div>
        }
        <Dialog open={openOfferModal} onClose={() => setOpenOfferModal(!openOfferModal)} fullWidth maxWidth="md">
				<OfferModal
					offerId={offerId}
					offerData={offerData}
					openOfferModal={openOfferModal}
					setOpenOfferModal={setOpenOfferModal}
					buttonId={buttonId}
					cleanAll={cleanAll}
				/>
			</Dialog>
      </>
  );
}
export default React.memo(Wait);
