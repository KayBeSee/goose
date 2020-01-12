import 'cross-fetch/polyfill'
import prisma from '../src/prisma'
import seedDatabase from './utils/seedDatabase'
import getClient from './utils/getClient'
import { createSong } from './utils/operations'

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