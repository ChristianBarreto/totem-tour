import { useOperator } from '../helpers';

const queryMock = {
  orderBy: { asc: 'cityId' },
  isTest: { eq: { boo: 'false' } },
  showDisplay: { eq: { boo: 'true' } },
  cityId: { eq: { str: 'OiCHcy7zKcp2uU3zlMPU' } }
};



describe("useOperator() testing", () => {
  test("useOperator() should return equals operator", () => {
    expect(useOperator({ eq: { boo: 'false' } })).toBe('==')
  });

  test("useOperator() should return different (not equal) operator", () => {
    expect(useOperator({ ne: { boo: 'false' } })).toBe('!=')
  });
  
  test("useOperator() should return greater than operator", () => {
    expect(useOperator({ gt: { num: 3 } })).toBe('>')
  });
  
  test("useOperator() should return less then operator", () => {
    expect(useOperator({ lt: {  num: 3 } })).toBe('<')
  });
  
  test("useOperator() should return greated or equal operator", () => {
    expect(useOperator({ ge: {  num: 3 } })).toBe('>=')
  });
  
  test("useOperator() should return less or equal operator", () => {
    expect(useOperator({ le: {  num: 3 } })).toBe('<=')
  });
  
  test("useOperator() should return equals operator for any other string passed", () => {
    expect(useOperator({ aa: {  num: 3 } })).toBe('==')
  });
})