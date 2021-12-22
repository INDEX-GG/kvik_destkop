import { useMedia } from "../../../../../hooks/useMedia"
import { PersonalDataDesktop } from "./desktop";
import { PersonalDataMobile } from "./mobile";

export const PersonalData = () => {
	const { matchesCustom1024 } = useMedia();

	if (matchesCustom1024) {
		return <PersonalDataDesktop />
	}

	return (<PersonalDataMobile />)
}