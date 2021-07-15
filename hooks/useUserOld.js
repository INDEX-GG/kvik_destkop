import { useContext } from 'react';
import useSWR from 'swr';
import { useEffect, useState } from 'react';
import axios from 'axios';

export function useUser() {
	const { data: user, mutate: mutateUser } = useSWR('/api/user');
	const [userInfo, setUserInfo] = useState({}),
    [isLoading, setLoading] = useState(true),
	[isAuth, setIsAuth] = useState(false),
	[id, setId] = useState('');
  useEffect(() => {
	const getUser = async() => {
		const userData = await axios.post('/api/getUser', user)
		.then(r => r.data?.user);
		setUserInfo(userData);
		setIsAuth(true);
		setLoading(false);
		setId(user.id);
	}
	getUser();
        
  }, [user])

  return {
    isAuth,
	isLoading,
	id,
	...userInfo,
    mutateUser
  }
}
