import jwt from 'jsonwebtoken'
import prisma from '../../src/prisma'
import { userOne, userTwo, songOne, songTwo, trackOne, trackTwo, showOne } from './seedDatabase-entities'

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

  // create songOne
  songOne.song = await prisma.mutation.createSong({
    data: songOne.input
  });

  // create songTwo
  songTwo.song = await prisma.mutation.createSong({
    data: songTwo.input
  });

  // create trackOne
  trackOne.input.song.connect.id = songOne.song.id
  trackOne.track = await prisma.mutation.createTrack({
    data: trackOne.input
  });

  // create trackOne
  trackTwo.input.song.connect.id = songOne.song.id
  trackTwo.track = await prisma.mutation.createTrack({
    data: trackTwo.input
  })

  // add set1
  showOne.input.setlist.create[0].tracks.connect[0].id = trackOne.track.id;
  showOne.input.setlist.create[0].tracks.connect[1].id = trackTwo.track.id;
  // add set2 to input
  showOne.input.setlist.create[1].tracks.connect[0].id = trackOne.track.id;
  showOne.input.setlist.create[1].tracks.connect[1].id = trackTwo.track.id;

  // create showOne
  showOne.show = await prisma.mutation.createShow({
    data: showOne.input
  }, '{ id date venue { id name city state } setlist { id name tracks { id notes song { id name } } } }');

  console.log('showOne: ', JSON.stringify(showOne.show, null, 2))
}

export { seedDatabase as default, userOne, userTwo, songOne, songTwo, trackOne, trackTwo }