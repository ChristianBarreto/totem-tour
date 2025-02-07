import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import TablePagination from "..";

describe("TablePagination component tests", () => {
  test("TabePagination should show a select", () => {
    const query = {};
    const setQuery = jest.fn();
    render(
      <TablePagination
        query={query}
        setQuery={setQuery}
      />
    )
    const select = screen.getByRole('combobox');
    expect(select).toBeInTheDocument();
  })

  test("TabePagination should be selected 10 as default and options 20 and 50", () => {
    const query = {};
    const setQuery = jest.fn();
    render(
      <TablePagination
        query={query}
        setQuery={setQuery}
      />
    )
    const options = screen.getAllByRole('option')
    expect(options[0]).toHaveValue("10");
    expect(options[1]).toHaveValue("20");
    expect(options[2]).toHaveValue("50");
  })

  test("TabePagination should trigger set state if select option change", () => {
    const query = {};
    const setQuery = jest.fn();
    render(
      <TablePagination
        query={query}
        setQuery={setQuery}
      />
    )
    const select = screen.getByRole('combobox')
    userEvent.selectOptions(select, "20");
    expect((screen.getByRole('option', {name: '10'}) as HTMLOptionElement).selected).toBe(true)
  })

  test("TabePagination should change the query if selected a limit option", async () => {
    type Query = {
      limit: string
    }
    let query = {};
    const setQuery = (set: Query) => {
      query = set
    };
    setQuery({limit: "10"});
    render(
      <TablePagination
        query={query}
        setQuery={setQuery}
      />
    )
    const select = screen.getByRole('combobox')
    await userEvent.selectOptions(select, "20");
    expect((screen.getByRole('option', {name: "20"}) as HTMLOptionElement).selected).toBe(true);
    expect(query).toMatchObject({limit: "20"});
  })
})