import { useEffect, useState } from 'react';
import { useAuth } from '../lib/Context/AuthCTX';
import { getDataByPost } from '../lib/fetch';

export function useUser() {
   const { id } = useAuth();
   const [userInfo, setUserInfo] = useState({});
   const [isLoading, setLoading] = useState(true);

  useEffect(() => {
	const getUser = async() => {
		const data = await getDataByPost('/api/getUser', {id: id})
		.catch(e => console.error(e));
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