
"use client";
import React, { useState } from "react";
import Card from "../components/ui/card";
import Button from "../components/ui/button";
import Input from "../components/ui/input";
import Label from "../components/ui/label";
import { exportToPDF } from "../utils/pdfExport";
import seasonalData from "../data/ingredient_season_db_expanded.json";

export default function OsmakDietCalculator() {
  const [season, setSeason] = useState("jaro");
  const [mix1, setMix1] = useState([]);
  const [mix2, setMix2] = useState([]);
  const [lockedMix1, setLockedMix1] = useState([]);
  const [lockedMix2, setLockedMix2] = useState([]);

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

  return (
    <Card>
      <div style={{ padding: "1rem" }}>
        <h2>Generátor sezónních surovin pro Osmáky</h2>
        <Label>Zvol sezónu:</Label>
        <select value={season} onChange={(e) => setSeason(e.target.value)}>
          <option value="jaro">Jaro</option>
          <option value="léto">Léto</option>
          <option value="podzim">Podzim</option>
          <option value="zima">Zima</option>
        </select>
        <br />
        <Button onClick={generateIngredients}>Generovat náhodně</Button>
        <Button onClick={() => exportToPDF({ mix1, mix2, season })} style={{ marginLeft: "1rem" }}>
          Export do PDF
        </Button>
        <div style={{ display: "flex", gap: "2rem", marginTop: "1rem" }}>
          <div>
            <h3>Mix 1</h3>
            <ul>
              {mix1.map((item, idx) => (
                <li
                  key={idx}
                  onClick={() => toggleLock(item, lockedMix1, setLockedMix1)}
                  style={{
                    cursor: "pointer",
                    fontWeight: lockedMix1.includes(item) ? "bold" : "normal",
                    color: lockedMix1.includes(item) ? "green" : "black",
                  }}
                >
                  {item} {lockedMix1.includes(item) ? "🔒" : ""}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3>Mix 2</h3>
            <ul>
              {mix2.map((item, idx) => (
                <li
                  key={idx}
                  onClick={() => toggleLock(item, lockedMix2, setLockedMix2)}
                  style={{
                    cursor: "pointer",
                    fontWeight: lockedMix2.includes(item) ? "bold" : "normal",
                    color: lockedMix2.includes(item) ? "blue" : "black",
                  }}
                >
                  {item} {lockedMix2.includes(item) ? "🔒" : ""}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </Card>
  );
}
