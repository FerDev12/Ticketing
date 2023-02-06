import { NextRequest } from 'next/server';

export const getServerSideSession = async (req: NextRequest) => {
  const session = req.cookies.get('session');

  if (!session) return;

  try {
    const res = await fetch(
      'http://ingress-nginx-controller.ingress-nginx.svc.cluster.local/api/users/currentuser',
      { headers: req.headers }
    );

    if (!res.ok) return;

    const user = await res.json();

    if (JSON.stringify(user) === '{}') return;

    return user;
  } catch (err: any) {
    console.log(err);
    return;
  }
};
