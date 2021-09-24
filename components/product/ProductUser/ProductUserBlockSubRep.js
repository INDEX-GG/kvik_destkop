import React, {useEffect, useState} from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText } from "@material-ui/core";
import { standartDate } from "../../../lib/services";
import axios from 'axios';
import { useSubBool } from '../../../hooks/useSubscriptions';


const ProductUserBlockSubRep = ({id, sellerId, mobile}) => {
  const [blockOpen, setBlockOpen] = useState(false)
	const { userSub } = useSubBool(id, sellerId)
  const [userBool, setUserBool] = useState(false)
  const [loading, setLoading] = useState(false)

	useEffect(() => {
    setUserBool(userSub)
  }, [userSub])

	async function subscribeUser() {
    if (id != undefined && sellerId != undefined) {
			setLoading(true)

			const subscribe = {
				user_id: id + "",
				seller_id: sellerId + ""
			}
		
		
			await axios.post("/api/subscriptions", subscribe)
			.then(res => console.log(res.data))
			.catch(error => console.log(error))
			
			await axios.post('/api/subscribers', {user_id: '' + sellerId, subscriber_id: '' + id});
			
			
			setLoading(false)
			setUserBool(!userBool)
		}
    

  }

	const blockUser = () => {
    const userBlockInfo = {
      id: sellerId,
      date: standartDate(Date.now())
    }
    console.log(userBlockInfo);
  }

	return (
		id == sellerId ? null : 
		<>
		<div className="ad__block_bottom__adaptive">
			{mobile && (
				<button className={`ad__block_bottom__adaptive_left ${userBool ? 'ad__block_bottom__adaptive_left__active' : ''}`} disabled={loading} onClick={() => subscribeUser()}>
					<span className={`SellerInfoUserAdd ${userBool ? "SellerInfoUserAdd__active" : ''}`}></span>{userBool ? "Отписаться" :"Подписаться"}
				</button>
			)}
			<div className="ad__block_bottom__adaptive_right">
				<a className="SellerInfoShutUp small light underline" onClick={() => setBlockOpen(true)}>Заблокировать пользователя</a>
				<a className="SellerInfoComplain small light underline">Пожаловаться</a>
			</div>
		</div>
		<Dialog open={blockOpen} onClose={() => setBlockOpen(false)}>
          <DialogContent>
            <DialogContentText>
                Вы уверены, что хотите заблокировать пользователя?
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => blockUser()}>Заблокировать</Button>
            <Button onClick={() => setBlockOpen(false)}>Отмена</Button>
        </DialogActions>
      </Dialog>
		</>
	)
}

export default ProductUserBlockSubRep;
