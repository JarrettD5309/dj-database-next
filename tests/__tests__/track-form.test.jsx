import { render, screen } from "@testing-library/react";
import TrackForm from '../../src/components/track-form';
import user from '@testing-library/user-event';
import { createOrUpdateTrack } from "../../src/actions/create-or-update-track";
import { mockTrack } from "../consts/mocks";
import db from "../../src/db";

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

jest.mock('../../src/db', () => ({
  track: {
    create: jest.fn(),
    update: jest.fn()
  }
}));

jest.mock('next/cache', () => ({
  ...jest.requireActual(),
  revalidatePath: jest.fn()
}));

jest.mock('next/navigation', () => ({
  ...jest.requireActual(),
  redirect: jest.fn()
}));

function renderComponent(formStateFunc = createOrUpdateTrack, trackObj) {
  if (trackObj) {
    render(
      <TrackForm
        formStateFunction={formStateFunc}
        id={trackObj.id}
        artist={trackObj.artist}
        songTitle={trackObj.songTitle}
        genreOne={trackObj.genres[0]}
        genreTwo={trackObj.genres[1] || ''}
        bpm={trackObj.bpm.toString()}
        position={trackObj.position}
        rpm={trackObj.rpm.toString()}
        release={trackObj.release}
        discogsLink={trackObj.discogsLink}
        year={trackObj.year.toString()}
      />
    );
  } else {
    render(<TrackForm formStateFunction={formStateFunc} />);
  }
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

describe('TrackForm', () => {
  describe('Child of Add Track', () => {
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

    test('should NOT have an ID paragraph', () => {
      renderComponent();

      const idPara = screen.queryByText('ID');

      expect(idPara).not.toBeInTheDocument();
    });

    test('should NOT have a red error box when there are no errors', () => {
      renderComponent();

      const errorDiv = screen.queryByTestId('error-div');

      expect(errorDiv).not.toBeInTheDocument();
    });

    test('db.track.create should be called if a valid form is submitted', async () => {
      renderComponent();

      await fillForm();

      const button = screen.getByRole('button');

      await user.click(button);

      expect(db.track.create).toHaveBeenCalled();
      expect(db.track.update).not.toHaveBeenCalled();
    });

    test('db.track.create should NOT be called if an invalid form is submitted', async () => {
      renderComponent();

      const Artist = inputLabels[0];

      await fillForm(Artist);

      const button = screen.getByRole('button');

      await user.click(button);

      expect(db.track.create).not.toHaveBeenCalled();
      expect(db.track.update).not.toHaveBeenCalled();
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

  describe('Child of Track Page', () => {
    test('should show an ID', () => {
      renderComponent(createOrUpdateTrack, mockTrack);

      const idPara = screen.getByText(mockTrack.id);

      expect(idPara).toBeInTheDocument();
    });

    test('should have the same number of inputs as inputLabels plus hidden input', () => {
      renderComponent(createOrUpdateTrack, mockTrack);

      const inputs = screen.getAllByRole('textbox');

      expect(inputs).toHaveLength(inputLabels.length + 1);
    });

    test('should fill the form with the provided track data', () => {
      renderComponent(createOrUpdateTrack, mockTrack);

      for (const key in mockTrack) {
        const input = screen.getByDisplayValue(mockTrack[key]);
        expect(input).toBeInTheDocument();
      }
    });

    test('should NOT have a red error box when there are no errors', () => {
      renderComponent(createOrUpdateTrack, mockTrack);

      const errorDiv = screen.queryByTestId('error-div');

      expect(errorDiv).not.toBeInTheDocument();
    });

    test('db.track.update should be called if a valid form is submitted', async () => {
      renderComponent(createOrUpdateTrack, mockTrack);

      const button = screen.getByRole('button');

      await user.click(button);

      expect(db.track.update).toHaveBeenCalled();
      expect(db.track.create).not.toHaveBeenCalled();
    });

    test('db.track.update should NOT be called if an invalid form is submitted', async () => {
      renderComponent(createOrUpdateTrack, mockTrack);

      const Artist = inputLabels[0];

      const input = screen.getByRole('textbox', { name: new RegExp(Artist) });
      await user.click(input);
      await user.clear(input);

      const button = screen.getByRole('button');

      await user.click(button);

      expect(db.track.update).not.toHaveBeenCalled();
      expect(db.track.create).not.toHaveBeenCalled();
    });

    describe('form errors', () => {
      test('should show an error message when artist input is cleared by user', async () => {
        renderComponent(createOrUpdateTrack, mockTrack);

        const Artist = inputLabels[0];

        const input = screen.getByRole('textbox', { name: new RegExp(Artist) });
        await user.click(input);
        await user.clear(input);

        const button = screen.getByRole('button');
        await user.click(button);

        const errorDiv = screen.getByText(/\{"artist":\["string must contain at least 1 character\(s\)"\]\}/i);
        expect(errorDiv).toBeInTheDocument();
      });
    });
  });
});