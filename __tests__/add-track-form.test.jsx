import { render, screen } from "@testing-library/react";
import AddTrackForm from '../src/components/add-track-form';
import user from '@testing-library/user-event';

const inputLabels = [
  'Artist',
  'Song Title',
  'Genre 1',
  'Genre 2',
  'BPM',
  'Position',
  'RPM',
  'Release Name',
  'Discogs Link',
  'Year'
];

function renderComponent() {
  render(<AddTrackForm />);
}

async function fillForm(emptyInput) {

  for (let label of inputLabels) {
    if (label === emptyInput) {

    } else if (label === 'BPM' || label === 'RPM') {
      const input = screen.getByRole('textbox', { name: new RegExp(label) });
      await user.click(input);
      await user.keyboard('99');
    } else if (label === 'Discogs Link') {
      const input = screen.getByRole('textbox', { name: new RegExp(label) });
      await user.click(input);
      await user.keyboard('https://www.test.com');
    } else {
      const input = screen.getByRole('textbox', { name: new RegExp(label) });
      await user.click(input);
      await user.keyboard('1900');
    }
  }

}

describe('AddTrackForm', () => {
  test('should have an input for each track data piece', () => {
    renderComponent();

    inputLabels.forEach((label) => {
      const input = screen.getByRole('textbox', { name: new RegExp(label) });
      expect(input).toBeInTheDocument();
    });
  });

  test('should have the same number of inputs as inputLabels', () => {
    renderComponent();

    const inputs = screen.getAllByRole('textbox');

    expect(inputs).toHaveLength(inputLabels.length);
  });

  test('should NOT have a red error box when there are no errors', () => {
    renderComponent();

    // screen.logTestingPlaygroundURL();

    const errorDiv = screen.queryByTestId('error-div');

    expect(errorDiv).not.toBeInTheDocument();
  });

  describe('form errors', () => {
    test('should show an error message when artist input is empty', async () => {
      renderComponent();

      const Artist = inputLabels[0];

      await fillForm(Artist);

      const button = screen.getByRole('button');
      await user.click(button);

      const errorDiv = screen.getByText(/\{"artist":\["string must contain at least 1 character\(s\)"\]\}/i);
      expect(errorDiv).toBeInTheDocument();
    });
  });
});