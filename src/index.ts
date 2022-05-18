import {AthleteManagement} from "./athleteManagement";

/*
const at: AthleteInterface = {
  name: 'Adrian',
  lastname: 'Gonzalez Galvan',
  id: '43491148B',
  age: 20,
  sport: 'boxing',
  expert: 'cardio',
  bestRecord: 6,
};
*/

new AthleteManagement().createAthlete({
  name: 'Adrian',
  lastname: 'Gonzalez Galvan',
  id: '43491148B',
  age: 20,
  sport: 'boxing',
  expert: 'cardio',
  bestRecord: 6,
}).then((result) => {
  console.log(result);
}).catch((err) => {
  console.log(err.message);
});

/*
new AthleteManagement().findAthlete('42255539E').then((result) => {
  console.log(result);
}).catch((err) => {
  console.log(err.message);
});
*/

/*
new AthleteManagement().updateAthlete('43491148B', at).then((result) => {
  console.log(result);
}).catch((err) => {
  console.log(err.message);
});
*/