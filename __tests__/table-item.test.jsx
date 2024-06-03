import { render, screen } from "@testing-library/react"
import TableItem from '../src/components/table/table-item';
import user from '@testing-library/user-event';

const mockTrack = {
  artist: 'The Beatles',
  songTitle: 'Yellow Submarine',
  bpm: 90,
  position: 'A1',
  rpm: 33,
  genres: ['Rock'],
  release: 'Yellow Submarine',
  year: 1969,
  discogsLink: 'https://www.discogs.com/The-Beatles-Yellow-Submarine/release/123456',
};

describe('TableItem', () => {
  test('has a div with artist, songTitle, bpm, position, and rpm', () => {

    const mockTrackVisibleBeforeClick = {
      artist: mockTrack.artist,
      songTitle: mockTrack.songTitle,
      bpm: mockTrack.bpm,
      position: mockTrack.position,
      rpm: mockTrack.rpm
    };

    render(<TableItem track={mockTrack} />);

    for (let key in mockTrackVisibleBeforeClick) {
      const value = mockTrackVisibleBeforeClick[key];

      const valueDiv = screen.queryByText(new RegExp(value));

      expect(valueDiv).toBeInTheDocument();
    }

  });

  test('should not have a Discogs Link before button is clicked', () => {
    render(<TableItem track={mockTrack} />);

    const discogsLink = screen.queryByText(mockTrack.discogsLink);

    expect(discogsLink).not.toBeInTheDocument();
  })

  test('has a Discogs Link when details is open because button was clicked', async () => {

    render(<TableItem track={mockTrack} />);

    const button = screen.getByRole('button');
    await user.click(button);

    const discogsLink = screen.getByRole('link', { name: mockTrack.discogsLink });

    expect(discogsLink).toBeInTheDocument();

  });
});