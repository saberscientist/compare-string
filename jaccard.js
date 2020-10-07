const tokenizer = (str) => {
  const split = [];
  for (let i = 0; i < str.length; i++) {
    if (i + 2 <= str.length) {
      const val = str.substring(i, i + 2);
      split.push(val);
    }
  }
  return split;
};

const uniqueArray = (array) => [...new Set(array)];

const intersections = (first, second) => {
  return uniqueArray(first).filter((str) => second.includes(str)).length;
};

const unions = (first, second) => {
  return (
    uniqueArray(first).length +
    uniqueArray(second).length -
    intersections(first, second)
  );
};

const arrayCheck = (_arr, options) => {
  if ((Array.isArray(!_arr) && options.strict) || !_arr)
    throw new Error(
      'The parameter you provided must be an array with at least one element.'
    );
  else if (Array.isArray(_arr) && !options.strict) return null;
  for (const x of _arr)
    if (!x || (typeof x !== 'string' && options.strict))
      throw new Error('Array to find best match of can only contain strings.');
    else if (!x || (typeof x !== 'string' && !options.strict)) return null;
};

const typeGuard = {
  strict: 'boolean',
};
const defaultOptions = {
  strict: true,
};

//the actual interface
function compareString(str1, str2, options) {
  if (!options) options = defaultOptions;
  for (const y of Object.keys(typeGuard)) {
    if (typeGuard[y] !== typeof options[y]) options[y] = defaultOptions[y];
  }

  if ((typeof str1 !== 'string' || typeof str2 !== 'string') && options.strict)
    throw new Error('Cannot compare non-strings.');
  else if ((typeof str1 !== 'string' || typeof str2 !== 'string') && !strict)
    return null;
  const arr1 = tokenizer(str1);
  const arr2 = tokenizer(str2);

  let n_intersections = intersections(arr1, arr2);

  let jaccardIndex = n_intersections / unions(arr1, arr2);
  let sdCoefficient = (2 * n_intersections) / (arr1.length + arr2.length);

  return (jaccardIndex * 1 + sdCoefficient * 3) / 4;
}
//@returns String

function matchArray(str, array, options) {
  if (!options) options = defaultOptions;
  for (const y of Object.keys(typeGuard)) {
    if (typeGuard[y] !== typeof options[y]) options[y] = defaultOptions[y];
  }
  arrayCheck(array, options);
  if (typeof str !== 'string' && options.strict)
    throw new Error('String to find best match of must be a string.');
  else if (typeof str !== 'string' && !options.strict) return null;

  const ratings = array.map((string) => [
    string,
    compareString(str, string, options),
  ]);
  ratings.sort(([, rating1], [, rating2]) => rating2 - rating1);
  return {
    bestMatch: ratings[0][0],
    bestMatchRating: ratings[0][1],
    sorted: ratings,
  };
}
//@returns Object{sorted: Array[Array[name, rating]], bestMatch: String, bestMatchRating: Number}

module.exports = {
  compareString,
  matchArray,
};
