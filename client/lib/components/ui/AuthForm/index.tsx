import { useSession } from '@/lib/hooks';
import { Spacer, Input, Button, Text, Grid, Collapse } from '@nextui-org/react';
import axios from 'axios';
import { FC, useState } from 'react';
import { useForm } from 'react-hook-form';

interface FormData {
  email: string;
  password: string;
}

interface Props {
  type: 'login' | 'signup';
}

const AuthForm: FC<Props> = ({ type }) => {
  const [responseError, setResponseError] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const {
    handleSubmit,
    register,
    setError,
    clearErrors,
    formState: { errors },
  } = useForm<FormData>();

  const { signup, login } = useSession();

  const onSubmit = async () => {
    setResponseError('');
    try {
      if (type === 'login') await login(email, password);
      if (type === 'signup') await signup(email, password);
    } catch (err: any) {
      if (axios.isAxiosError(err)) {
        const errors = err.response?.data.errors;
        console.log(err.response?.data);
        for (const error of errors) {
          if (error.field) {
            setError(error.field, { type: 'string', message: error.message });
          } else {
            setResponseError(error.message);
          }
        }
      }
    }
  };

  return (
    <Grid.Container justify='center' alignItems='center'>
      <Grid>
        <form
          onSubmit={handleSubmit(onSubmit)}
          noValidate
          style={{ width: '100%' }}
        >
          <Text h1>{type === 'login' ? 'Log in' : 'Sign up'}</Text>
          <Spacer y={1.5} />
          <Input
            {...register('email', {
              required: 'Email is required',
            })}
            size='md'
            fullWidth
            value={email}
            label='Email'
            placeholder='your-email@test.com'
            type='email'
            helperColor={errors.email ? 'error' : 'success'}
            helperText={errors.email?.message}
            onChange={(e) => {
              setEmail(e.target.value);
              if (errors.email) clearErrors('email');
            }}
          />
          <Spacer y={0.5} />
          <Input.Password
            {...register('password', {
              required: 'Password is required',
            })}
            helperColor={errors.password ? 'error' : 'success'}
            helperText={errors.password?.message}
            value={password}
            label='Password'
            fullWidth
            placeholder='password'
            onChange={(e) => {
              setPassword(e.target.value);
              if (errors.password) clearErrors('password');
            }}
          />
          <Spacer y={1.5} />
          <Button
            type='submit'
            bordered
            color='gradient'
            css={{ width: '100%' }}
          >
            {type === 'login' ? 'Log in' : 'Sign up'}
          </Button>
          <Spacer y={0.5} />
          {responseError && (
            <Text h4 color='error'>
              {responseError}
            </Text>
          )}
        </form>
      </Grid>
    </Grid.Container>
  );
};

export default AuthForm;
