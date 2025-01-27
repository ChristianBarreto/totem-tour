import { getKey, getValue, sanitizeQuery, sortGetData, useOperator } from '../helpers';
import { ParsedQs } from "qs";

const mockedQuery: ParsedQs = {
  orderBy: { asc: 'cityId' },
  isTest: { eq: { boo: 'false' } },
  showDisplay: { eq: { boo: 'true' } },
  cityId: { eq: { str: 'OiCHcy7zKcp2uU3zlMPU' } }
};

const mockedData = [
  {name: 'name3', age: 2, timestamp: 11},
  {name: 'name2', age: 5, timestamp: 0},
  {name: 'name4', age: 10, timestamp: 44},
  {name: 'name1', age: 4, timestamp: 133},
  {name: 'name5', age: 7, timestamp: 57},
];

describe("getKey() testing", () => {
  test("getKey() should get the correct object first key", () => {
    expect(getKey({ eq: { boo: 'false' } })).toBe('eq');
    expect(getKey({ ne: { boo: 'false' } })).toBe('ne');
    expect(getKey({ asd: { boo: 'false' } })).toBe('asd');
  });
});

describe("getValue() testing", () => {
  test("getValue should get the correct first value", () => {
    expect(getValue({ eq: { boo: 'false' } })).toStrictEqual({ boo: 'false' })
  });
});

describe("useOperator() testing", () => {
  test("useOperator() should return equals operator", () => {
    expect(useOperator({ eq: { boo: 'false' } })).toBe('==');
  });

  test("useOperator() should return different (not equal) operator", () => {
    expect(useOperator({ ne: { boo: 'false' } })).toBe('!=');
  });
  
  test("useOperator() should return greater than operator", () => {
    expect(useOperator({ gt: { num: 3 } })).toBe('>');
  });
  
  test("useOperator() should return less then operator", () => {
    expect(useOperator({ lt: {  num: 3 } })).toBe('<');
  });
  
  test("useOperator() should return greater or equal operator", () => {
    expect(useOperator({ ge: {  num: 3 } })).toBe('>=');
  });
  
  test("useOperator() should return less or equal operator", () => {
    expect(useOperator({ le: {  num: 3 } })).toBe('<=');
  });
  
  test("useOperator() should return equals operator for any other string passed", () => {
    expect(useOperator({ aa: {  num: 3 } })).toBe('==');
  });

  test("useOperator() should return always equals operator for boolean type if operator is not equals or different", () => {
    expect(useOperator({ gt: {  boo: "true" } })).toBe('==');
    expect(useOperator({ lt: {  boo: "true" } })).toBe('==');
    expect(useOperator({ ge: {  boo: "true" } })).toBe('==');
    expect(useOperator({ le: {  boo: "true" } })).toBe('==');
  });
});

describe("sanitizeQuery()", () => {
  test("sanitizeQuery() should return true if query 'boo' && 'true'.", () => {
    const res = sanitizeQuery({isTest: {boo: "true"}});
    expect(res).toBe(true);
  });

  test("sanitizeQuery() should return false if query 'boo' && 'false'.", () => {
    const res = sanitizeQuery({isTest: {boo: "false"}});
    expect(res).toBe(false);
  });

  test("sanitizeQuery() should NOT return string or number if query 'boo'.", () => {
    const res = sanitizeQuery({isTest: {boo: "false"}});
    expect(typeof res).not.toBe('string');
    expect(typeof res).not.toBe('number');
  });

  test("sanitizeQuery() should return the number if query 'eq', 'num' '1'.", () => {
    const res = sanitizeQuery({ eq: { num: '1' } });
    expect(res).toBe(1);
  });

  test("sanitizeQuery() should return the string if query 'eq' && 'str' even if is a text like boolean.", () => {
    const res = sanitizeQuery({eq: {str: "false"}});
    expect(res).toBe("false"); // string "false"
  });

  test("sanitizeQuery() should return the string if query 'eq' && 'str' even if the text like number.", () => {
    const res = sanitizeQuery({eq: {str: "1"}});
    expect(res).toBe("1"); // string "1"
  });

  test("sanitizeQuery() should return the number if query 'num' && '1'.", () => {
    const res = sanitizeQuery({eq: {num: "1"}});
    expect(res).toBe(1);
  });

  test.skip("sanitizeQuery() should return error if...", () => {
    // create test conditions that this function will return error
  });

});

