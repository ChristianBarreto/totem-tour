import { displayPrice } from "../helpers";

describe("displayPrice() tests", () => {
  test("Should display 0 cents as R$ 0,00", () => {
    expect(displayPrice(0)).toBe('R$\xa00,00');
  });
  test("Should display 0.12 cents as R$ 0,00", () => {
    expect(displayPrice(0.12)).toBe('R$\xa00,00');
  });
  test("Should display 1234 cents as R$ 12,34", () => {
    expect(displayPrice(1234)).toBe('R$\xa012,34');
  });
  test("Should display 12.34 cents as R$ 0,12", () => {
    expect(displayPrice(12.34)).toBe('R$\xa00,12')
  })
  test("Should display 12.34 cents times 100 as R$ 12,34", () => {
    expect(displayPrice(12.34 * 100)).toBe('R$\xa012,34')
  })
  test("Should display 0.34 cents times 100 as R$ 0,34", () => {
    expect(displayPrice(0.34 * 100)).toBe('R$\xa00,34')
  })
})