import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import prisma from '../../src/prisma'

const userOne = {
  input: {
    name: 'Peter',
    email: 'peter@goose.com',
    password: bcrypt.hashSync('mustache')
  },
  user: undefined,
  jwt: undefined
}

const userTwo = {
  input: {
    name: 'Rick',
    email: 'rick@goose.com',
    password: bcrypt.hashSync('mustache')
  },
  user: undefined,
  jwt: undefined
}

const songOne = {
  input: {
    name: 'Arcadia',
    notes: 'Released on Moon Cabin'
  },
  song: undefined
}

const songTwo = {
  input: {
    name: 'Lead the Way',
    notes: 'Released on Moon Cabin'
  },
  song: undefined
}

// const showOne = {
//   input: {
//     date: '12/21/2019',
//     venue: {
//       name: 'The Wall Street Theater',
//       city: 'Norwalk',
//       state: 'CT'
//     },
//     notes: 'Goosemass VI'
//   },
//   show: undefined
// }

// const showTwo = {
//   input: {
//     date: '7/13/2019',
//     venue: {
//       name: 'Paradise Music Festival',
//       city: 'Covington',
//       state: 'KY'
//     },
//     notes: 'Pretty dope beer festival'
//   },
//   show: undefined
// }


const seedDatabase = async () => {
  // delete test data
  await prisma.mutation.deleteManyUsers();

  // create userOne
  userOne.user = await prisma.mutation.createUser({
    data: userOne.input
  });

  userOne.jwt = jwt.sign({ userId: userOne.user.id }, process.env.JWT_TOKEN_SECRET)

  // create userTwo
  userTwo.user = await prisma.mutation.createUser({
    data: userTwo.input
  });

  userTwo.jwt = jwt.sign({ userId: userTwo.user.id }, process.env.JWT_TOKEN_SECRET)

  // showOne.show = await prisma.mutation.createShow({
  //   data: {
  //     ...showOne.input,
  //     venue: {
  //       create: {
  //         ...showOne.input.venue
  //       }
  //     }
  //   }
  // });

  // showTwo.show = await prisma.mutation.createShow({
  //   data: {
  //     ...showTwo.input,
  //     venue: {
  //       create: {
  //         ...showTwo.input.venue
  //       }
  //     }
  //   }
  // });

  songOne.song = await prisma.mutation.createSong({
    data: songOne.input
  });

  songTwo.song = await prisma.mutation.createSong({
    data: songTwo.input
  });
}

export { seedDatabase as default, userOne, userTwo, songOne, songTwo }