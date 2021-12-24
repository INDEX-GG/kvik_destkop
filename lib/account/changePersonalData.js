import { updateUserAddress, updateUserName } from "#lib/fetch";

/**
 * @typedef { import("#lib/fetch").UpdateUserNameArgs & import("#lib/fetch").UpdateUserAddressArgs } ChangePersonalDataArgs
 */

/**
 * @param {ChangePersonalDataArgs} args
 */
export const changePersonalData = async ({
	userID,
	userName,
	userAddress,
	token
}) => {
	let name;
	let address;

	if (userName) {
		const nameData = await updateUserName({
			userID,
			userName,
			token
		});
		

		if (!nameData) {
			return false;
		}

		name = nameData
	}

	if (userAddress) {
		const addressData = await updateUserAddress({
			userID,
			userAddress,
			token
		});

		if (!addressData) {
			return false;
		}

		address = addressData
	}

	

	return { name, address };
}