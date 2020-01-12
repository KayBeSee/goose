import { gql } from 'apollo-boost'

const createUser = gql`
mutation($data: UserCreateInput!) {
  createUser(
    data: $data
  ) {
    token
    user {
      id
      name
      email
    }
  }
}`;

const getUsers = gql`
  query {
    users {
      id
      name
      email
    }
  }
`;

const login = gql`
    mutation($data: LoginUserInput!) {
      login (
        data: $data
      ) {
        token
      }
    }
  `;

const getProfile = gql`
  query {
    me {
      id
      name
      email
    }
  }
`;

const createSong = gql`
  mutation($data: SongCreateInput!) {
    createSong(
      data: $data
    ) {
      id
      name
      notes
      tracks {
        id
      }
    }
  }
`;

const createTrack = gql`
  mutation($data: TrackCreateInput!) {
    createTrack(
      data: $data
    ) {
      id
      notes
      song {
        id
        name
      }
    }
  }
`;

const createShow = gql`
  mutation($data: ShowCreateInput!) {
    createShow(
      data: $data
    ) {
      id
      date
      venue {
        name
        city
        state
      }
    }
  }
`;

export { createUser, login, getProfile, getUsers, createSong, createShow, createTrack }