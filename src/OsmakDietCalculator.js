import { useState } from 'react';

export default function OsmakDietCalculator() {
  const [osmaci, setOsmaci] = useState([{ name: 'Osmák 1', age: 'mládě', condition: 'zdravý', activity: 'střední' }]);
  const [days, setDays] = useState(30);
  const [season, setSeason] = useState('léto');
  const [results, setResults] = useState([]);

  const handleChange = (i, field, value) => {
    const updated = [...osmaci];
    updated[i][field] = value;
    setOsmaci(updated);
  };

  const addOsmak = () => {
    setOsmaci([...osmaci, { name: '', age: 'mládě', condition: 'zdravý', activity: 'střední' }]);
  };

  const calculate = () => {
    const baseIntake = { mládě: 8, dospělý: 7, senior: 6, 'březí/kojící': 10 };
    const activityMod = { nízká: 0.9, střední: 1.0, vysoká: 1.1 };

    const output = osmaci.map(({ name, age, condition, activity }) => {
      const base = baseIntake[condition !== 'zdravý' ? condition : age] || 7;
      const total = base * (activityMod[activity] || 1);

      const mix1_flowers = total * 0.8;
      const mix1_seeds = total * 0.15;
      const mix1_grains = total * 0.05;

      const mix2_flowers = total * 0.8;
      const mix2_seeds = total * 0.1;
      const mix2_veg = total * 0.1;

      return {
        name,
        daily: total.toFixed(1),
        mix1_flowers: (mix1_flowers * days).toFixed(1),
        mix1_seeds: (mix1_seeds * days).toFixed(1),
        mix1_grains: (mix1_grains * days).toFixed(1),
        mix2_flowers: (mix2_flowers * days).toFixed(1),
        mix2_seeds: (mix2_seeds * days).toFixed(1),
        mix2_veg: (mix2_veg * days).toFixed(1)
      };
    });

    setResults(output);
  };

  const totalWeight = (field) => {
    return results.reduce((sum, item) => sum + parseFloat(item[field]), 0).toFixed(1);
  };

  return (
    <div>
      <div style={{ marginBottom: '20px' }}>
        <label>Období (dnů): </label>
        <input type="number" value={days} onChange={(e) => setDays(Number(e.target.value))} style={{ width: '60px' }} />
        <label style={{ marginLeft: '20px' }}>Sezóna: </label>
        <select value={season} onChange={(e) => setSeason(e.target.value)}>
          <option value="jaro">jaro</option>
          <option value="léto">léto</option>
          <option value="podzim">podzim</option>
          <option value="zima">zima</option>
        </select>
      </div>

      {osmaci.map((o, i) => (
        <div key={i} style={{ marginBottom: '1rem', border: '1px solid #ccc', padding: '10px' }}>
          <div><label>Jméno: </label><input value={o.name} onChange={(e) => handleChange(i, 'name', e.target.value)} /></div>
          <div>
            <label>Věk: </label>
            <select value={o.age} onChange={(e) => handleChange(i, 'age', e.target.value)}>
              <option value="mládě">mládě</option>
              <option value="dospělý">dospělý</option>
              <option value="senior">senior</option>
            </select>
          </div>
          <div>
            <label>Stav: </label>
            <select value={o.condition} onChange={(e) => handleChange(i, 'condition', e.target.value)}>
              <option value="zdravý">zdravý</option>
              <option value="březí/kojící">březí/kojící</option>
            </select>
          </div>
          <div>
            <label>Aktivita: </label>
            <select value={o.activity} onChange={(e) => handleChange(i, 'activity', e.target.value)}>
              <option value="nízká">nízká</option>
              <option value="střední">střední</option>
              <option value="vysoká">vysoká</option>
            </select>
          </div>
        </div>
      ))}

      <button onClick={addOsmak}>Přidat dalšího osmáka</button>
      <button onClick={calculate} style={{ marginLeft: '10px' }}>Spočítat dávky</button>

      {results.length > 0 && (
        <div style={{ marginTop: '20px' }}>
          <h3>Výpočet krmiva pro období: {days} dní</h3>
          <table border="1" cellPadding="6">
            <thead>
              <tr>
                <th rowSpan="2">Jméno</th>
                <th rowSpan="2">Denní dávka (g)</th>
                <th colSpan="3">Mix 1: 80% listy + 15% semena + 5% obilniny</th>
                <th colSpan="3">Mix 2: 80% listy + 10% semena + 10% zelenina</th>
              </tr>
              <tr>
                <th>Listy/květy</th>
                <th>Semena</th>
                <th>Obilniny</th>
                <th>Listy/květy</th>
                <th>Semena</th>
                <th>Zelenina</th>
              </tr>
            </thead>
            <tbody>
              {results.map((r, i) => (
                <tr key={i}>
                  <td>{r.name}</td>
                  <td>{r.daily}</td>
                  <td>{r.mix1_flowers}</td>
                  <td>{r.mix1_seeds}</td>
                  <td>{r.mix1_grains}</td>
                  <td>{r.mix2_flowers}</td>
                  <td>{r.mix2_seeds}</td>
                  <td>{r.mix2_veg}</td>
                </tr>
              ))}
              <tr>
                <td><strong>Celkem</strong></td>
                <td></td>
                <td><strong>{totalWeight('mix1_flowers')}</strong></td>
                <td><strong>{totalWeight('mix1_seeds')}</strong></td>
                <td><strong>{totalWeight('mix1_grains')}</strong></td>
                <td><strong>{totalWeight('mix2_flowers')}</strong></td>
                <td><strong>{totalWeight('mix2_seeds')}</strong></td>
                <td><strong>{totalWeight('mix2_veg')}</strong></td>
              </tr>
            </tbody>
          </table>
          <p style={{ marginTop: '10px' }}>Sezóna: <strong>{season}</strong> (ovlivní výběr doporučených surovin v další fázi vývoje)</p>
        </div>
      )}
    </div>
  );
}
