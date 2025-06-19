import Head from 'next/head';
import OsmakDietCalculator from '../src/OsmakDietCalculator';

export default function Home() {
  return (
    <div>
      <Head>
        <title>Osmák Dietní Kalkulačka</title>
      </Head>
      <main className="p-4">
        <h1 className="text-2xl font-bold mb-4">Kalkulačka denního krmení pro osmáky</h1>
        <OsmakDietCalculator />
      </main>
    </div>
  );
}
