import { useState } from 'react';

export default function OsmakDietCalculator() {
  const [osmaci, setOsmaci] = useState([
    { name: 'Osmák 1', age: 'mládě', condition: 'zdravý', activity: 'střední' }
  ]);
  const [results, setResults] = useState([]);

  const handleChange = (index, field, value) => {
    const updated = [...osmaci];
    updated[index][field] = value;
    setOsmaci(updated);
  };

  const addOsmak = () => {
    setOsmaci([...osmaci, { name: '', age: 'mládě', condition: 'zdravý', activity: 'střední' }]);
  };

  const calculate = () => {
    const baseIntake = {
      mládě: 25,
      dospělý: 20,
      senior: 18,
      'březí/kojící': 30
    };
    const activityMod = { nízká: 0.9, střední: 1.0, vysoká: 1.1 };

    const output = osmaci.map(({ name, age, condition, activity }) => {
      const base = baseIntake[condition !== 'zdravý' ? condition : age] || 20;
      const total = base * (activityMod[activity] || 1);
      return {
        name,
        total: total.toFixed(1),
        seno: (total * 0.6).toFixed(1),
        byliny: (total * 0.25).toFixed(1),
        granule: (total * 0.10).toFixed(1),
        pamlsky: (total * 0.05).toFixed(1)
      };
    });
    setResults(output);
  };

  return (
    <div>
      {osmaci.map((o, i) => (
        <div key={i} style={{ marginBottom: '1rem', border: '1px solid #ccc', padding: '10px' }}>
          <div>
            <label>Jméno: </label>
            <input value={o.name} onChange={(e) => handleChange(i, 'name', e.target.value)} />
          </div>
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
        <table border="1" cellPadding="6" style={{ marginTop: '20px' }}>
          <thead>
            <tr>
              <th>Jméno</th>
              <th>Celkem (g)</th>
              <th>Seno</th>
              <th>Byliny</th>
              <th>Granule</th>
              <th>Pamlsky</th>
            </tr>
          </thead>
          <tbody>
            {results.map((r, i) => (
              <tr key={i}>
                <td>{r.name}</td>
                <td>{r.total}</td>
                <td>{r.seno}</td>
                <td>{r.byliny}</td>
                <td>{r.granule}</td>
                <td>{r.pamlsky}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
