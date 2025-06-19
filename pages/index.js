import Head from 'next/head';
import OsmakDietCalculator from '../src/OsmakDietCalculator';

export default function Home() {
  return (
    <div>
      <Head>
        <title>Osmák Dietní Kalkulačka</title>
      </Head>
      <main style={{ padding: '20px', fontFamily: 'sans-serif' }}>
        <h1 style={{ fontSize: '24px', fontWeight: 'bold' }}>Kalkulačka denního krmení pro osmáky</h1>
        <OsmakDietCalculator />
      </main>
    </div>
  );
}
