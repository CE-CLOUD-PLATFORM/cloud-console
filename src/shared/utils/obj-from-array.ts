/* eslint-disable @typescript-eslint/no-empty-object-type */
/* eslint-disable @typescript-eslint/no-explicit-any */
export const objFromArray = (arr: any[], key = 'id'): {} => arr.reduce((
  accumulator,
  current
) => {
  accumulator[current[key]] = current;
  return accumulator;
}, {});
