import { render, screen } from "@testing-library/react"
import TableItem from '../../src/components/table/table-item';
import user from '@testing-library/user-event';
import { mockTrack } from "../consts/mocks";

function renderComponent() {
  render(<TableItem track={mockTrack} />);
}

describe('TableItem', () => {
  test('has a div with artist, songTitle, bpm, position, and rpm', () => {
    const mockTrackVisibleBeforeClick = {
      artist: mockTrack.artist,
      songTitle: mockTrack.songTitle,
      bpm: mockTrack.bpm,
      position: mockTrack.position,
      rpm: mockTrack.rpm
    };

    renderComponent();

    for (let key in mockTrackVisibleBeforeClick) {
      const value = mockTrackVisibleBeforeClick[key];

      const valueDiv = screen.queryByText(new RegExp(value));

      expect(valueDiv).toBeInTheDocument();
    }
  });

  test('should not have a Discogs Link before button is clicked', () => {
    renderComponent();

    const discogsLink = screen.queryByText(mockTrack.discogsLink);

    expect(discogsLink).not.toBeInTheDocument();
  });

  test('has a Discogs Link when details is open because button was clicked', async () => {
    renderComponent();

    const button = screen.getByRole('button');
    await user.click(button);

    const discogsLink = screen.getByRole('link', { name: mockTrack.discogsLink });

    expect(discogsLink).toBeInTheDocument();
  });
});