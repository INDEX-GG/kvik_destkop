import React from 'react'
import {Box} from "@material-ui/core";
import Link from "next/link";

import { ellipsis, ToRusDate, ToRubles } from "#lib/services";

const AdCardBottom = ({offer_id, offer_address, offer_created_at, price, commercial, secure_transaction, title, delivery, screenIsMobile}) => {
  return (
    <Link href={`/product/${offer_id}`} prefetch={false}>
      <Box>
        {/* info_left */}
        <Box>
          <Box>
            {ellipsis(ToRubles(price), 15)}
          </Box>
        </Box>

        {/* info_right */}
        <Box>
          <Box>
            {!screenIsMobile && delivery ? <Box className={!commercial === 0 ? "card_delivery card_delivery-green" : "card_delivery"}/> : ''}
            {!screenIsMobile && secure_transaction ? <Box className={!commercial === 0 ? "card_secure card_secure-green" : "card_secure"}/> : ''}
          </Box>
        </Box>

        {/* info_middle */}
        <Box>
          {commercial === 2 ? ellipsis(title, 40) : ellipsis(title, 54)}
        </Box>

        {/* info_footer */}
        <Box>
          <Box>
            {offer_address}
          </Box>
          <Box>
            {ToRusDate(offer_created_at)}
          </Box>
        </Box>
      </Box>
    </Link>
  )
}

export default React.memo(AdCardBottom)
