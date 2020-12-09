import React from "react";
import { action } from "@storybook/addon-actions/dist/preview";
import "components/InterviewerList.scss";
import InterviewerListItem from "components/InterviewerListItem";



export default function DayList(props) {

  

  return(
    <section className="interviewers">
      <h4 className="interviewers__header text--light">Interviewers</h4>
      <ul className="interviewers__list">
        {props.interviewers.map(interviewer =>  
          <InterviewerListItem
            {...interviewer}
            key={interviewer.id}
            // interviewer={interviewer}
            selected={interviewer.id === props.interviewer}
            setInterviewer={()=>props.setInterviewer(interviewer.id)} 
          />
        )}
    </ul>  


     
    </section>

   );
 }