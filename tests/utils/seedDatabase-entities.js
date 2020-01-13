import bcrypt from 'bcryptjs'

export const userOne = {
    input: {
      name: 'Peter',
      email: 'peter@goose.com',
      password: bcrypt.hashSync('mustache')
    },
    user: undefined,
    jwt: undefined
  }
  
  export const userTwo = {
    input: {
      name: 'Rick',
      email: 'rick@goose.com',
      password: bcrypt.hashSync('mustache')
    },
    user: undefined,
    jwt: undefined
  }
  
  export const songOne = {
    input: {
      name: 'Arcadia',
      notes: 'Released on Moon Cabin'
    },
    song: undefined
  }
  
  export const songTwo = {
    input: {
      name: 'Lead the Way',
      notes: 'Released on Moon Cabin'
    }
  }
  
  export const trackOne = {
    input: {
      notes: 'First time played',
      song: {
        connect: {
          id: undefined
        }
      },
      set: {
        create: {
          name: "SET_1"
        }
      }
    },
    track: undefined
  }
  
  export const trackTwo = {
    input: {
      notes: 'with Trey Anastasio on guitar',
      song: {
        connect: {
          id: undefined
        }
      },
      set: {
        create: {
          name: "SET_2"
        }
      }
    },
    track: undefined
  }

  export const showOne =  {
    input: {
      date: "4/20/2019",
      venue: {
        create: {
          name: "Mission Ballroom",
          city: "Denver",
          state: "CO"
        }
      },
      setlist: {
        create: [
          {
            name: "SET_1",
            tracks: {
              connect: [
                { id: undefined },
                { id: undefined }
              ]
            }
          },
          {
            name: "SET_2",
            tracks: {
              connect: [
                { id: undefined },
                { id: undefined }
              ]
            }
          }
        ]
      }
    },
    show: undefined
  }