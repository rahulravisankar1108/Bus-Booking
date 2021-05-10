/* eslint-disable no-undef */
import { render, screen } from '@testing-library/react';
import React from 'react';
import App from './App';

test('renders learn react link', () => {
  const getByText = render(<App />);
  const linkElement = screen.getByText(/AddBus/i);
  expect(linkElement).toBeInTheDocument();
});
