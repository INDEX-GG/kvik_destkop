import useSWR from 'swr';
import { useEffect, useState } from 'react';
import axios from 'axios'

export function useUser() {
  const { data: user, mutate: mutateUser } = useSWR('/api/user'),
    [username, setUsername] = useState(),
    [photo, setPhoto] = useState(),
    [about, setAbout] = useState(),
    [createdAt, setCreatedAt] = useState(),
    [phone, setPhone] = useState(),
    [email, setEmail] = useState(),
    [isLoading, setLoading] = useState(true),
    [isAuth, setAuth] = useState(false),
    [id, setId] = useState();
  useEffect(() => {
    axios.post('/api/getUser', user)
      .then((res) => {
        setAuth(user.isAuth);
        setId(user.id);
        setUsername(res.data.user.name);
        setPhoto(res.data.user.photo);
        setAbout(res.data.user.about);
        setCreatedAt(res.data.user.createdAt);
        setPhone(res.data.user.phone);
        setEmail(res.data.user.email);
        setLoading(false);
      })
  }, [user])

  return { isAuth, id, isLoading, username, photo, about, createdAt, phone, email, mutateUser }
}