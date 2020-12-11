export function getAppointmentsForDay(state, day) {
  let foundDay;
  for (let dayy of state.days) {
    if (dayy.name === day){
      foundDay = dayy;
    }
  }

  if(foundDay){
    let daysApts = [];
    for (let apt of foundDay.appointments){
      daysApts.push(state.appointments[apt]);
    }

    return daysApts;
  }

  return [];

}


export function getInterviewersForDay(state, day) {
  let foundDay;
  for (let dayy of state.days) {
    if (dayy.name === day){
      foundDay = dayy;
    }
  }

  if(foundDay){
    let daysIntvws = [];
    for (let int of foundDay.interviewers){
      daysIntvws.push(state.interviewers[int]);
    }

    return daysIntvws;
  }

  return [];

}




export function getInterview(state, interview) {

  let interviewData = {};
  
  if(interview){ 
    interviewData["interviewer"] = state.interviewers[interview.interviewer];
    interviewData["student"] = interview["student"] 
    return interviewData;
  }
  
  return null;

}