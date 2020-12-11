import React from "react";
import { action } from "@storybook/addon-actions/dist/preview";
import "components/InterviewerList.scss";
import InterviewerListItem from "components/InterviewerListItem";



export default function InterviewerList(props) {


  const isInterview = function (interviewer) {
    if(props.interviewer) {
      return interviewer.id === props.interviewer.id;
  
    }   
  }  

  return(
    <section className="interviewers">
      <h4 className="interviewers__header text--light">Interviewers</h4>
      <ul className="interviewers__list">
        {props.interviewers.map(interviewer =>  
          <InterviewerListItem
            {...interviewer}
            key={interviewer.id}
            selected={isInterview(interviewer)}
            setInterviewer={()=>props.setInterviewer(interviewer)} 
          />
        )}
    </ul>  


     
    </section>

   );
 }