const Cell = {
  Dead: 0,
  Alive: 1,
};

function createUniverse(size) {
  let width = size;
  let height = size;
  let cells = new Array(size * size)
    .fill(0)
    .map((zero, x) => (x % 2 === 0 || x % 11 === 0 ? Cell.Alive : Cell.Dead));
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

  for (let i = -1; i <= 1; i++) {
    for (let j = -1; j <= 1; j++) {
      if (i === 0 && j === 0) {
        continue;
      }

      let neighberX = row + i;
      let neighberY = col + j;

      if (neighberX < 0) neighberX = this.height - 1;
      if (neighberY < 0) neighberY = this.width - 1;
      if (neighberX >= this.height) neighberX = 0;
      if (neighberY >= this.width) neighberY = 0;

      let idx = this.getIndex(neighberX, neighberY);
      count += this.cells[idx];
    }
  }

  return count;
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
