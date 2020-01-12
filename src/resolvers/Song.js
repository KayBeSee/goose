// export const Song = {
//   tracks: {
//     fragment: 'fragment UserId on User { id }',
//     resolve(parent, args, { request }, info) {
//       // something about checking if tracks is null and then replacing it with an empty array

//       if (userId && userId === parent.id) {
//         return parent.email
//       } else {
//         return null
//       }
//     }
//   }
// }