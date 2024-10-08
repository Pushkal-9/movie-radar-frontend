import { config } from "../common/Constants"

export function parseJwt(token) {
  if (!token) { return }
  const base64Url = token.split('.')[1]
  const base64 = base64Url.replace('-', '+').replace('_', '/')
  return JSON.parse(window.atob(base64))
}

export function getSocialLoginUrl(name) {
  return `${config.url.API_BASE_URL}/oauth2/authorization/${name}?redirect_uri=${config.url.OAUTH2_REDIRECT_URI}`
}

export const handleLogError = (error) => {
  if (error.response) {
    console.log(error.response.data)
  } else if (error.request) {
    console.log(error.request)
  } else {
    console.log(error.message)
  }
}


export function alignData(apiResponse){
 const movieSchedule = {};
 apiResponse.forEach(showtime => {
   const { date, theatre, screen, startTime } = showtime;

   if (!movieSchedule[date]) {
     movieSchedule[date] = {};
   }

   if (!movieSchedule[date][theatre.name]) {
     movieSchedule[date][theatre.name] = {};
   }

   if (!movieSchedule[date][theatre.name][screen.name]) {
     movieSchedule[date][theatre.name][screen.name] = [];
   }

   movieSchedule[date][theatre.name][screen.name].push(startTime);
 });

 return movieSchedule;
}