# compare-string

A lightweight, pure JS package to calculate the degree of similarity between strings. Uses a combination of the [Sørensen–Dice coefficient](https://en.wikipedia.org/wiki/S%C3%B8rensen%E2%80%93Dice_coefficient) and [Jaccard's Index](https://en.wikipedia.org/wiki/Jaccard_index). Can generally return much faster, more accurate results than other edit-distance based algorithms, such as [Levenshtein](https://en.wikipedia.org/wiki/Levenshtein_distance).

## installation
`npm i compare-string`

# example usage
```js
const { compareString, matchArray } = require("compare-string")

console.log(compareString("please help", "some help, please"))
//output :: 0.7476708074534162

console.log(matchArray("catch me if you can!", ["try catch block", "nice catch bro", "fine, i'll catch you if i can"]))
/* output ::
{
  bestMatch: "fine, i'll catch you if i can",
  bestMatchRating: 0.6126519756838906,
  sorted: [
    [ "fine, i'll catch you if i can", 0.6126519756838906 ],
    [ "nice catch bro", 0.4583333333333333 ],
    [ "try catch block", 0.38548951048951047 ]
  ]
}
*/
```

# methods
This package has two simple methods: `.matchArray()` and `.compareString()`

## `compareString(string1, string2, { options })`

Evaluates the degree of similarity between string1 and string2. 
Returns a number between 0 and 1.

## `matchArray(string, array, { options })`

Finds the best match(es) in an array for a given string. Returns [ArrayMatch](#ArrayMatch)

# types

## `options`
```js
Object: {
strict: boolean
}
```

## `ArrayMatch`
```js
Object: {
bestMatch: string,
bestMatchRating: number (between 0 and 1),
sorted: Array [
    Array [matched string, number]
 ]
}
```

# contributing
See [CONTRIBUTING.md](https://github.com/saberscientist/compare-string/blob/master/CONTRIBUTING.MD) and the official repository link [here](https://github.com/saberscientist/compare-string)