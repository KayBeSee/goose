import 'cross-fetch/polyfill'
import prisma from '../src/prisma'
import seedDatabase, { songTwo, trackOne, trackTwo, songOne } from './utils/seedDatabase'
import getClient from './utils/getClient'
import { createSet, createTrack } from './utils/operations'

const client = getClient();

beforeEach(seedDatabase);

test('Should create a new set', async () => {  
  const variables = {
    data: {
      name: "SET_1",
      tracks: {
        connect: {
          id: trackOne.track.id
        }
      }
    }
  }

  const response = await client.mutate({
    mutation: createSet,
    variables
  });

  const exists = await prisma.exists.Set({
    id: response.data.createSet.id
  })

  expect(exists).toBe(true)
});

test('should maintain a list of tracks', async () => {

  const createdSet = await client.mutate({
    mutation: createSet,
    variables: {
      data: {
        name: "SET_1"
      }
    }
  })

  const track1Variables = {
    data: {
      notes: 'First time played',
      song: {
        connect: {
          id: songTwo.song.id
        }
      },
      set: {
        connect: {
          id: createdSet.data.createSet.id
        }
      }
    }
  }

  const track2Variables = {
    data: {
      notes: 'First time played',
      song: {
        connect: {
          id: songOne.song.id
        }
      },
      set: {
        connect: {
          id: createdSet.data.createSet.id
        }
      }
    }
  }

  await client.mutate({
    mutation: createTrack,
    variables: track1Variables
  });

  await client.mutate({
    mutation: createTrack,
    variables: track2Variables
  });

  const set = await prisma.query.set({
    where: {
      id: createdSet.data.createSet.id
    }
  }, '{ id name tracks { song { id name } } }')

  expect(set.tracks.length).toBe(2)
});