import 'cross-fetch/polyfill'
import seedDatabase from './utils/seedDatabase'
import getClient from './utils/getClient'
import { createSong, createTrack } from './utils/operations'

const client = getClient();

beforeEach(seedDatabase);

test('Should create a new track associated with a song', async () => {
  const songVariables = {
    data: {
      name: "Butter Rum",
      notes: "Released as single in a foreign place, with an ice cold mojito"
    }
  }

  const createSongResponse = await client.mutate({
    mutation: createSong,
    variables: songVariables
  });

  const trackVariables = {
    data: {
      notes: 'First time played',
      song: {
        connect: {
          id: createSongResponse.data.createSong.id
        }
      },
      set: {
        create: {
          name: "SET_1"
        }
      }
    }
  }

  const createTrackResponse = await client.mutate({
    mutation: createTrack,
    variables: trackVariables
  });

  expect(createTrackResponse.data.createTrack.song.id).toBe(createSongResponse.data.createSong.id);
  expect(createTrackResponse.data.createTrack.notes).toBe(trackVariables.data.notes);
});