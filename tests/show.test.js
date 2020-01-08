import 'cross-fetch/polyfill'
import prisma from '../src/prisma'
import seedDatabase from './utils/seedDatabase'
import getClient from './utils/getClient'
import { createShow } from './utils/operations'

const client = getClient();

beforeEach(seedDatabase);

// test('Should create a new show', async () => {
//   const variables = {
//     data: {
//       date: "12/21/2019",
//       notes: "Goosemass VI"
//     }
//   }

//   const response = await client.mutate({
//     mutation: createShow,
//     variables
//   });

//   console.log('response: ', response);

//   const exists = await prisma.exists.Song({
//     id: response.data.createShow.show.id
//   })

//   expect(exists).toBe(true)
// });