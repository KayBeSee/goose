import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import prisma from '../../src/prisma'

const userOne = {
  input: {
    name: 'Jen',
    email: 'jen@example.com',
    password: bcrypt.hashSync('abcdef123')
  },
  user: undefined,
  jwt: undefined
}

const userTwo = {
  input: {
    name: 'Jeff',
    email: 'jeff@example.com',
    password: bcrypt.hashSync('PassForJeff')
  },
  user: undefined,
  jwt: undefined
}

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
}

export { seedDatabase as default, userOne, userTwo }