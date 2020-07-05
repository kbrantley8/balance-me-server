// const axios = require('axios');
// const urlbase = 'https://balance-me-proj.herokuapp.com';

// setInterval(async function() {
//     console.log('update here')
//     var tasks = await getTodaysTasks();
// }, 60 * 1000);

// getTodaysTasks = async () => {
//     var start = new Date();
//     start.setHours(0,0,0,0);
//     start = (start.getTime() / 1000);
//     console.log(start)

//     var end = new Date();
//     end.setHours(23,59,59,0);
//     end = (end.getTime() / 1000);
//     console.log(end)

//     try {
//       var tasks = await axios.get(urlbase + '/getTodaysTasks',
//       { 
//         params: {
//           start_time,
//           end_time
//         }
//         }).then((response) => {
//         return response;
//         });
  
//       return tasks;

//     } catch (e) {
//       console.log({status: e.response.status, message: e.response.data.error})
//     }
// }