export default class Validator {
  constructor() {
    this.paySystem = [
      { name: 'mir', digits: [22] },
      { name: 'american-express', digits: [34, 37] },
      { name: 'visa', digits: [4] },
      { name: 'master-card', digits: [51, 52, 53, 54, 55] },
      { name: 'maestro', digits: [50, 56, 57, 58] },
      { name: 'discover', digits: [60] },
    ];
  }

  checkPaySystem(number) {
    const firstDigit = number.toString().substring(0, 1);
    if (firstDigit === '4') {
      return 'visa';
    }
    const firstTwoDigits = parseInt(number.toString().substring(0, 2), 10);
    const system = this.paySystem.filter((item) => item.digits.includes(firstTwoDigits));
    if (system.length === 0) {
      return 'Not Found';
    }
    return system[0].name;
  }

  static checkLuhnAlgorithm(number) {
    const firstStep = Validator.splitNumber(number);
    const secondStep = Validator.doubleDigits(firstStep);
    const thirdStep = Validator.checkNumbers(secondStep);
    const fourthStep = Validator.sumArray(thirdStep);
    if (fourthStep % 10 === 0) {
      return true;
    }
    return false;
  }

  static splitNumber(number) {
    return number.toString().split('').map((i) => +i);
  }

  static doubleDigits(array) {
    const arr = array.reverse();
    return arr.map((item, index) => {
      if (index % 2 === 1) {
        const digit = item * 2;
        return digit;
      }
      return item;
    });
  }

  static checkNumbers(array) {
    return array.map((num) => {
      if (num > 9) {
        return num - 9;
      }
      return num;
    });
  }

  static sumArray(array) {
    return array.reduce((sum, current) => {
      const result = sum + current;
      return result;
    });
  }
}
