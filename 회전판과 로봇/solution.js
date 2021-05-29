// const m = 5;
// const n = 6;
// let x = 2;
// let y = 5;
// const data = [
//   [0, 1, 1, 2, 3],
//   [2, 5, -1, 2, 0],
//   [10, 29, 17, -1, 3],
//   [5, 4, 7, 9, 12],
//   [11, 19, -1, 12, 4],
//   [7, 8, 9, 1, 3],
// ];
// const k = 5;
// const pan = [2, 5, 3, 1, 0];
// const q = 5;
// const rots = [
//   ['S', 1, 3],
//   ['N', 1, 4],
//   ['W', 2, 1],
//   ['N', 1, 7],
//   ['E', 1, 1],
// ];

const m = 5;
const n = 6;
let x = 1;
let y = 2;
const data = [
  [0, 1, 1, 2, 3],
  [2, 5, -1, 2, 0],
  [10, 29, 17, -1, 3],
  [5, 4, 7, 9, 12],
  [11, 19, -1, 12, 4],
  [7, 8, 9, 1, 3],
];
const k = 3;
const pan = [2, 4, 1];
const q = 3;
const rots = [
  ['S', 1, 2],
  ['N', 2, 1],
  ['E', 2, 5],
];

let panIndex = 0;

// Start!!
main();

function main() {
  initBoundaries();

  let sum = data[y][x];
  data[y][x] = 0;

  for (let i = 0; i < q; i++) {
    const dir = rots[i][0];
    const cw = rots[i][1];
    const r = rots[i][2];

    const moveCnt = rotatePan3(cw, r);
    const score = move(dir, moveCnt);

    sum += score;
  }

  console.log(sum, x, y);
}

function initBoundaries() {
  const boundary = new Array(m + 2).fill(-1);
  data.unshift(boundary);
  data.push(boundary);

  for (let i = 1; i <= n; i++) {
    data[i].unshift(-1);
    data[i].push(-1);
  }
  console.log(data);
}

function rotatePan(cw, r) {
  if (cw == 1) {
    //시계방향 - index 앞으로 이동
    for (let i = 1; i <= r; i++) {
      panIndex--;

      if (panIndex < 0) panIndex = k - 1;
    }
  } else {
    //반시계방향 - index 뒤로 이동
    for (let i = 1; i <= r; i++) {
      panIndex++;

      if (panIndex >= k) panIndex = 0;
    }
  }

  return pan[panIndex];
}

function rotatePan2(cw, r) {
  if (cw == 1) {
    //시계방향 - index 앞으로 이동
    while (r >= k) r -= k;

    if (panIndex - r < 0) panIndex = panIndex - r + k;
    else panIndex -= r;
  } else {
    //반시계방향 - index 뒤로 이동
    while (r >= k) r -= k;

    if (panIndex + r > k - 1) panIndex = panIndex + r - k;
    else panIndex += r;
  }

  return pan[panIndex];
}

function rotatePan3(cw, r) {
  if (cw == 1) {
    //시계방향 - index 앞으로 이동
    if (panIndex - r < 0) {
      const newR = (r - panIndex) % k;
      panIndex = k - newR;
    } else {
      panIndex -= r;
    }
  } else {
    //반시계방향 - index 뒤로 이동
    panIndex = (panIndex + r) % k;
  }

  return pan[panIndex];
}

function move(dir, moveCnt) {
  const dirIndexObj = { E: 0, W: 1, S: 2, N: 3 };
  const dirIndex = dirIndexObj[dir];

  const dy = [0, 0, 1, -1];
  const dx = [1, -1, 0, 0];

  let score = 0;

  for (let i = 1; i <= moveCnt; i++) {
    const ty = y + dy[dirIndex];
    const tx = x + dx[dirIndex];

    if (data[ty][tx] === -1) break;

    y = ty;
    x = tx;

    score += data[y][x];
    data[y][x] = 0;
  }

  return score;
}

function getDirectionIndex(d) {
  switch (d) {
    case 'E':
      return 0;
    case 'W':
      return 1;
    case 'S':
      return 2;
    default:
      return 3; //N
  }
}
