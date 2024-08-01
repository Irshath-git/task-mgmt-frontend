import type { AppProps } from 'next/app';

import PagePlaceholder from '@/components/page-placeholder';

export function Home({ Component, pageProps }: AppProps) {
  return <PagePlaceholder pageName="Home" {...pageProps} />;
}
