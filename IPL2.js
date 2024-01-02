//Add tournament (which tournament?)
//Add teams and their home-grounds.
//After adding teams we have to add rules.
//Rule 1 : Each team must have 2 matches with eveery other team.
//Rule 2 : Each team have match with other team in their own home-ground and other team home-ground.
//Rule 3 : There are minimum 2 days of interleave between team matches.
//Rule 4 : Only one match during weekdays and 2 matches during weekends.
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

let start_date = moment('2024-01-04T16:00:00+00:00');
let no_of_weekdays_match = 1;
let no_of_weekend_match = 2;
let days;

for(let i=0;i<teams_and_homegrounds.length;i++){
// console.log("Add teams and their home_grounds",teams_and_homegrounds[i]);
 //check weather team name of one team can't be same. 
 for(let j = i+1;j<teams_and_homegrounds.length;j++){
  let no_of_match = no_of_weekdays_match * 5 + no_of_weekend_match * 2;
  let daysBetweenMatches = no_of_match * 2;
  
   const match1 = {
      team1: teams_and_homegrounds[i].team,
      team2: teams_and_homegrounds[j].team,
      city: teams_and_homegrounds[i].city,
      date: moment(start_date).add(j,'day')
    };
    
    const match2 = {
      team1: teams_and_homegrounds[j].team,
      team2: teams_and_homegrounds[i].team,
      city: teams_and_homegrounds[j].city,
      date: moment(start_date).add(j+2,'day')
    };
    
    matches.push(match1,match2); 
    // console.log(matches);
 }
 //Now when we have not same name then we compare each and every team with each other and group them and construct an object that have team and their matches and home_ground and contain that array in one array.
}
console.log(matches);
console.log(matches.length);