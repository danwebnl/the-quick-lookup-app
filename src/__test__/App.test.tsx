import { render, screen, fireEvent } from "@testing-library/react";
import App from "App";

describe("Make 'Summary' select box active", () => {
  test("should render a radio button available to make the 'Summary' select box active", () => {
    render(<App />);
    const radioElement = screen.getByRole("radio", { name: "Summary" });
    expect(radioElement).toBeInTheDocument();
  });

  test("should have the radio button checked after click", () => {
    render(<App />);
    const radioElement = screen.getByRole("radio", { name: "Summary" });
    fireEvent.click(radioElement);
    expect(radioElement).toBeChecked();
  });

  test("should render select box 'Summary'", () => {
    render(<App />);
    const selectElement = screen.getByTestId("select-summary");
    expect(selectElement).toBeInTheDocument();
  });

  test("should make the select box 'Summary' active", () => {
    render(<App />);
    const radioElement = screen.getByRole("radio", { name: "Summary" });
    fireEvent.click(radioElement);
    const selectElement = screen.getByTestId("select-summary");
    expect(selectElement).not.toBeDisabled();
  });
});

describe("Correct output when selecting ‘Enthousiasm’ for participant 1", () => {
  test("should render 'Participant' select box", () => {
    render(<App />);
    const selectElement = screen.getByTestId("select-participant");
    expect(selectElement).toBeInTheDocument();
  });

  test("should render 'Competency' select box", () => {
    render(<App />);
    const selectElement = screen.getByTestId("select-competency");
    expect(selectElement).toBeInTheDocument();
  });

  test("should select option in 'Participant' select box", () => {
    render(<App />);
    const selectElement = screen.getByTestId("select-participant");
    fireEvent.change(selectElement, { target: { value: 1 } });
    expect(selectElement).toHaveValue("1");
  });

  test("should select option in 'Competency' select box", () => {
    render(<App />);
    const selectElement = screen.getByTestId("select-competency");
    fireEvent.change(selectElement, { target: { value: "Enthousiasm" } });
    expect(selectElement).toHaveValue("Enthousiasm");
  });

  test("should get the correct result after selecting 'Participant' and 'Competency' select boxes", () => {
    render(<App />);

    const selectElementP = screen.getByTestId("select-participant");
    fireEvent.change(selectElementP, { target: { value: 1 } });

    const selectElementC = screen.getByTestId("select-competency");
    fireEvent.change(selectElementC, { target: { value: "Enthousiasm" } });

    const resultElement = screen.getByText(
      "Vera Voorbeeld has a score of 4.8 for Enthousiasm"
    );

    expect(resultElement).toBeInTheDocument();
  });
});

describe("Correct output when selecting `total` for participant 2", () => {
  test("should select option in 'Participant' select box", () => {
    render(<App />);
    const selectElement = screen.getByTestId("select-participant");
    fireEvent.change(selectElement, { target: { value: 2 } });
    expect(selectElement).toHaveValue("2");
  });

  test("should select option in 'Competency' select box", () => {
    render(<App />);
    const selectElement = screen.getByTestId("select-competency");
    fireEvent.change(selectElement, { target: { value: "Total" } });
    expect(selectElement).toHaveValue("Total");
  });

  test("should get the correct result after selecting 'Participant' and 'Competency' select boxes", () => {
    render(<App />);

    const selectElementP = screen.getByTestId("select-participant");
    fireEvent.change(selectElementP, { target: { value: 2 } });

    const selectElementC = screen.getByTestId("select-competency");
    fireEvent.change(selectElementC, { target: { value: "Total" } });

    const resultElement = screen.getByText(
      "Donald Duck has no score for Total"
    );

    expect(resultElement).toBeInTheDocument();
  });
});

describe("Correct output when selecting `MBOLevel` with summary `type`", () => {
  test("should render 'Summary' select box", () => {
    render(<App />);
    const selectElement = screen.getByTestId("select-summary");
    expect(selectElement).toBeInTheDocument();
  });

  test("should make the select box 'Summary' active", () => {
    render(<App />);
    const radioElement = screen.getByRole("radio", { name: "Summary" });
    fireEvent.click(radioElement);
    const selectElement = screen.getByTestId("select-summary");
    expect(selectElement).not.toBeDisabled();
  });

  test("should select option in 'Competency' select box", () => {
    render(<App />);
    const selectElement = screen.getByTestId("select-competency");
    fireEvent.change(selectElement, { target: { value: "MBOLevel" } });
    expect(selectElement).toHaveValue("MBOLevel");
  });

  test("should select option in 'Summary' select box", () => {
    render(<App />);
    const selectElement = screen.getByTestId("select-summary");
    fireEvent.change(selectElement, { target: { value: "type" } });
    expect(selectElement).toHaveValue("type");
  });

  test("should get the correct result after selecting 'Summary' and 'Competency' select boxes", async () => {
    render(<App />);

    const radioElement = screen.getByRole("radio", { name: "Summary" });
    fireEvent.click(radioElement);
    const selectElementS = screen.getByTestId("select-summary");
    fireEvent.change(selectElementS, { target: { value: "type" } });

    const selectElementC = screen.getByTestId("select-competency");
    fireEvent.change(selectElementC, { target: { value: "MBOLevel" } });

    const resultElement = await screen.findByText(
      "The type of MBOLevel is 'level'"
    );

    expect(resultElement).toBeInTheDocument();
  });
});

describe("Correct output when selecting `Enthousiasm` with summary `average`", () => {
  test("should get the correct result after selecting 'Summary' and 'Competency' select boxes", async () => {
    render(<App />);

    const radioElement = screen.getByRole("radio", { name: "Summary" });
    fireEvent.click(radioElement);
    const selectElementS = screen.getByTestId("select-summary");
    fireEvent.change(selectElementS, { target: { value: "average" } });

    const selectElementC = screen.getByTestId("select-competency");
    fireEvent.change(selectElementC, { target: { value: "Enthousiasm" } });

    const resultElement = await screen.findByText(
      "The average score for Enthousiasm is 5.3"
    );

    expect(resultElement).toBeInTheDocument();
  });
});
