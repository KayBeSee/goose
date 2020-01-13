import 'cross-fetch/polyfill'
import prisma from '../src/prisma'
import seedDatabase, { trackOne, trackTwo } from './utils/seedDatabase'
import getClient from './utils/getClient'
import { createShow } from './utils/operations'

const client = getClient();

beforeEach(seedDatabase);

test('Should create a new show', async () => {
  const variables = {
    data: {
      date: "4/20/2019",
      venue: {
        create: {
          name: 'Mission Ballroom',
          city: 'Denver',
          state: 'CO'
        }
      },
      setlist: {
        create: [
          {
            name: "SET_1",
            tracks: {
              connect: [
                { id: trackOne.track.id },
                { id: trackTwo.track.id }
              ]
            }
          },
          {
            name: "SET_2",
            tracks: {
              connect: [
                { id: trackOne.track.id },
                { id: trackTwo.track.id }
              ]
            }
          }
        ]
      }
    }
  };

  const response = await client.mutate({
    mutation: createShow,
    variables
  });

  const exists = await prisma.exists.Show({
    id: response.data.createShow.id
  })

  expect(exists).toBe(true)
});

