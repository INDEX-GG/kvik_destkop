import React from 'react';
import { Button } from "@material-ui/core"
import AddRoundedIcon from "@material-ui/icons/AddRounded";
import { useRouter } from "next/router";

function Placeholder() {
   const router = useRouter()
   return (
      <div className="clientPage__container_bottom">
         <div className="clientPage__container_content">
            <div className="phOffers">
               <div className="phTitle dark">
                  Сюда будут попадать все ваши объявления
               </div>
               <div className="phContent">
                  <div className="phCard">
                     <div className="phCardPhoto"></div>
                     <div className="phCardTitle"></div>
                     <div className="phCardSubtitle"></div>
                  </div>
                  <div className="phCard">
                     <div className="phCardPhoto"></div>
                     <div className="phCardTitle"></div>
                     <div className="phCardSubtitle"></div>
                  </div>
                  <div className="phCard">
                     <div className="phCardPhoto"></div>
                     <div className="phCardTitle"></div>
                     <div className="phCardSubtitle"></div>
                  </div>
               </div>

               <Button className="phButton plusButton" onClick={() => router.push("/placeOffer")} variant="contained" color="primary">
                  <AddRoundedIcon />
                  Подать объявление
               </Button>
            </div>
         </div>
      </div>
   )
}
export default Placeholder;
