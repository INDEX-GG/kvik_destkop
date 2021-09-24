import { useEffect, useState } from 'react';
import { STATIC_URL } from '../lib/constants';
import { useAuth } from '../lib/Context/AuthCTX';
import { getDataByPost } from '../lib/fetch';

export function useUser() {
	const { id } = useAuth();
	const [userInfo, setUserInfo] = useState({});
	const [isLoading, setLoading] = useState(true);
	
	useEffect(() => {
		const getUser = async () => {
			let data = await getDataByPost('/api/getUser', { id: id })
				.catch(e => console.error(e));

			data = { ...data, userPhoto: `${STATIC_URL}/${data.userPhoto}` };

			setUserInfo(data);
			setLoading(false);
		}
		if (id !== undefined) {
			getUser();
		}
	}, [id])
	return {
		...userInfo,
		isLoading

	}

}
