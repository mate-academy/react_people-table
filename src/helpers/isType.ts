function isString(x: any): x is string {
  return typeof x === 'string';
}

function isNumber(x: any): x is number {
  return typeof x === 'number';
}

export {
  isString,
  isNumber,
};
