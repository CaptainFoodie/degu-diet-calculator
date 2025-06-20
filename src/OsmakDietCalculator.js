
"use client";
import React, { useState } from "react";
import Card from "../components/ui/card";
import Button from "../components/ui/button";
import Input from "../components/ui/input";
import Label from "../components/ui/label";
import { exportToPDF } from "../utils/pdfExport";
import seasonalData from "./data/ingredient_season_db_expanded.json";

const getDailyDose = (age, activity, status) => {
  let base = 8;
  if (age === "mládě") base -= 2;
  if (activity === "nízká") base -= 1;
  if (activity === "vysoká") base += 1;
  if (status === "nemocný") base -= 1;
  return Math.max(5, Math.min(base, 10));
};

export default function OsmakDietCalculator() {
  const [degus, setDegus] = useState([{
    name: "Osmák 1",
    age: "mládě",
    status: "zdravý",
    activity: "střední"
  }]);
  const [days, setDays] = useState(30);
  const [season, setSeason] = useState("jaro");
  const [mix1, setMix1] = useState([]);
  const [mix2, setMix2] = useState([]);
  const [lockedMix1, setLockedMix1] = useState([]);
  const [lockedMix2, setLockedMix2] = useState([]);

  const handleChange = (index, field, value) => {
    const updated = [...degus];
    updated[index][field] = value;
    setDegus(updated);
  };

  const addDegu = () => {
    setDegus([...degus, {
      name: `Osmák ${degus.length + 1}`,
      age: "mládě",
      status: "zdravý",
      activity: "střední"
    }]);
  };

  const getTotalGrams = () => {
    return degus.reduce((total, degu) => {
      return total + getDailyDose(degu.age, degu.activity, degu.status) * days;
    }, 0);
  };

  const getRandomItems = (arr, count, locked = []) => {
    const pool = arr.filter((item) => !locked.includes(item));
    const shuffled = [...pool].sort(() => 0.5 - Math.random());
    return [...locked, ...shuffled.slice(0, count - locked.length)];
  };

  const generateIngredients = () => {
    const list = seasonalData.kvety_listy[season];
    const seeds = seasonalData.semena.celorocne;
    const grains = seasonalData.obilniny.celorocne;
    const veg = seasonalData.zelenina[season];

    setMix1([
      ...getRandomItems(list, 8, lockedMix1),
      ...getRandomItems(seeds, 3),
      ...getRandomItems(grains, 1),
    ]);
    setMix2([
      ...getRandomItems(list, 8, lockedMix2),
      ...getRandomItems(seeds, 2),
      ...getRandomItems(veg, 2),
    ]);
  };

  const toggleLock = (item, locked, setLocked) => {
    if (locked.includes(item)) {
      setLocked(locked.filter((i) => i !== item));
    } else {
      setLocked([...locked, item]);
    }
  };

  const totalGrams = getTotalGrams();

  const splitWeights = (ingredients) => {
    const weightPerItem = +(totalGrams / ingredients.length).toFixed(1);
    return ingredients.map(item => ({ name: item, weight: weightPerItem }));
  };

  return (
    <Card>
      <div style={{ padding: "1rem" }}>
        <h2>Kalkulačka krmiva pro osmáky + generátor sezónních směsí</h2>
        <Label>Období (dní):</Label>
        <Input type="number" value={days} onChange={e => setDays(+e.target.value)} />

        <h3>Sezóna:</h3>
        <select value={season} onChange={(e) => setSeason(e.target.value)}>
          <option value="jaro">Jaro</option>
          <option value="léto">Léto</option>
          <option value="podzim">Podzim</option>
          <option value="zima">Zima</option>
        </select>

        {degus.map((degu, i) => (
          <div key={i} style={{ marginTop: "1rem" }}>
            <h4>{degu.name}</h4>
            <Label>Věk:</Label>
            <select value={degu.age} onChange={e => handleChange(i, "age", e.target.value)}>
              <option value="mládě">Mládě</option>
              <option value="dospělý">Dospělý</option>
              <option value="starý">Starý</option>
            </select>
            <Label>Zdravotní stav:</Label>
            <select value={degu.status} onChange={e => handleChange(i, "status", e.target.value)}>
              <option value="zdravý">Zdravý</option>
              <option value="nemocný">Nemocný</option>
            </select>
            <Label>Aktivita:</Label>
            <select value={degu.activity} onChange={e => handleChange(i, "activity", e.target.value)}>
              <option value="nízká">Nízká</option>
              <option value="střední">Střední</option>
              <option value="vysoká">Vysoká</option>
            </select>
          </div>
        ))}

        <Button onClick={addDegu} style={{ marginTop: "1rem" }}>Přidat dalšího osmáka</Button>
        <Button onClick={generateIngredients} style={{ marginLeft: "1rem" }}>Generovat směsi</Button>

        <h3 style={{ marginTop: "1rem" }}>Směs 1 – rozdělení surovin (Mix 1)</h3>
        <ul>
          {splitWeights(mix1).map((item, i) => (
            <li key={i} style={{ fontWeight: lockedMix1.includes(item.name) ? "bold" : "normal", color: lockedMix1.includes(item.name) ? "green" : "black", cursor: "pointer" }}
                onClick={() => toggleLock(item.name, lockedMix1, setLockedMix1)}>
              {item.name} – {item.weight} g {lockedMix1.includes(item.name) && "🔒"}
            </li>
          ))}
        </ul>

        <h3>Směs 2 – rozdělení surovin (Mix 2)</h3>
        <ul>
          {splitWeights(mix2).map((item, i) => (
            <li key={i} style={{ fontWeight: lockedMix2.includes(item.name) ? "bold" : "normal", color: lockedMix2.includes(item.name) ? "blue" : "black", cursor: "pointer" }}
                onClick={() => toggleLock(item.name, lockedMix2, setLockedMix2)}>
              {item.name} – {item.weight} g {lockedMix2.includes(item.name) && "🔒"}
            </li>
          ))}
        </ul>
      </div>
    </Card>
  );
}
