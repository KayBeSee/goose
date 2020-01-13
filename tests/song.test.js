import 'cross-fetch/polyfill'
import prisma from '../src/prisma'
import seedDatabase, { songTwo } from './utils/seedDatabase'
import getClient from './utils/getClient'
import { createSong, createTrack } from './utils/operations'

const client = getClient();

beforeEach(seedDatabase);

test('Should create a new song', async () => {
  const variables = {
    data: {
      name: "Butter Rum",
      notes: "Released as single in a foreign place, with an ice cold mojito"
    }
  }

  const response = await client.mutate({
    mutation: createSong,
    variables
  });

  const exists = await prisma.exists.Song({
    id: response.data.createSong.id
  })

  expect(exists).toBe(true)
});

test('should maintain a list of tracks', async () => {
  const trackVariables = {
    data: {
      notes: 'First time played',
      song: {
        connect: {
          id: songTwo.song.id
        }
      },
      set: {
        create: {
          name: "SET_1"
        }
      }
    }
  }

  await client.mutate({
    mutation: createTrack,
    variables: trackVariables
  });

  await client.mutate({
    mutation: createTrack,
    variables: trackVariables
  });

  const song = await prisma.query.song({
    where: {
      id: songTwo.song.id
    }
  }, '{ id name notes tracks { id } }')

  expect(song.tracks.length).toBe(2)
});