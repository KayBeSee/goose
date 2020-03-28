import bcrypt from 'bcryptjs';
import { getUserId, generateJWTToken, hashPassword } from '../utils'

export const Mutation = {
  async createUser(parent, args, { prisma }, info) {
    const password = await hashPassword(args.data.password);
    const user = await prisma.mutation.createUser({
      data: {
        ...args.data,
        password
      }
    });

    return {
      user,
      token: generateJWTToken(user.id)
    }
  },
  async login(parent, args, { prisma }, info) {
    const user = await prisma.query.user({
      where: {
        email: args.data.email
      }
    });

    if (!user) {
      throw new Error('Unable to login')
    }

    const isMatch = await bcrypt.compare(args.data.password, user.password);
    if (!isMatch) {
      throw new Error('Unable to login')
    }

    return {
      user,
      token: generateJWTToken(user.id)
    }
  },
  async deleteUser(parent, args, { prisma, request }, info) {
    const userId = getUserId(request)

    return prisma.mutation.deleteUser({
      where: {
        id: userId
      }
    }, info)
  },
  async updateUser(parent, args, { prisma, request }, info) {
    const userId = getUserId(request);

    if (typeof args.data.password === 'string') {
      args.data.password = await hashPassword(args.data.password);
    }

    return prisma.mutation.updateUser({
      where: {
        id: userId
      },
      data: args.data
    }, info)
  },
  async createSong(parent, args, { prisma }, info) {
    const song = await prisma.mutation.createSong({
      data: args.data
    }, '{ id name notes tracks { id } }');
    return song
  },
  async createTrack(parent, args, { prisma }, info) {
    const track = await prisma.mutation.createTrack({
      data: args.data
    }, '{ id notes song { id name notes } }');
    return track
  },
  async createSet(parent, args, { prisma }, info) {
    const set = await prisma.mutation.createSet({
      data: args.data
    }, '{ id name tracks { id notes song { id name } } }');
    return set
  },
  async createShow(parent, args, { prisma }, info) {
    const show = await prisma.mutation.createShow({
      data: args.data
    }, '{ id date venue { id name city state } setlist { id name tracks { id notes song { id name } } } }');
    return show
  },
  async updateShow(parent, args, { prisma }, info) {
    console.log("args: ", args);
    const updatedShow = await prisma.mutation.updateShow({
      where: args.where,
      data: args.data
    }, '{ id date venue { id name city state } setlist { id name tracks { id notes song { id name } } } }');
    return updatedShow
  },
  async createVenue(parent, args, { prisma }, info) {
    const venue = await prisma.mutation.createVenue({
      data: args.data
    }, '{ id name city state }');
    return venue
  },
  async createVideo(parent, args, { prisma }, info) {
    const video = await prisma.mutation.createVideo({
      data: args.data
    }, '{ id videoId tracks { id song { id name } } }');
    return video
  },
  async deleteVideo(parent, args, { prisma }, info) {
    const video = await prisma.mutation.deleteVideo({
      where: args.where
    }, '{ id videoId tracks { id song { id name } } }');
    return video
  },
}