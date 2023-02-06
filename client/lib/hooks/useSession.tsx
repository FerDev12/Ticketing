import axios from 'axios';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import useSWR from 'swr';

const fetcher = (url: string) => axios.get(url).then((res) => res.data);

interface Session {
  id: string;
  email: string;
  iat: string;
}

const useSession = () => {
  const [session, setSession] = useState<Session | null>(null);
  const router = useRouter();

  const { data, error } = useSWR<Session | null>(
    '/api/users/currentuser',
    fetcher
  );

  useEffect(() => {
    if (data) {
      setSession(data);
    }
  }, [data]);

  const login = async (
    email: string,
    password: string,
    callbackUrl = '/',
    disableCallback = false
  ) => {
    await axios.post('/api/users/signin', { email, password });

    if (disableCallback) return;

    router.replace(callbackUrl);
  };

  const signup = async (
    email: string,
    password: string,
    callbackUrl = '/',
    disableCallback = false
  ) => {
    await axios.post('/api/users/signup', { email, password });

    if (disableCallback) return;

    router.replace(callbackUrl);
  };

  const logout = async () => {
    await axios.post('/api/users/signout');
    router.reload();
  };

  return {
    session: error ? null : JSON.stringify(session) === '{}' ? null : session,
    signup,
    login,
    logout,
  };
};

export default useSession;
