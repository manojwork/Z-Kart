import { helper } from '@ember/component/helper';

export function mul([a, b]) {
  const numA = parseInt(a, 10);
  const numB = parseInt(b, 10);

  console.log(numA);
  console.log(numB);

  if (isNaN(numA) || isNaN(numB)) {
    throw new Error('Invalid input: Both inputs must be valid numbers.');
  }

  return String(numA * numB);
}

export default helper(mul);
