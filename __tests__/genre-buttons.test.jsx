import { render, screen } from "@testing-library/react";
import GenreButtons from '../src/components/genre-buttons';
import user from '@testing-library/user-event';
import { handleGenreButtonClick } from "../src/actions/handle-genre-button-click";

const mockGenres = [
  { genres: ['rock'] },
  { genres: ['blues'] },
  { genres: ['blues', 'folk'] }
];

const mockUniqueGenres = ['rock', 'blues', 'folk'];

jest.mock('../src/actions/handle-genre-button-click', () => ({
  handleGenreButtonClick: jest.fn()
}));

function renderComponent(genresProp) {
  render(<GenreButtons genres={genresProp} />);
}

describe('GenreButtons', () => {
  test('has one button with text all genres even if genres prop is empty', () => {
    renderComponent([]);

    const allButton = screen.getByRole('button', { name: /all genres/i});
    const buttons = screen.getAllByRole('button');

    expect(allButton).toBeInTheDocument();
    expect(buttons).toHaveLength(1);
  });

  test('should have a quanity of buttons which is unique genres +1', () => {
    renderComponent(mockGenres);

    const buttons = screen.getAllByRole('button');

    expect(buttons).toHaveLength(4);
  });

  test('should have a button with a name that matches each unique genre', () => {
    renderComponent(mockGenres);

    for (let genre of mockUniqueGenres) {
      const buttonWithName = screen.getByRole('button', { name: genre });

      expect(buttonWithName).toBeInTheDocument();
    }
  });

  test('handleGenreButtonOnClick should be called when a button is clicked', async () => {
    renderComponent(mockGenres);

    const rockButton = screen.getByRole('button', { name: /rock/i});

    await user.click(rockButton);

    expect(handleGenreButtonClick).toHaveBeenCalled();
  });
});