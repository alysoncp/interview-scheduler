import React from "react";
import { action } from "@storybook/addon-actions/dist/preview";
import DayListItem from "components/DayListItem";


export default function DayList(props) {


  return(
    <ul>
      {props.days.map(day =>
        <DayListItem 
          name={day.name} 
          spots={day.spots} 
          selected={day.name === props.day}
          setDay={props.setDay}  
        />
      )}


    </ul>

   );
 }