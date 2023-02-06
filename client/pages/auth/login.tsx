import { NextPage } from 'next';
import { PageLayout } from '@/lib/components/layouts';
import AuthForm from '@/lib/components/ui/AuthForm';

const Login: NextPage = () => {
  return (
    <PageLayout>
      <AuthForm type='login' />
    </PageLayout>
  );
};

export default Login;
