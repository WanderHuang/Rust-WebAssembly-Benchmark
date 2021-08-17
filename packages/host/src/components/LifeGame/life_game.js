const Cell = {
  Dead: 0,
  Alive: 1,
};

function createUniverse(size) {
  let width = size;
  let height = size;
  let cells = new Array(size * size)
    .fill(0)
    .map((zero, x) => (x % 5 === 0 || x % 13 === 0 || x % 17 === 0 ? Cell.Alive : Cell.Dead));
  return [width, height, cells];
}

export function Universe(size) {
  this.size = size;
  const [width, height, cells] = createUniverse(size);
  this.width = width;
  this.height = height;
  this.cells = cells;
}

Universe.prototype.getIndex = function (row, column) {
  return row * this.width + column;
};

Universe.prototype.liveNeighborCount = function (row, col) {
  let count = 0;
  let north = row == 0 ? this.height - 1: row - 1;
  let south = row == this.height - 1  ? 0 : row + 1;
  let west = col == 0? this.width - 1 : col - 1;
  let east = col == this.width - 1 ? 0: col + 1;

  let nw = this.getIndex(north, west);
  count += this.cells[nw];

  let n = this.getIndex(north, col);
  count += this.cells[n];

  let ne = this.getIndex(north, east);
  count += this.cells[ne];

  let w = this.getIndex(row, west);
  count += this.cells[w];

  let e = this.getIndex(row, east);
  count += this.cells[e];

  let sw = this.getIndex(south, west);
  count += this.cells[sw];

  let s = this.getIndex(south, col);
  count += this.cells[s];

  let se = this.getIndex(south, east);
  count += this.cells[se];

  return count
};

Universe.prototype.tick = function () {
  let matrix = JSON.parse(JSON.stringify(this.cells));
  for (let row = 0; row < this.height; row++) {
    for (let col = 0; col < this.width; col++) {
      let idx = this.getIndex(row, col);
      let cell = this.cells[idx];
      let liveNeighbers = this.liveNeighborCount(row, col);
      let nextCell = cell;
      if (cell === Cell.Alive) {
        if (liveNeighbers < 2) {
          nextCell = Cell.Dead;
        } else if (liveNeighbers === 2 || liveNeighbers === 3) {
          nextCell = Cell.Alive;
        } else {
          nextCell = Cell.Dead;
        }
      } else {
        if (liveNeighbers === 3) {
          nextCell = Cell.Alive;
        }
      }

      matrix[idx] = nextCell;
    }
  }

  this.cells = matrix;
};

Universe.prototype.reset = function () {
  const [width, height, cells] = createUniverse(this.size);
  this.width = width;
  this.height = height;
  this.cells = cells;
};

Universe.prototype.render = function () {
  return this.cells;
};
