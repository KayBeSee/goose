import { getUserId } from '../utils';

export const Query = {
  users(parent, args, { prisma }, info) {
    const opArgs = {
      where: args.where,
      first: args.first,
      skip: args.skip,
      after: args.after,
      orderBy: args.orderBy
    };

    if (args.query) {
      opArgs.where = {
        OR: [
          { name_contains: args.query }
        ]
      }
    }

    return prisma.query.users(opArgs, info)
  },
  async me(parent, args, { prisma, request }, info) {
    const userId = getUserId(request);

    return await prisma.query.user({
      where: {
        id: userId
      }
    }, info);
  },
  async shows(parent, args, { prisma, request }, info) {
    const opArgs = {
      where: args.where,
      first: args.first,
      skip: args.skip,
      after: args.after,
      orderBy: args.orderBy
    };

    return await prisma.query.shows(opArgs, info);
  },
  async show(parent, args, { prisma }, info) {
    return await prisma.query.show(args, info);
  },
  async songs(parent, args, { prisma }, info) {
    const opArgs = {
      where: args.where,
      first: args.first,
      skip: args.skip,
      after: args.after,
      orderBy: args.orderBy
    };

    return await prisma.query.songs(opArgs, info);
  },
  async song(parent, args, { prisma }, info) {
    const opArgs = {
      where: args.where,
      first: args.first,
      skip: args.skip,
      after: args.after,
      orderBy: args.orderBy
    };

    return await prisma.query.song(opArgs, info);
  },
  async track(parent, args, { prisma }, info) {
    const opArgs = {
      where: args.where,
      first: args.first,
      skip: args.skip,
      after: args.after,
      orderBy: args.orderBy
    };

    return await prisma.query.track(opArgs, info);
  },
  async venues(parent, args, { prisma }, info) {
    return await prisma.query.venues();
  },

  async videos(parent, args, { prisma, request }, info) {
    const opArgs = {
      where: args.where,
      first: args.first,
      skip: args.skip,
      after: args.after,
      orderBy: args.orderBy
    };

    return await prisma.query.videos(opArgs, info);
  },
};