describe('sortQueryData()', () => {
  test("sortQueryData() should sort by name asc", () => {
    const sortedData = { 
      ...mockedData.sort((a, b) => sortGetData(a, b, { orderBy: { asc: 'name' } }))
    };
    const compSortData = {
      ...mockedData.sort((a, b) => {
        if (a.name > b.name) {
          return 1;
        } else if (a.name < b.name) {
          return -1;
        }
        return 0;
      })
    };
    expect(sortedData).toStrictEqual(compSortData);
  });

  test("sortQueryData() should sort by name desc", () => {
    const sortedData = {
      ...mockedData.sort((a, b) => sortGetData(a, b, { orderBy: { desc: 'name' } }))
    };
    const compSortData = {
      ...mockedData.sort((a, b) => {
        if (a.name < b.name) {
          return 1;
        } else if (a.name > b.name) {
          return -1;
        }
        return 0;
      })
    }
    expect(sortedData).toStrictEqual(compSortData);
  });
  test("sortQueryData() should sort by age asc", () => {
    const sortedData = {
      ...mockedData.sort((a, b) => sortGetData(a, b, { orderBy: { asc: 'age' } }))
    };
    const compSortData ={ ...mockedData.sort((a, b) => {
        if (a.age > b.age) {
          return 1;
        } else if (a.age < b.age) {
          return -1;
        }
        return 0;
      })
    };
    expect(sortedData).toStrictEqual(compSortData);
  });
  test("sortQueryData() should sort by age desc", () => {
    const sortedData = { 
      ...mockedData.sort((a, b) => sortGetData(a, b, { orderBy: { desc: 'age' } }))
    };
    const compSortData = {
      ...mockedData.sort((a, b) => {
        if (a.age < b.age) {
          return 1;
        } else if (a.age > b.age) {
          return -1;
        }
        return 0;
      })
    }
    expect(sortedData).toStrictEqual(compSortData);
  });
  test("sortQueryData() should sort by timestamp asc", () => {
    const sortedData = {
      ...mockedData.sort((a, b) => sortGetData(a, b, { orderBy: { asc: 'timestamp' } }))
    };
    const compSortData = {
      ...mockedData.sort((a, b) => {
        if (a.timestamp > b.timestamp) {
          return 1;
        } else if (a.timestamp < b.timestamp) {
          return -1;
        }
        return 0;
      })};
    expect(sortedData).toStrictEqual(compSortData);
  });
  test("sortQueryData() should sort by timestamp desc", () => {
    const sortedData = {
      ...mockedData.sort((a, b) => sortGetData(a, b, { orderBy: { desc: 'timestamp' } }))
    };
    const compSortData = {
      ...mockedData.sort((a, b) => {
        if (a.timestamp < b.timestamp) {
          return 1;
        } else if (a.timestamp > b.timestamp) {
          return -1;
        }
        return 0;
      })
    };
    expect(sortedData).toStrictEqual(compSortData);
  });
  
  test("sortQueryData() if no sort query specified should sort by timestamp desc automatically", () => {
    const sortedData = {...mockedData.sort((a, b) => sortGetData(a, b, {}))};
    const compSortData = {...mockedData.sort((a, b) => {
      if (a.timestamp < b.timestamp) {
        return 1;
      } else if (a.timestamp > b.timestamp) {
        return -1;
      }
      return 0;
    })};
    expect(sortedData).toStrictEqual(compSortData);
  });
});