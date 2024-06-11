import { render, screen } from "@testing-library/react";
import AddTrackForm from '../src/components/add-track-form';
import user from '@testing-library/user-event';
import { createTrack } from '../src/actions/create-track';

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

jest.mock('../src/actions/create-track', () => ({
  createTrack: jest.fn()
}));

describe('AddTrackFormMock', () => {
  test('createTrack should be called if a valid form is submitted', async () => {
    render(<AddTrackForm />);

    for (let label of inputLabels) {
      if (label === 'BPM' || label === 'RPM') {
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

    const button = screen.getByRole('button');

    await user.click(button);

    expect(createTrack).toHaveBeenCalled();
  });
});