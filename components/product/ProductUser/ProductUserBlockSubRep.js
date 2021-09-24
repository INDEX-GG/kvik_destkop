import React, {useState} from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText } from "@material-ui/core";
import { standartDate } from "../../../lib/services";


const ProductUserBlockSubRep = ({id, sellerdId, mobile}) => {
  const [blockOpen, setBlockOpen] = useState(false)


	const blockUser = () => {
    const userBlockInfo = {
      id: sellerdId,
      date: standartDate(Date.now())
    }
    console.log(userBlockInfo);
  }

	return (
		id == sellerdId ? null : 
		<>
		<div className="ad__block_bottom__adaptive">
			{mobile && (
				<div className="ad__block_bottom__adaptive_left">
					{" "}
					<a className="SellerInfoUserAdd"></a>Подписаться
				</div>
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
            <Button onClick={() => blockUser()}>Да</Button>
            <Button onClick={() => setBlockOpen(false)}>Нет</Button>
        </DialogActions>
      </Dialog>
		</>
	)
}

export default ProductUserBlockSubRep;
