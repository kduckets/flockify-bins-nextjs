import Head from 'next/head'
import Link from 'next/link'
import Layout from '../../components/layout'

export default function AboutBins() {
  return (
    <Layout>
      <Head>
        <title>About Flockify Bins</title>
      </Head>
      <h1>About Flockify Bins</h1>
      <h2>
        <Link href="/">
          <a>Back to bins</a>
        </Link>
      </h2>
    </Layout>
  )
}
