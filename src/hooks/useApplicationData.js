import React, { useState, useEffect } from "react";
import axios from 'axios';

export default function useApplicationData() {

  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  });

  const setDay = day => setState({ ...state, day });

// Book an Interview ---------------------------------   

  function bookInterview(id, interview) {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };
    const appointments = {
      ...state.appointments, [id]: appointment
    };

   const days = [
      ...state.days
    ]

    state.days.forEach((day, index) => {
      const appointmentsToCount = day.appointments;
      let spots = 0;
      for (let i of appointmentsToCount){
        if (!appointments[i].interview) {
          spots ++;
        }
      }
      days[index].spots = spots;  

    }) 
  
    return axios.put(`http://localhost:8001/api/appointments/${id}`, {interview})
    .then(() => {
      console.log("added")
      setState({
        ...state, appointments  
      });
    })

  };

// Cancel an Interview -------------------------------  

  function cancelInterview(id) {
    console.log(`Deleting interview: ${id}`);
    const appointment = {
      ...state.appointments[id],
      interview: null
    };
    const appointments = {
      ...state.appointments, [id]: appointment
    };

    const days = [
      ...state.days
    ]

    state.days.forEach((day, index) => {
      const appointmentsToCount = day.appointments;
      let spots = 0;
      for (let i of appointmentsToCount){
        if (!appointments[i].interview) {
          spots ++;
        }
      }
    days[index].spots = spots;  

    }) 

    return axios.delete(`http://localhost:8001/api/appointments/${id}`)
    .then(() => {
      console.log("deleted")
      setState({
        ...state, appointments, days  
      });
    })
  }


  return { state, setState, setDay, bookInterview, cancelInterview }


}