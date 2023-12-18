const moment = require('moment');
console.log("Tournament Name : Cricket");

let teams_and_homegrounds = [
{
  team: 'Chennai Super Kings',
  city: 'Chennai'
},
{
  team: 'Delhi Capitals',
  city: 'Delhi'
},
{
  team: 'Gujarat Titans',
  city: 'Gujarat'
},
{
  team: 'Kolkata Knight Riders',
  city: 'Kolkata'
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
}
];

const totalTeams = teams_and_homegrounds.length;

const totalMatches = totalTeams * (totalTeams - 1);

const totalDays = totalMatches;

const totalWeeks = Math.floor(totalDays/7);
const remainingDays = totalDays % 7;

console.log("totalteams ",totalTeams);
console.log("total matches ",totalMatches);
console.log("total days",totalDays);
console.log("total weeks",totalWeeks);
console.log("remaining days",remainingDays);

//calculate matches by total weekdays and weekends
let weekdays = [];
let weekends = [];
let schedule = [];

let startDate = moment('2024-01-01');

// const assignMatches = (match,weekday,weekend) => {
//   for(let i = 0;i<match.length - 1;i++){
//     let isWeekend = match[i].day === "Saturday" || match[i].day === "Sunday";
    
//     let matchInfo = {
//       team1 : match[i].team2,
//       team2 : match[i+1].team2,
//       city : match[i+1].city
//     };
    
//     const matchDate = match[i].date;
//     const dayArray = isWeekend ? weekend : weekday;
    
//     // Check if the current day already has two matches for weekends
//     const existingMatchesOnDay = dayArray.filter((item) => item.matchdate === matchDate);
    
//     if (isWeekend && existingMatchesOnDay.length >= 2) {
//       // If there are already two matches for the weekend, skip adding more
//       continue;
//     }

//     const existingMatch = dayArray.find((item) => item.matchdate === matchDate);

//     if (existingMatch) {
//       // Merge the team information into the existing object
//       Object.assign(existingMatch, matchInfo);
//     } else {
//       // If the match date is not found, create a new object
//       const newMatch = {
//         matchdate: match[i].date,
//         matchday: match[i].day,
//         ...matchInfo,
//       };

//       // Push the new object to weekdays or weekends array
//       dayArray.push(newMatch);
//     }
//   }
// }; 

// const incrementDate = (currentDate, days) => {
//   return moment(currentDate).add(days, 'days');
// };

// for(let week=0;week<totalWeeks;week++){
//   for(let j=0;j<7;j++){
//     let currentDate = startDate.clone().add(week,'weeks').add(j,'days');
//     if(currentDate.day()>=1 && currentDate.day()<=5){
//       weekdays.push({matchdate : currentDate.format('YYYY-MM-DD'),matchday : currentDate.format('dddd')});
//     }else{
//       weekends.push({matchdate : currentDate.format('YYYY-MM-DD'),matchday : currentDate.format('dddd')});
//       weekends.push({matchdate : currentDate.format('YYYY-MM-DD'),matchday : currentDate.format('dddd')});
//     }
//   }
// }

// //handle remaining days 2 (may be they are weekdays)
// for (let i = 0; i < remainingDays; i++) {
//   const currentDate = startDate.clone().add(totalWeeks, 'weeks').add(i, 'days');
//   if (currentDate.day() >= 1 && currentDate.day() <= 5) {
//     weekdays.push({ matchdate: currentDate.format('YYYY-MM-DD'), matchday: currentDate.format('dddd') });
//   } else {
//     weekends.push({ matchdate: currentDate.format('YYYY-MM-DD'), matchday: currentDate.format('dddd') });
//     weekends.push({ matchdate: currentDate.format('YYYY-MM-DD'), matchday: currentDate.format('dddd') });
//   }
// }

// // console.log("weekdays",weekdays);
// // console.log("weekends",weekends);

// // Merge weekdays and weekends arrays
// const allMatches = weekdays.concat(weekends);

// // Sort the merged array based on matchdate
// allMatches.sort((a, b) => {
//   return new Date(a.matchdate) - new Date(b.matchdate);
// });

const totalMatchesToPlay = totalDays;
let matchesPlayed = 0;

for (let week = 0; week < totalWeeks; week++) {
  for (let j = 0; j < 7; j++) {
    if (matchesPlayed >= totalMatchesToPlay) {
      break;
    }

    let currentDate = startDate.clone().add(week, 'weeks').add(j, 'days');

    if (currentDate.day() >= 1 && currentDate.day() <= 5) {
      weekdays.push({ matchdate: currentDate.format('YYYY-MM-DD'), matchday: currentDate.format('dddd') });
      matchesPlayed++;
    } else {
      weekends.push({ matchdate: currentDate.format('YYYY-MM-DD'), matchday: currentDate.format('dddd') });
      matchesPlayed++;

      if (matchesPlayed < totalMatchesToPlay) {
        weekends.push({ matchdate: currentDate.format('YYYY-MM-DD'), matchday: currentDate.format('dddd') });
        matchesPlayed++;
      }
    }
  }

  if (matchesPlayed >= totalMatchesToPlay) {
    break;
  }
}

allMatches = weekdays.concat(weekends);

allMatches.sort((a, b) => {
  return new Date(a.matchdate) - new Date(b.matchdate);
});

console.log("allMatches", allMatches);

// Now allMatches is a sorted array containing both weekdays and weekends matches
console.log(allMatches);
console.log(allMatches.length);

// schedule teams and their homegrounds
for (let i = 0; i < teams_and_homegrounds.length; i++) {
  
  let newArray = [];
  for (let j = 0; j < teams_and_homegrounds.length; j++) {
    if (j !== i) {
      let copyObject = {
        [`${j + 1}`]: {
          team: teams_and_homegrounds[j].team,
          city: teams_and_homegrounds[j].city
        }
      };
      newArray.push(copyObject);
    }
  }
  
  for (let k = 0; k < newArray.length; k++) {
    let key = Object.keys(newArray[k])[0];
    let match = {
      team1: teams_and_homegrounds[i].team,
      team2: newArray[k][key].team,
      city: newArray[k][key].city
    };
    schedule.push(match);
  }
}
console.log(schedule);

// assignMatches(schedule,weekdays,weekends);

// console.log("assign matches weekdays",weekdays);
// console.log("assign matches weekends",weekends);
//assign them with weeends and weekdays 
//if weekdays then 1 match if weekends then 2 match
