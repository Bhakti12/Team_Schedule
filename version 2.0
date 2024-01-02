const moment = require('moment');
console.log("Tournament Name : Cricket");

let num_of_teams = 9;
let num_of_home_grounds = 9;
let matches = [];

let teams_and_homegrounds = [
{
  team : "Chennai Super Kings",
  city : "Chennai"
},
{
  team : "Delhi Capitals",
  city : "Delhi"
},
{
  team : "Gujarat Titans",
  city : "Gujarat"
},
{
  team : "Kolkata Knight Riders",
  city : "Kolkata"
},
{
  team : "Lucknow Super Giants",
  city : "Lucknow"
},
{
  team : "Mumbai Indians",
  city : "Mumbai"
},
{
  team : "Punjab Kings",
  city : "Punjab"
},
{
  team : "Rajasthan Royals",
  city : "Rajasthan"
},
{
  team : "Sunrisers Hydrabad",
  city : "Hydrabad"
}];

let start_date = moment('2024-01-01T16:00:00+00:00');
let schedule = [];
let match;

for(let i=0;i<teams_and_homegrounds.length;i++){
  // console.log("i",i);
  console.log(teams_and_homegrounds[i]);
  const teams = teams_and_homegrounds.slice(1);
  // console.log("teams",teams);
  for(let j=0;j<teams.length;j++){
    // console.log("j",j);
    if (teams_and_homegrounds[i].team !== teams[j].team){
      match = {
        team1 : teams_and_homegrounds[i].team,
        team2 : teams[j].team,
        city : teams[j].city,
        // date : start_date.add(i+1,'day'),
        // day : start_date.format('dddd')
      }; 
    }
    schedule.push(match);
  }
}
// console.log(schedule);
// console.log(schedule.length);