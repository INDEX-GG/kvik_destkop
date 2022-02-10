import React, {useState, useEffect} from "react";
import EmptyPlaceholder from "../../../EmptyPlaceholder";
import {Checkbox} from "@material-ui/core";
import OfferFavorite from "../card/offerFavorite";
import {useStore} from "../../../../lib/Context/Store";
import {checkArray} from '../../../../lib/services'
import {makeStyles} from "@material-ui/styles";
import FiberManualRecordOutlinedIcon from '@material-ui/icons/FiberManualRecordOutlined';
import FiberManualRecordSharpIcon from '@material-ui/icons/FiberManualRecordSharp';
import FavoritesOffersPlaceHolder from "../../../placeHolders/FavoritesPlaceHolder/FavoritesActiveOfffer/FavoritesOffersPlaceHolder";


const useStyles = makeStyles(() => ({
    delete: {
        fontSize: "16px !important",
    },
    deleteActiv: {
        color: "black",
    }
}));

/**
 * @callback GetChildCheck
 * @param {{ isChecked: boolean, id: string }} childCheck
 * @returns {void}
 */

/**
 * @typedef ItemPost
 * @property {number} active
 * @property {{ fields: string }} add_fields
 * @property {string} address
 * @property {boolean} archived
 * @property {boolean} archived_manually
 * @property {string} archived_time
 * @property {string} category_id
 * @property {string} city
 * @property {string} comment
 * @property {boolean} commercial
 * @property {string} communication JSON { phone: boolean, message: boolean }
 * @property {string} condition booleanString
 * @property {[number, number]} coordinates
 * @property {number} country_code
 * @property {string} created_at
 * @property {string} date_start_commercial
 * @property {string} date_stop_commercial
 * @property {string} date_verify
 * @property {string} deleted_at
 * @property {boolean} delivery
 * @property {string} description
 * @property {boolean} draft
 * @property {null} email
 * @property {null} email_token
 * @property {number} featured
 * @property {number} id
 * @property {number} lat
 * @property {number} lon
 * @property {null} old_price
 * @property {null} phone
 * @property {boolean} phone_hidden
 * @property {null} phone_token
 * @property {string} photo JSON { photos: string[] }
 * @property {null} post_type_id
 * @property {number} price
 * @property {number} rating
 * @property {number} reviewed
 * @property {boolean} secure_transaction
 * @property {string} slug"
 * @property {string} subcategory
 * @property {null} tags
 * @property {string} title
 * @property {null} tmp_token
 * @property {boolean} trade
 * @property {string} updated_at
 * @property {boolean} user_blocked: false
 * @property {number} user_id
 * @property {string} user_name
 * @property {null} user_photo
 * @property {number} verify
 * @property {{ verify: [] }} verify_moderator
 * @property {null} video
 * @property {string} viewing JSON {[]}
 * @property {number} visits
 */

/**
 * @typedef IOfferData
 * @property {ItemPost[]} itemsPost
 */

/**
 * @param {IOfferData} data
 */
function Offers(data) {
    const classes = useStyles();
    const [favPosts, changeFavPosts] = useState(data.itemsPost);
    const [deletionCheck, setDeletionCheck] = useState(false);
    const [deleteButton, setDeleteButton] = useState(false);
		/**
		 * @type[number[], React.Dispatch < React.SetStateAction < number[] >>]
		 */
    const [deletedPostIDs, setDeletedPostIDs] = useState([]);
    const {userInfo, setLikeCommentArray} = useStore();

		/**
		 * @type {GetChildCheck }
		 */
    const getChildCheck = (childCheck) => {
			setDeletedPostIDs(
				childCheck.isChecked
					? prev => [...prev, childCheck.id]
					: dataCheck => dataCheck.filter(item => item !== childCheck.id)
			);
    }

		/**
		 * @param {[]} likeID
		 * @return {UserFavorite[]}
		 */
    const getUserFavorites = (likeID) => {
			const favoritesArray = [];
			likeID.map((items) => {
					let comment = checkArray(userInfo?.favorites) && (userInfo.favorites.filter(item => item.post_id === +items)[0])?.comment !== undefined ? (userInfo?.favorites.filter(item => item.post_id === +items)[0])?.comment : ''
					let like = checkArray(userInfo?.favorites) && userInfo.favorites.filter(item => item.post_id === +items).map(item => item.condition).join() === 'false'
					favoritesArray.push({
							post_id: `${items}`,
							comment: `${comment}`,
							condition: `${like}`,
					})
			})
			setLikeCommentArray(favoritesArray);
			return favoritesArray;
    }

	/**
	 * @param {React.ChangeEvent<HTMLInputElement>} event
	 */
	const handlerDeletionCheckbox = (event) => {
		setDeletionCheck(!deletionCheck);
		if (!event.target.checked) {
			setDeletedPostIDs(() => [])
		}
	}

	const handlerPostDelete = () => {
		if (deletedPostIDs.length) {
			const favs = getUserFavorites(deletedPostIDs);

			const nonDeletedPosts = favPosts.filter((postItem) => {
				const isDeleted = deletedPostIDs.includes(postItem.id) && favs.includes(String(postItem));

				return isDeleted
			})
			setDeletedPostIDs([]);
			changeFavPosts(() => nonDeletedPosts);
			setDeletionCheck(false);
			setDeleteButton(!deleteButton)
		}
	}

    useEffect(() => {
				if (!deletedPostIDs.length) {
					return;
				}

				if (favPosts.length === deletedPostIDs.length) {
					setDeletionCheck(true)
				} else {
					setDeletionCheck(false)
				}
			},
			[deletedPostIDs]
		)

    if (!favPosts?.length) {
        return (
            <>
                {!userInfo && !favPosts ? <FavoritesOffersPlaceHolder/> :
                    <EmptyPlaceholder
                        title='Здесь будут ваши избранные объявления'
                        subtitle='Нажмите на  сердечко 💙️, чтобы добавить объявление в избранное'
                        img='/accountImage/OffersNone.png'
                        imgAlt='offers_placholder'
                    />
                }
            </>
        );
    }

    return (

        <>
            {!userInfo && !favPosts ? <FavoritesOffersPlaceHolder/>
                : <div className="clientPage__container_bottom">
                    <div className="clientPage__container_nav__radio">
                        <Checkbox
                            color="primary"
                            onChange={handlerDeletionCheckbox}
                            checked={deletionCheck}
                            icon={<FiberManualRecordOutlinedIcon/>}
                            checkedIcon={<FiberManualRecordSharpIcon/>}
                        />
                        <a
                            onClick={handlerPostDelete}
                            style={deletedPostIDs.length > 0 ? {color: "black"} : null}
                            className={classes.delete}
                        >
                            Удалить выбранные
                        </a>
                    </div>
                    <div className="clientPage__container_content">
                        <div className="favoritesContainerWrapper">
                            {favPosts.map((offer, index) =>
                                <OfferFavorite
                                    offer={offer}
                                    key={index}
                                    index={index}
                                    parentCheck={deletionCheck}
                                    getChildCheck={getChildCheck}
                                    dataCheck={deletedPostIDs}
                                    deleteButton={deleteButton}
                                />
                            )}
                        </div>
                    </div>
                </div>}
        </>

    );
}

export default Offers;
