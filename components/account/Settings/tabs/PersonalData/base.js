import { useMedia } from "../../../../../hooks/useMedia"
import { useStore } from "../../../../lib/Context/Store";
import { useAuth } from "../../../../lib/Context/AuthCTX";
import { PersonalDataDesktop } from "./desktop";
import { PersonalDataMobile } from "./mobile";

export const PersonalData = () => {
	const { isAuth, id: userID, token } = useAuth();
	// eslint-disable-next-line no-unused-vars
	const { userInfo, setUserInfo } = useStore();
	const { matchesCustom1024 } = useMedia();

	if (matchesCustom1024) {
		return <PersonalDataDesktop />
	}

	return (<PersonalDataMobile />)
}