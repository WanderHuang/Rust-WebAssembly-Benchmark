export default function (cells, size) {
  let res = [];
  for (let i = 0; i < size; i++) {
    let line = []; 
    for (let j = 0; j < size; j++) {
      let idx = i * size + j;
      line[j] = cells[idx] === 1 ? "◼" : "◻";
    }
    res.push(line.join(""));
  }
  return res.join("\n");
}
