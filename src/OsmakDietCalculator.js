
import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

export default function OsmakDietCalculator() {
  const [osmaci, setOsmaci] = useState([
    { name: 'Osmák 1', age: 'mládě', condition: 'zdravý', activity: 'střední' }
  ]);
  const [results, setResults] = useState([]);

  const handleChange = (index, field, value) => {
    const newOsmaci = [...osmaci];
    newOsmaci[index][field] = value;
    setOsmaci(newOsmaci);
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
    <div className="space-y-4 p-4">
      {osmaci.map((osmak, index) => (
        <Card key={index}>
          <CardContent className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <Label>Jméno</Label>
              <Input value={osak.name} onChange={(e) => handleChange(index, 'name', e.target.value)} />
            </div>
            <div>
              <Label>Věk</Label>
              <select className="w-full" value={osmak.age} onChange={(e) => handleChange(index, 'age', e.target.value)}>
                <option value="mládě">mládě</option>
                <option value="dospělý">dospělý</option>
                <option value="senior">senior</option>
              </select>
            </div>
            <div>
              <Label>Stav</Label>
              <select className="w-full" value={osmak.condition} onChange={(e) => handleChange(index, 'condition', e.target.value)}>
                <option value="zdravý">zdravý</option>
                <option value="březí/kojící">březí/kojící</option>
              </select>
            </div>
            <div>
              <Label>Aktivita</Label>
              <select className="w-full" value={osmak.activity} onChange={(e) => handleChange(index, 'activity', e.target.value)}>
                <option value="nízká">nízká</option>
                <option value="střední">střední</option>
                <option value="vysoká">vysoká</option>
              </select>
            </div>
          </CardContent>
        </Card>
      ))}
      <Button onClick={addOsmak}>Přidat dalšího osmáka</Button>
      <Button onClick={calculate} className="ml-2">Spočítat dávky</Button>

      {results.length > 0 && (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Jméno</TableHead>
              <TableHead>Celkem (g)</TableHead>
              <TableHead>Seno</TableHead>
              <TableHead>Byliny</TableHead>
              <TableHead>Granule</TableHead>
              <TableHead>Pamlsky</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {results.map((res, i) => (
              <TableRow key={i}>
                <TableCell>{res.name}</TableCell>
                <TableCell>{res.total}</TableCell>
                <TableCell>{res.seno}</TableCell>
                <TableCell>{res.byliny}</TableCell>
                <TableCell>{res.granule}</TableCell>
                <TableCell>{res.pamlsky}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </div>
  );
}
