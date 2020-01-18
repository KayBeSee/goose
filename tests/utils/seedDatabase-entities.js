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
      originalArtist: 'Goose',
      notes: 'Released on Moon Cabin'
    },
    song: undefined
  }
  
  export const songTwo = {
    input: {
      name: 'Lead the Way',
      originalArtist: 'Goose',
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
          name: "SET_1",
          show: undefined
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
      date: "2017-07-08",
      venue: {
        create: { name: "Dunedin Brewery", city: "Dunedin", state: "FL" }
      },
      setlist: {
        create: [
          {
            name: "SET_1",
            tracks: {
              create: [
                {
                  song: { create: { 
                    name: "Lead the Way",
                    originalArtist: "Goose",
                    notes: "off the Moon Cabin album"
                  } }
                },
                {
									segue: true,
                  song: { create: { 
										name: "Atlas",
                    originalArtist: "Wood Brothers"
                  } }
                },
                {
                  song: { create: { 
										name: "Indian River",
                    originalArtist: "Goose"
                  } }
                },
                {
                  song: { create: { 
                    name: "Green River",
                    originalArtist: "Credence Clearwater Revival"
                  } }
                },
                {
                  song: { create: {
                    name: "Arcadia",
                    originalArtist: "Goose"
                  } }
                },
                {
                  song: { create: { 
										name: "Madhuvan",
                    originalArtist: "Goose"
                  } }
                },
                {
                  song: { create: { 
										name: "Don't Do It",
                    originalArtist: "The Band"
                  } }
                },
                {
                  videos: {
                    create: {
                      videoId: "7LjIsSzdLSg"
                    }
                  },
                  song: { create: { 
										name: "Turned Clouds",
                    originalArtist: "Goose"
                  } }
                }
              ]
            }
          },
          {
            name: "SET_2",
            tracks: {
              create: [
                {
                  song: { create: { 
                    name: "Jive II",
                    originalArtist: "Goose"
                  } }
                },
                {
                  song: { create: { 
										name: "One More Day",
                    originalArtist: "Diamond Rio"
                  } }
                },
                {
                  song: { create: { 
										name: "Revival",
                    originalArtist: "Allman Brothers Band"
                  } }
                },
                {
                  song: { create: { 
										name: "One Way Out",
                    originalArtist: "Allman Brothers Band"
                  } }
                },
                {
                  song: { create: { 
										name: "All I Neeed",
                    originalArtist: "Goose"
                  } }
                },
                {
                  song: { create: { 
										name: "Brown Eyed Woman",
                    originalArtist: "Grateful Dead"
                  } }
                },
                {
                  song: { create: { 
										name: "Flodown",
                    originalArtist: "Goose"
                  } }
                },
                {
                  song: { create: { 
										name: "Mississippi Half-Step Uptown Toodleloo",
                    originalArtist: "Grateful Dead"
                  } }
                }
              ]
            }
          },
          {
            name: "SET_3",
            tracks: {
              create: [
                {
                	song: { create: {
                  	name: "Compared to What",
                  	originalArtist: "Les McCann & Eddie Harris"
                	} } 
                },
                {
                	song: { create: {
                  	name: "Jive I",
                  	originalArtist: "Goose"
                	} } 
                },
                {
                	song: { create: {
                  	name: "Hard to Handle",
                  	originalArtist: "Otis Redding"
                	} } 
                },
                {
                	song: { create: {
                  	name: "So Ready",
                  	originalArtist: "Goose"
                	} } 
                }
              ]
            }
          },
          {
            name: "ENCORE_1",
            tracks: {
              create: {
                song: {
                  create: {
                    name: "One More Saturday Night",
                    originalArtist: "Grateful Dead"
                  }
                }
              }
            }
          }
        ]
      }
    },
    show: undefined
  }