require('babel-register');
require('@babel/polyfill/noConflict');

var axios = require('axios');
var moment = require('moment');

var prisma = require('../src/prisma').default;

const startScript = async () => {

  const resp = await prisma.query.shows({ orderBy: 'date_ASC' }, '{ id date venue { id name city state } setlist { id name tracks { id notes song { id name } } } }');
  // const dateFormatted = moment(resp[0]).format('YYYY-MM-DD')
  console.log('resp: ', moment(resp[0].date).format('YYYY-MM-DD'));

  for (let i = 0; i < resp.length; i++) {
    const show = resp[i];
    const dateFormatted = moment(show.date).format('YYYY-MM-DD');
    console.log(`trying ${dateFormatted}`);
    try {
      const { data } = await axios.get(`https://api.relisten.net/api/v2/artists/goose/shows/${dateFormatted}`);
      if (data) {
        console.log('success!');
        const updateShow = await prisma.mutation.updateShow({
          where: {
            id: show.id
          },
          data: {
            relisten: dateFormatted
          }
        });
        console.log(`updated ${JSON.stringify(updateShow)}`);
      }
    } catch (e) {
      console.log('error on get: ', e.response && e.response.data ? e.response.data : e);

    }
  }

  console.log('done!');

  // forEach() {
  //   const { data } = await axios.get(`https://api.relisten.net/api/v2/artists/goose/shows/2020-02-08`);

  //   for (var i = 0; i < data.length; i++) {
  //     const show = data[i];

  //     const venueQuery = await getVenueQuery(show);
  //     const setlistQuery = await getSetlistQuery(show);

  //     const showQuery = {
  //       data: {
  //         date: show.dateTime,
  //         venue: venueQuery,
  //         setlist: setlistQuery
  //       }
  //     }

  //     const newShow = await prisma.mutation.createShow(showQuery, '{ id setlist { id name tracks { id song { id name originalArtist } } } }')
  //     console.log(`created ${newShow._id}`)
  //   }
  // }
}

startScript();