import { Inter } from '@next/font/google';
import { Text } from '@nextui-org/react';
import { PageLayout } from '@/lib/components/layouts';

const inter = Inter({ subsets: ['latin'] });

export default function Home() {
  return (
    <PageLayout>
      <Text
        h1
        size={60}
        css={{
          textGradient: '45deg, $yellow600 -20%, $red600 100%',
        }}
        weight='bold'
      ></Text>
    </PageLayout>
  );
}
