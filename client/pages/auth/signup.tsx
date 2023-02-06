import { PageLayout } from '@/lib/components/layouts';
import AuthForm from '@/lib/components/ui/AuthForm';
import { NextPage } from 'next';

const SignUp: NextPage = () => {
  return (
    <PageLayout>
      <AuthForm type='signup' />
    </PageLayout>
  );
};

export default SignUp;
