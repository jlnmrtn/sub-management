import { render, screen } from '@testing-library/react';
import Header from '../../components/Header';

describe('Header', () => {
  test('renders Header component', () => {
    render(<Header />);
    const headerElement = screen.getByText(/Header Text/i);
    expect(headerElement).toBeInTheDocument();
  });
});
