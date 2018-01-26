
export const flat = (arr) => arr.reduce((acc, next) => [...acc, ...next], []);

export const chunk = (arr) => (
  [[...arr.slice(0, 3)], [...arr.slice(3, 6)], [...arr.slice(6, 9)]]
);

export const swap = (blank, options, arr) => {
  const randomOption = options[Math.floor(Math.random() * options.length)];
  const temp = arr[blank[0]][blank[1]];
  arr[blank[0]][blank[1]] = arr[randomOption[0]][randomOption[1]];
  arr[randomOption[0]][randomOption[1]] = temp;
  return {
    arr,
    newBlank: randomOption
  };
};

const shuffle = (arr) => {
  let newArr = arr;
  let blankPosition = [0, 0];
  let options = [[0, 1], [1, 0]];
  for (let i = 0; i < 2; i++) {
    const {arr: tempArr, newBlank} = swap(blankPosition, options, newArr);
    blankPosition = newBlank;
    newArr = tempArr;
    options = [];
    if ((blankPosition[0] === 0 || blankPosition[0] === 2) && blankPosition[1] !== 1) {
      options.push([blankPosition[0], 1]);
      options.push(1, blankPosition[0]);
    } else if (blankPosition[0] !== blankPosition[1]) {
      if (blankPosition[0] !== 1) {
        options.push([[blankPosition[0], 0], [blankPosition[0], 2]]);
      } else {
        options.push([[0, blankPosition[1]], [2, blankPosition[1]]]);
      }
    } else {
      options.push([[0, 1], [1, 0], [1, 2], [2, 1]]);
    }
  }
  return newArr;
};

export default () => {
  const base = [1, 2, 3];
  let count = 1;
  const rawArr = base.map((row, i) => base.map((item, j) => ({x: '', y: '', css: `${i === 0 && j === 0 ? '' : `background-position: ${j * -300}px ${i * -300}px`}`, id: count++})));
  const test = shuffle(rawArr);
  console.log('test', test);
  return test;
};


