import { render, screen, cleanup, fireEvent, waitFor } from "@testing-library/react";
import renderer from 'react-test-renderer';
import App from '../App';

afterEach(() => {
  cleanup();
});

// TODO: write test case to verify different scenarios, disable and deleting the value

test('should render calculator component', () => {
  render(<App />);
  const calculatorCard = screen.getByTestId('calculator-card');
  const addRowButton = screen.getByTestId('add-row-btn');
  const resultSpan = screen.getByTestId('result-span');

  expect(calculatorCard).toBeInTheDocument();
  expect(addRowButton).toBeInTheDocument();
  expect(resultSpan).toBeInTheDocument();
});

test('add 2 rows, assign values, and check the result', async () => {
  render(<App />);
  const addRowButton = screen.getByTestId('add-row-btn');

  fireEvent.click(addRowButton);
  let listItem0;
  await waitFor(() => {
    listItem0 = screen.getByTestId('input-0');
    expect(listItem0).toBeInTheDocument();
  });

  listItem0 && fireEvent.change(listItem0, { target: { value: '2' } });

  fireEvent.click(addRowButton);
  let listItem1;
  await waitFor(() => {
    listItem1 = screen.getByTestId('input-1');
    expect(listItem1).toBeInTheDocument();
  });

  listItem1 && fireEvent.change(listItem1, { target: { value: '3' }});

  const resultComponent = screen.getByTestId('result-span');
  expect(resultComponent).toHaveTextContent('5');
});

test('matches snapshot', () => {
  const tree = renderer.create(<App />).toJSON();
  expect(tree).toMatchSnapshot();
});

