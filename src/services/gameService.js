
export const flat = (arr) => arr.reduce((acc, next) => [...acc, ...next], []);

const shuffle = (arr) => {
  const newArr = [];
  while (arr.length) {
    const randomIndex = Math.floor(Math.random() * arr.length);
    const item = arr.splice(randomIndex, 1)[0];
    newArr.push(item);
  }
  return newArr;
};

export const chunk = (arr) => (
  [[...arr.slice(0, 3)], [...arr.slice(3, 6)], [...arr.slice(6, 9)]]
);

export default () => {
  const base = [1, 2, 3];
  let count = 1;
  const rawArr = base.map((row, i) => base.map((item, j) => ({x: '', y: '', css: `${i === 0 && j === 0 ? '' : `background-position: ${j * -300}px ${i * -300}px`}`, id: count++})));
  return chunk(shuffle(flat(rawArr)));
};


