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



  useEffect(() => {
    Promise.all([
      axios.get("/api/days"),
      axios.get("/api/appointments"),
      axios.get("/api/interviewers")
    ]).then((all) => {
      setState(prev => ({...prev, days: all[0].data, appointments: all[1].data, interviewers: all[2].data}));
    })
  }, []);




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



// ------- WebSockets to update multiple clients -------

  useEffect(() => {
    const socket = new WebSocket("ws://localhost:8001");
    // Connection opened
    socket.addEventListener('open', function (event) {
      socket.send('ping');
    });

    // Listen for messages
    socket.addEventListener('message', function (event) {
      console.log('Message received: ', event.data);
      const messageObj = JSON.parse(event.data);
      console.log(messageObj);
    //        // Listen for SET_INTERVIEW
    //   if(messageObj.type === "SET_INTERVIEW") {
    //   if(messageObj.interview){
    //       console.log("Interview booked");
    //       appointment = {
    //         ...state.appointments[messageObj.id],
    //         interview: { ...messageObj.interview }
    //       };
    //       appointments = {
    //         ...state.appointments, [messageObj.id]: appointment
    //       };
      
    //   } else {
    //       console.log("Interview cancelled");
    //       appointment = {
    //         ...state.appointments[messageObj.id],
    //         interview: null
    //       };
    //       appointments = {
    //         ...state.appointments, [messageObj.id]: appointment
    //       };
    //     }
    //   }
                 
    //       setState({
    //         ...state, appointments  
    //       });
     
      
     

    // };

 
    }, []);

  });


    return { state, setState, setDay, bookInterview, cancelInterview }



}