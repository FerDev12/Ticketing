import { useSession } from '@/lib/hooks';
import {
  Avatar,
  Button,
  Navbar,
  Spacer,
  Switch,
  Text,
  useTheme,
} from '@nextui-org/react';
import axios from 'axios';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useTheme as useNextTheme } from 'next-themes';

const CustomNavbar = () => {
  const router = useRouter();
  const { logout, session } = useSession();
  const { setTheme } = useNextTheme();
  const { isDark } = useTheme();

  return (
    <Navbar variant='floating' isBordered>
      <Navbar.Brand>
        <Navbar.Toggle />

        <Spacer x={1} />
        <Link href='/'>
          <Text
            h1
            size={20}
            css={{
              textGradient: '45deg, $blue600 -20%, $pink600 50%',
              fontStyle: 'italic',
            }}
            weight='bold'
          >
            {'</>'} WebAdvice
          </Text>
        </Link>
      </Navbar.Brand>

      <Navbar.Content>
        <Navbar.Item>
          <Switch
            color='secondary'
            checked={isDark}
            onChange={() => setTheme(isDark ? 'light' : 'dark')}
          />
        </Navbar.Item>

        {!session && (
          <>
            <Navbar.Item>
              <Button
                size='xs'
                ghost
                color='primary'
                onPress={() => router.push('/auth/login')}
              >
                Login
              </Button>
            </Navbar.Item>
            <Navbar.Item>
              <Button
                size='xs'
                ghost
                color='secondary'
                onPress={() => router.push('/auth/signup')}
              >
                Signup
              </Button>
            </Navbar.Item>
          </>
        )}

        {session && (
          <>
            <Navbar.Item>
              <Avatar
                text={session.email.split('@')[0]}
                color='gradient'
                bordered
              />
            </Navbar.Item>
            <Navbar.Item>
              <Button size='xs' ghost color='warning' onPress={() => logout()}>
                Logout
              </Button>
            </Navbar.Item>
          </>
        )}
      </Navbar.Content>
    </Navbar>
  );
};

export default CustomNavbar;
