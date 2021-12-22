import { useMedia } from "../../../../../hooks/useMedia"
import { PersonalDataDesktop } from "./desktop";
import { PersonalDataMobile } from "./mobile";

export const PersonalData = () => {
	const { matchesDesktop } = useMedia();

	if (matchesDesktop) {
		return <PersonalDataDesktop />
	}

	return (<PersonalDataMobile />)
}