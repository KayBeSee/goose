require('babel-register');
require('@babel/polyfill/noConflict');

var axios = require('axios');
var prisma = require('../src/prisma').default;
// var reader = require("readline-sync"); 
var readline = require('readline-promise').default

const rlp = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  terminal: true
});

const getVenueQuery = async (show) => {
  let venueQuery = {};

  const venueExists = await prisma.exists.Venue({
    name: show.venue.name,
    city: show.venue.city,
    state: show.venue.state
  });

  if (!venueExists) {
    venueQuery.create = {
      name: show.venue.name,
      city: show.venue.city,
      state: show.venue.state
    }
  } else {
    try {
      const venues = await prisma.query.venues({
        where: {
          name: show.venue.name,
          city: show.venue.city,
          state: show.venue.state
        }
      });

      venueQuery.connect = {
        id: venues[0].id
      }
    } catch(e) {
      console.log('error querying venue: ', e)
    }
  }
  return venueQuery
}

const getSetlistQuery = async (show) => {
  let setlistQuery = {
    create: []
  };

  // loop over each set
  for(var i=0; i<show.sets.length; i++) {
    const currentSet = show.sets[i]
    const setQuery = {
      name: currentSet.name.replace(' ', '_').toUpperCase(),
      tracks: {
        create: []
      }
    }


    // loop over each song in set
    for(var j=0; j<currentSet.songs.length; j++) {
      const currentSong = currentSet.songs[j];
      // see if song exists in db

      const existingSongs = await prisma.query.songs({
        where: {
          name: currentSong.name
        }
      });

      const songExists = !!existingSongs.length;

      let songQuery = {};
      if(songExists) {
        songQuery.connect = { id: existingSongs[0].id };
      } else {

        let originalArtist;
        if(currentSong.footnotes.length > 0) {
          console.log('hits currentSong.footnotes.length > 0 ')
          // TODO
          console.log('show.footnotes: ', show.footnotes);
          originalArtist = await rlp.questionAsync(`
            ${currentSong.name} \n
            ${JSON.stringify(show.footnotes.filter(footnote => footnote.id === currentSong.footnotes[0]))}
          `)
          console.log('originalArtist: ', originalArtist);
        } else {
          originalArtist = 'Goose';
        }

       songQuery.create = {
        name: currentSong.name,
        originalArtist: originalArtist
       }
      }

      setQuery.tracks.create.push({
        segue: currentSong.segue,
        song: songQuery
      })
    }

    setlistQuery.create.push(setQuery);
  }

  return setlistQuery;
}

const startScript = async () => {

  await prisma.mutation.deleteManyTracks();
  await prisma.mutation.deleteManySongs();
  await prisma.mutation.deleteManySets();
  await prisma.mutation.deleteManyShows();
  await prisma.mutation.deleteManyVenues();

    const { data } = await axios.get('https://www.phantasytour.com/api/bands/7465/setlists/paged?page=1&pageSize=100&timespan=past');

    for(var i=0; i<data.length; i++) {
      const show = data[i];

      const venueQuery = await getVenueQuery(show);
      const setlistQuery = await getSetlistQuery(show);

      const showQuery = {
        data: {
          date: show.dateTime,
          venue: venueQuery,
          setlist: setlistQuery
        }
      }

      const newShow = await prisma.mutation.createShow(showQuery, '{ id setlist { id name tracks { id song { id name originalArtist } } } }')
    }

  rlp.close();
}

startScript();