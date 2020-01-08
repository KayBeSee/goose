import { gql } from 'apollo-boost'

const createUser = gql`
mutation($data: CreateUserInput!) {
  createUser(
    data: $data
  ) {
    token,
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
  mutation($data: CreateSongInput!) {
    createSong(
      data: $data
    ) {
      id
      name
      notes
    }
  }
`;

const createShow = gql`
  mutation($data: CreateShowInput!) {
    createShow(
      data: $data
    ) {
      id
      date
      venue
      notes
    }
  }
`;

export { createUser, login, getProfile, getUsers, createSong, createShow }