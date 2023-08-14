import Head from 'next/head';

interface SEOProps {
  title?: string;
  description?: string;
}

export function SEO(props: SEOProps) {
  const { title = 'Multi step form', description } = props;
  return (
    <Head>
      <meta charSet='utf-8' />
      <meta name='theme-color' content='#6366f1' />
      <meta name='google' content='nositelinkssearchbox' />
      <title>{title}</title>
      <meta name='description' content={description} />
      <meta name='robots' content='noindex' />
      <meta property='og:locale' content='en_IN' />
      <meta property='og:url' content='/' />
      <meta property='og:type' content='website' />
      <meta property='og:site_name' content='Multi step from' />
      <meta
        property='og:description'
        content='Multi step from using nextjs server side feature with email verification'
      />
      <meta property='og:title' content='Multi step from' />
    </Head>
  );
}
