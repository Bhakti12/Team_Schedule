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

// console.log("totalteams ",totalTeams);
// console.log("total matches ",totalMatches);
// console.log("total days",totalDays);
// console.log("total weeks",totalWeeks);
// console.log("remaining days",remainingDays);

//calculate matches by total weekdays and weekends
let weekdays = [];
let weekends = [];
let schedule = [];

let startDate = moment('2024-01-01');

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
// console.log(schedule);

const totalMatchesToPlay = totalDays;
let matchesPlayed = 0;

for (let week = 0; week < totalWeeks; week++) {
  for (let j = 0; j < 7; j++) {
    if (matchesPlayed >= totalMatchesToPlay) {
      break;
    }

    let currentDate = startDate.clone().add(week, 'weeks').add(j, 'days');

    if (currentDate.day() >= 1 && currentDate.day() <= 5) {
      const weekdayMatch =weekdays.push({ matchdate: currentDate.format('YYYY-MM-DD'), matchday: currentDate.format('dddd') });
      matchesPlayed++;
    } else {
      weekends.push({ matchdate: currentDate.format('YYYY-MM-DD'), matchday: currentDate.format('dddd') });
      matchesPlayed++;
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

// console.log("allMatches", allMatches);

// Now allMatches is a sorted array containing both weekdays and weekends matches
// console.log(allMatches);
// console.log(allMatches.length);

function generateMatches(allMatches, teams) {
  const generatedMatches = [];
  function isTeamUsed(team, prevMatch) {
    // console.log(prevMatch.team1 === team || prevMatch.team2 === team);
    return prevMatch.team1 === team || prevMatch.team2 === team;
  }
  function getNextTeam(currentIndex, teams) {
    const teamIndex = (currentIndex + 1) % teams.length;
    return teams[teamIndex];
  }

  let currentIndex = 0;
  let consecutiveDays = 0;

  for (const match of allMatches) {
    const currentDate = new Date(match.matchdate);
    const matchTeams = [];

    const matchesPerDay = match.matchday === 'Saturday' || match.matchday === 'Sunday' ? 2 : 1;

    for (let i = 0; i < matchesPerDay; i++) {
      const currentTeam = teams[currentIndex];
      matchTeams.push({
        matchdate: match.matchdate,
        matchday: match.matchday,
        team1: currentTeam.team1,
        team2: currentTeam.team2,
        city: currentTeam.city,
      });

      currentIndex = (currentIndex + 1) % teams.length;
      consecutiveDays++;
      while (
        isTeamUsed(teams[currentIndex].team1, matchTeams[i]) ||
        isTeamUsed(teams[currentIndex].team2, matchTeams[i]) ||
        Math.abs(new Date(allMatches[currentIndex].matchdate) - currentDate) <= 5
      ) {
        currentIndex = (currentIndex + 1) % teams.length;
        consecutiveDays = 0;
      }
    }

    generatedMatches.push(...matchTeams);
  }

  return generatedMatches;
}

// Generate the matches
const result = generateMatches(allMatches, schedule);

// Log the result
console.log(result);
// console.log(result.length);

//assign them with weeends and weekdays 
//if weekdays then 1 match if weekends then 2 match