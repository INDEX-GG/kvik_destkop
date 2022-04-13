import React from "react";
import { useRouter } from "next/router";
import { useOutherUser } from "../../../../hooks/useOutherUser";
import ClientPageMenu from "../clientPageMenu/ClientPageMenu";
import UserPlaceHolder from "#components/placeHolders/UserPlaceHolder/UserPlaceHolder";

const UserContent = () => {
  const router = useRouter();
  const sellerId = parseInt(router.query.id);
  const sellerInfo = useOutherUser(sellerId);

  const { isLoading = true } = sellerInfo;
  return <>{isLoading ? <UserPlaceHolder /> : <ClientPageMenu />}</>;
};

export default React.memo(UserContent);
