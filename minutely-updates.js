const axios = require('axios');
const urlbase = 'http://localhost:3000';
const timeDiff = 14400;

setInterval(async function() {
    console.log('update here')
    var tasks = await getTodaysTasks();
    var currTime = new Date().toLocaleString("en-US", {timeZone: "America/New_York"});
    currTime = currTime.getTime() / 1000;
    currTime = currTime + timeDiff; //change to EST
    for (var task in tasks) {
        //upcoming -> in progress
        var currTask = tasks[task];
        if ((currTask.start_time <= currTime) && (currTask.estimated_completion_time > currTime) && (!currTask.completed)) {
            var data = {
                "status": 1,
            }
            var task_id = currTask._id;
            try {
                await axios.post(urlbase + '/updateTask',
                { 
                    task_id,
                    data
                }).then((response) => {
                  return response;
                  });
              } catch (e) {
                console.log(e)
              } 
        }
    }
}, 60 * 1000);

getTodaysTasks = async () => {
    var start = new Date().toLocaleString("en-US", {timeZone: "America/New_York"});
    start = new Date(start);
    start.setHours(0,0,0,0);
    var start_time = (start.getTime() / 1000);
    console.log(start_time)
    start_time = start_time + timeDiff; // puts it in EST

    var end = new Date().toLocaleString("en-US", {timeZone: "America/New_York"});
    end = new Date(end);
    end.setHours(23,59,59,0);
    var end_time = (end.getTime() / 1000);
    end_time = end_time + timeDiff; // puts it in EST
    try {
      var tasks = await axios.get(urlbase + '/getTodaysTasks',
      { 
        params: {
          start_time,
          end_time
        }
        }).then((response) => {
            return response.data;
        });
  
      return tasks;

    } catch (e) {
      console.log(e)
    }
}