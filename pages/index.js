import Head from 'next/head';
import OsmakDietCalculator from '../src/OsmakDietCalculator';

export default function Home() {
  return (
    <div>
      <Head>
        <title>Osmák Dietní Kalkulačka v2</title>
      </Head>
      <main style={{ padding: '20px', fontFamily: 'sans-serif' }}>
        <h1 style={{ fontSize: '24px', fontWeight: 'bold' }}>Kalkulačka denního krmení pro osmáky – verze 2</h1>
        <OsmakDietCalculator />
      </main>
    </div>
  );
}
