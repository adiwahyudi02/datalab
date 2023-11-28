import { snakeToTitleCase } from "../convertTextCase";

describe('snakeToTitleCase helper', () => {
  const cases = [
    ['first_name', 'First Name'],
    ['last_name', 'Last Name'],
    ['full_name', 'Full Name'],
  ];

  it.each(cases)('Give %s should return %s', (snake, expected) => {
    expect(snakeToTitleCase(snake)).toBe(expected);
  });
});