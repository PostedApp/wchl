import { iterate } from "../../src/_helpers";
import {
  isFeed,
  ListByChannelId,
  ListByPlaylistId,
  ListByUser,
} from "../../src/Feeds";

const sample = {
  channelId: [
    "UC_x5XG1OV2P6uZZ5FSM9Ttw",
    "UCMDQxm7cUx3yXkfeHa5zJIQ",
    "UCcHtON7kozuDNHHacS08luA",
  ],
  user: "Google Developers",
  playlistId: "PLOU2XLYxmsIKPKGv5m_NXz1i3yv50_eq5",
};

describe(".List", () => returnsFeed());

function returnsFeed() {
  test(`ByChannelId`, async () => {
    const response = await iterate(ListByChannelId(sample.channelId), {
      limit: Infinity,
    });
    expect(
      response.length === sample.channelId.length && response.every(isFeed)
    ).toBe(true);
  });

  test(`PlaylistId`, async () => {
    const response = await iterate(ListByPlaylistId(sample.playlistId));
    expect(response.every(isFeed)).toBe(true);
  });

  test(`ByUser`, async () => {
    const response = await iterate(ListByUser(sample.user));
    expect(response.every(isFeed)).toBe(true);
  });
}
