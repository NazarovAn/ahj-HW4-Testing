import Validator from '../Validator';

describe('Validity test', () => test.each([
  ['Valid', 371449635398431, true],
  ['Valid', 4111111111111111, true],
  ['false', 4111111111111112, false],
  ['false', 'abc', false],
])(
  ('%s'),
  (level, amount, expected) => {
    const result = Validator.checkLuhnAlgorithm(amount);
    expect(result).toEqual(expected);
  },
));

describe('splitNumber', () => test.each([
  ['number', 11111, [1, 1, 1, 1, 1]],
  ['string', 'abc', [NaN, NaN, NaN]],
  ['string', true, [NaN, NaN, NaN, NaN]],
])(
  ('%s'),
  (level, amount, expected) => {
    const result = Validator.splitNumber(amount);
    expect(result).toStrictEqual(expected);
  },
));

describe('doubleDigits', () => test.each([
  ['odd length array', [1, 2, 3, 4, 5], [5, 8, 3, 4, 1]],
  ['even length array', [1, 2, 3, 4, 5, 6], [6, 10, 4, 6, 2, 2]],
])(
  ('%s'),
  (level, amount, expected) => {
    const result = Validator.doubleDigits(amount);
    expect(result).toStrictEqual(expected);
  },
));

describe('checkNumbers', () => test.each([
  ['numbers < 9', [1, 2, 3, 4, 5], [1, 2, 3, 4, 5]],
  ['9 < numbers <= 18', [10, 12, 15, 17, 18], [1, 3, 6, 8, 9]],
])(
  ('%s'),
  (level, amount, expected) => {
    const result = Validator.checkNumbers(amount);
    expect(result).toStrictEqual(expected);
  },
));

describe('sumArray', () => test.each([
  ['6', [1, 2, 3], 6],
  ['72', [10, 12, 15, 17, 18], 72],
])(
  ('%s'),
  (level, amount, expected) => {
    const result = Validator.sumArray(amount);
    expect(result).toEqual(expected);
  },
));

describe('checkPaySystem', () => test.each([
  ['Mir', 22, 'mir'],
  ['American express', 34, 'american-express'],
  ['American express', 37, 'american-express'],
  ['Visa', 41, 'visa'],
  ['Master Card', 51, 'master-card'],
  ['Master Card', 52, 'master-card'],
  ['Master Card', 53, 'master-card'],
  ['Master Card', 54, 'master-card'],
  ['Master Card', 55, 'master-card'],
  ['Maestro', 50, 'maestro'],
  ['Maestro', 56, 'maestro'],
  ['Maestro', 57, 'maestro'],
  ['Maestro', 58, 'maestro'],
  ['Discover', 60, 'discover'],
  ['Not Found', 30, 'Not Found'],
  ['Not Found', 1, 'Not Found'],
  ['Not Found', 996541231246548, 'Not Found'],
  ['Not Found', 'abc', 'Not Found'],
  ['Not Found', '', 'Not Found'],
  ['Not Found', true, 'Not Found'],
])(
  ('%s'),
  (level, amount, expected) => {
    const newValidator = new Validator();
    const result = newValidator.checkPaySystem(amount);
    expect(result).toEqual(expected);
  },
));
