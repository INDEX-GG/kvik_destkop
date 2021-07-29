import { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth } from '../lib/Context/AuthCTX';

export function useUser() {
	const { id } = useAuth();
   const [userInfo, setUserInfo] = useState({}),
   [isLoading, setLoading] = useState(true);

  useEffect(() => {
	const getUser = async() => {
		const data = await axios.post('/api/getUser', {id: id})
		.then(r => r.data.user)
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