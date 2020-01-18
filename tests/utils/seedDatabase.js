import jwt from 'jsonwebtoken'
import prisma from '../../src/prisma'
import { userOne, userTwo, songOne, songTwo, trackOne, trackTwo, setOne, setTwo, showOne } from './seedDatabase-entities'

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

  // create showOne
  showOne.show = await prisma.mutation.createShow({
    data: showOne.input
  }, '{ id date venue { id name city state } setlist { id name tracks { id notes song { id name } } } }');

  trackOne.track = showOne.show.setlist[0].tracks[0];
  trackTwo.track = showOne.show.setlist[0].tracks[1];

  songOne.song = showOne.show.setlist[0].tracks[0].song;
  songTwo.song = showOne.show.setlist[0].tracks[1].song;

  // setOne.input.show.connect.id = showOne.show.id;
  // setTwo.input.show.connect.id = showOne.show.id;



}

export { seedDatabase as default, userOne, userTwo, songOne, songTwo, trackOne, trackTwo }