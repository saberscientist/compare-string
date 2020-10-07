const { compareString, matchArray } = require('compare-string');

console.log(compareString('please help', 'some help, please'));
//output :: 0.733173076923077

console.log(
  matchArray('catch me if you can!', [
    'try catch block',
    'nice catch bro',
    "fine, i'll catch you if i can",
  ])
);
/* output ::
{
  bestMatch: "fine, i'll catch you if i can",
  bestMatchRating: 0.5718085106382979,
  sorted: [
    [ "fine, i'll catch you if i can", 0.5718085106382979 ],
    [ 'nice catch bro', 0.4010416666666667 ],
    [ 'try catch block', 0.3304195804195804 ]
  ]
}
*/
