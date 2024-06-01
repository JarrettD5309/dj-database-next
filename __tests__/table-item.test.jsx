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
  test('has a div with artist, and details is not open because button was NOT clicked', () => {

    render(<TableItem track={mockTrack} />);

    const artist = screen.getByText(mockTrack.artist);
    const discogsLink = screen.queryByText(mockTrack.discogsLink);

    expect(artist).toBeInTheDocument();
    expect(discogsLink).not.toBeInTheDocument();

  });

  test('has a Discogs Link when details is open because button was clicked', async () => {

    render(<TableItem track={mockTrack} />);

    const button = screen.getByRole('button');
    await user.click(button);

    const discogsLink = screen.getByRole('link', { name: mockTrack.discogsLink });

    expect(discogsLink).toBeInTheDocument();

  });
});