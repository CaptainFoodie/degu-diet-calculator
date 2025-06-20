export function SavePDF(mix1, mix2, season) {
  const content = `Sezóna: ${season}\n\nMix 1:\n${mix1.join(", ")}\n\nMix 2:\n${mix2.join(", ")}`;
  const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
  const link = document.createElement('a');
  link.href = URL.createObjectURL(blob);
  link.download = `osmak_suroviny_${season}.txt`;
  link.click();
}