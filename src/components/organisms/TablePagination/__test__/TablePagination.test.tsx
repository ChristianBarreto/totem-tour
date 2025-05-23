import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import TablePagination from "..";

type Query = {
  limit: string
}
let query = {};
const setQuery = (set: Query) => {
  query = set
};

describe("TablePagination component tests", () => {
  test("TabePagination should show a select limit", () => {
    render(
      <TablePagination
        query={query}
        setQuery={setQuery}
        count={1}
      />
    )
    const select = screen.getByRole('combobox');
    expect(select).toBeInTheDocument();
  })

  test("TabePagination should be selected 10 as default and options 20 and 50", () => {
    render(
      <TablePagination
        query={query}
        setQuery={setQuery}
        count={1}
      />
    )
    const options = screen.getAllByRole('option')
    expect(options[0]).toHaveValue("10");
    expect(options[1]).toHaveValue("20");
    expect(options[2]).toHaveValue("50");
  })

  test("TabePagination should trigger set state if select option change", () => {
    render(
      <TablePagination
        query={query}
        setQuery={setQuery}
        count={1}
      />
    )
    const select = screen.getByRole('combobox')
    userEvent.selectOptions(select, "20");
    expect((screen.getByRole('option', {name: '10'}) as HTMLOptionElement).selected).toBe(true)
  })

  test("TabePagination should change the query if selected a limit option", async () => {
    render(
      <TablePagination
        query={query}
        setQuery={setQuery}
        count={1}
      />
    )
    const select = screen.getByRole('combobox')
    await userEvent.selectOptions(select, "20");
    expect((screen.getByRole('option', {name: "20"}) as HTMLOptionElement).selected).toBe(true);
    expect(query).toMatchObject({limit: "20"});
  })

  test("TabePagination should show at least one button", () => {
    render(
      <TablePagination
        query={query}
        setQuery={setQuery}
        count={1}
      />
    )
    const buttons = screen.getAllByTestId('pagination-button')
    expect(buttons[0]).toBeInTheDocument();
    expect(buttons[0]).toHaveTextContent("1");
  })

  test("TabePagination should show number of buttons according to quantity and limit", () => {
    render(
      <TablePagination
        query={query}
        setQuery={setQuery}
        count={20}
      />
    )
    const buttons = screen.getAllByTestId('pagination-button');
    expect(buttons[0]).toHaveTextContent("2");
  })

  test("TabePagination should show page buttons", async () => {
    render(
      <TablePagination
        query={query}
        setQuery={setQuery}
        count={1}
      />
    )
    const buttons = screen.getAllByTestId('pagination-button')

    await userEvent.click(buttons[0]);
    expect(query).toMatchObject({page: "1"});
  })
})