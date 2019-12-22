const CoacherModel = require('./coachers');
// because im deviding to calculate ratio, must be greater then zero
const greaterThenZero = (won, lost) => {
  if (won > 0 && lost > 0) { return true; }

  return false;
}

// comperation function to sort by ratio an array of [coacher.won/coacher.lost, coacher] objects
const compareRatios = (a, b) => {
  if (a[0] > b[0]) return -1;
  if (a[0] === b[0]) return 0;
  if (a[0] < b[0]) return 1;
}

const calcRatio = (coacher) => {
  return coacher.won / coacher.lost;
}
// sorting by array by win/lose ratio, first element the best ratio (first rank).
const generateRank = async () => {
  const allCoachers = await CoacherModel.getAll();
  const arrCoachers = [];
  for (const coacher of allCoachers) {
    const coachRatio = calcRatio(coacher);
    arrCoachers.push([coachRatio, coacher]);
  }
  arrCoachers.sort(compareRatios);

  return arrCoachers;
}

module.exports = {
  generateRank,
  calcRatio,
  greaterThenZero
}
