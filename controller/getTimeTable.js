function ListHoursPerDay(hoursPerDay, deadline , remainder) {
    let schedule = [];
    for (let i = 0; i < deadline; i++) {
        schedule.push(hoursPerDay);
    }
    for(let i=0; i < remainder;i++){
        schedule[i] += 1;
    }
    return schedule;
}


async function getTimeTable (req, res) {
var result = req.body;

const deadline =  parseInt(result["deadline"]);

const tasks= result["tasks"];
let total_hours = 0;
tasks.forEach(element => {
    let expected_hours= parseInt(element["expected_hours"]);
    total_hours += expected_hours;

});
let hours_per_day= Math.floor(total_hours/deadline);
let remainder= total_hours % deadline;

let list_hours_per_day = ListHoursPerDay(hours_per_day,deadline,remainder);

let schedule =[];
let taskNo=1;
let dayNo=1;
let temp={};
while(taskNo <= tasks.length){
  
    let str=`Day ${dayNo}`;
    if(temp[str]==null){
        temp[str]=[];
    }

    
    let temp2={};
    let task_expected_hours=parseInt(tasks[taskNo-1]["expected_hours"]);
    if( task_expected_hours <= list_hours_per_day[dayNo-1] ){
        temp2["taskName"]=tasks[taskNo-1]["task"];
        temp2["time"]=task_expected_hours;
        list_hours_per_day[dayNo-1] -= task_expected_hours;
        tasks[taskNo-1]["expected_hours"]='0';
       
        
        taskNo++;
        
        temp[str].push(temp2);
        
        if(list_hours_per_day[dayNo-1]==0){
            
            dayNo++;
        }
    }else{
        temp2["taskName"]=tasks[taskNo-1]["task"];
        temp2["time"]=list_hours_per_day[dayNo-1];
        task_expected_hours -= list_hours_per_day[dayNo-1];
        list_hours_per_day[dayNo-1] = 0;

        tasks[taskNo-1]["expected_hours"]=task_expected_hours.toString();
        
        temp[str].push(temp2);
        dayNo++;
        if( parseInt(tasks[taskNo-1]["expected_hours"]) == 0){
            console.log("HI")
            taskNo++;
        }

    }
    

}

 res.json({temp});
}

module.exports={
    getTimeTable,
}