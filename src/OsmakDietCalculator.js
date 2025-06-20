
"use client";
import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { SavePDF } from "./utils/pdfExport";
import { seasonalData } from "./data/ingredient_season_db_expanded";

export default function SeasonalGenerator() {
  const [season, setSeason] = useState("jaro");
  const [mix1, setMix1] = useState([]);
  const [mix2, setMix2] = useState([]);
  const [lockedMix1, setLockedMix1] = useState([]);
  const [lockedMix2, setLockedMix2] = useState([]);

  const generateIngredients = () => {
    const getRandomItems = (arr, count, locked = []) => {
      const pool = arr.filter(item => !locked.includes(item));
      const shuffled = [...pool].sort(() => 0.5 - Math.random());
      return [...locked, ...shuffled.slice(0, count - locked.length)];
    };

    const list = seasonalData.kvety_listy[season];
    const seeds = seasonalData.semena.celorocne;
    const grains = seasonalData.obilniny.celorocne;
    const veg = seasonalData.zelenina[season];

    setMix1(getRandomItems(list, 8, lockedMix1).concat(getRandomItems(seeds, 3)).concat(getRandomItems(grains, 1)));
    setMix2(getRandomItems(list, 8, lockedMix2).concat(getRandomItems(seeds, 2)).concat(getRandomItems(veg, 2)));
  };

  const toggleLock = (item, mix, setLocked, locked) => {
    if (locked.includes(item)) {
      setLocked(locked.filter(i => i !== item));
    } else {
      setLocked([...locked, item]);
    }
  };

  return (
    <Card className="m-4 p-4 shadow-xl">
      <CardContent>
        <h1 className="text-xl font-bold mb-4">Generátor sezónních surovin pro Osmáky</h1>
        <Label className="mb-2 block">Zvol sezónu</Label>
        <select
          value={season}
          onChange={e => setSeason(e.target.value)}
          className="mb-4 border rounded px-2 py-1"
        >
          <option value="jaro">Jaro</option>
          <option value="léto">Léto</option>
          <option value="podzim">Podzim</option>
          <option value="zima">Zima</option>
        </select>
        <Button onClick={generateIngredients} className="mb-4">Generovat náhodně</Button>
        <Button onClick={() => SavePDF(mix1, mix2, season)} variant="outline" className="ml-2 mb-4">Exportovat do PDF</Button>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <h2 className="text-lg font-semibold">Mix 1</h2>
            <ul>
              {mix1.map((item, idx) => (
                <li
                  key={idx}
                  className={`cursor-pointer ${lockedMix1.includes(item) ? "text-green-600 font-bold" : ""}`}
                  onClick={() => toggleLock(item, mix1, setLockedMix1, lockedMix1)}
                >
                  {item} {lockedMix1.includes(item) && "🔒"}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className="text-lg font-semibold">Mix 2</h2>
            <ul>
              {mix2.map((item, idx) => (
                <li
                  key={idx}
                  className={`cursor-pointer ${lockedMix2.includes(item) ? "text-blue-600 font-bold" : ""}`}
                  onClick={() => toggleLock(item, mix2, setLockedMix2, lockedMix2)}
                >
                  {item} {lockedMix2.includes(item) && "🔒"}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
