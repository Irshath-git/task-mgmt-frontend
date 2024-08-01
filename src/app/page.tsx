import type { AppProps } from 'next/app';

import PagePlaceholder from '@/components/page-placeholder';

export function Page({ Component, pageProps }: AppProps) {
  return <PagePlaceholder pageName="Page" {...pageProps} />;
}
