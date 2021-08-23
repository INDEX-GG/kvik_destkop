import { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth } from '../lib/Context/AuthCTX';
import { STATIC_URL } from '../lib/constants';

export function useUser() {
   const { id } = useAuth();
   const [userInfo, setUserInfo] = useState({}),
   [isLoading, setLoading] = useState(true);

  useEffect(() => {
	const getUser = async() => {
		let data = await axios.post('/api/getUser', {id: id})
		.then(r => r.data.user)
		.catch(e => console.error(e));
/* 		data = {...data, userPhoto: `${STATIC_URL}/${data.userPhoto}`};
		setUserInfo(data);
		setLoading(false); */
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