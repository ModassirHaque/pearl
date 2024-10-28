// frontend/components/DatePicker.test.jsx
import { render, screen, fireEvent } from '@testing-library/react';
import DatePicker from './DatePicker';

test('renders DatePicker and allows selecting options', () => {
  const handleSelect = jest.fn();
  render(<DatePicker onSelect={handleSelect} />);

  fireEvent.change(screen.getByLabelText(/Frequency/i), {
    target: { value: 'weekly' },
  });

  fireEvent.change(screen.getByLabelText(/Interval/i), {
    target: { value: '2' },
  });

  fireEvent.click(screen.getByText(/Set Recurrence/i));

  expect(handleSelect).toHaveBeenCalled();
});