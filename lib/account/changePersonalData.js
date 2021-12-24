import { updateUserAddress, updateUserName } from "#lib/fetch";

export const changePersonalData = async () => {
	const nameData = await updateUserName();

	if (!nameData) {
		return false;
	}

	const addressData = await updateUserAddress();

	if (!addressData) {
		return false;
	}

	return true;
}