import Head from 'next/head'
import Container from '@mui/material/Container';

import Main from '@components/main'
import Header from '@components/ui/header'

export default function Home() {
  return (
    <>
      <Head>
        <title>SDK Intro</title>
        <meta name="description" content="Mentaport SDK Intro" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Container maxWidth={false} disableGutters >
      <Header />
     <Main />
     </Container>
    </>
  )
}
