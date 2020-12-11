import React, { Fragment, useState } from "react";
import { action } from "@storybook/addon-actions/dist/preview";
import "./styles.scss";

import useVisualMode from '../../hooks/useVisualMode';
import Header from "./Header"
import Show from "./Show"
import Empty from "./Empty"
import Form from "./Form"
import Status from "./Status"
import Confirm from "./Confirm"
import Error from "./Error"

const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";
const EDIT = "EDIT";
const SAVING = "SAVING";
const DELETING = "DELETING";
const CONFIRM = "CONFIRM";
const ERROR_SAVE = "ERROR_SAVE";
const ERROR_DELETE = "ERROR_DELETE";


export default function Appointment(props) {

  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );

  function save(name, interviewer) {
    const interview = {
      student: name,
      interviewer: interviewer.id
    };
    transition(SAVING);
    props.bookInterview(props.id, interview)
    .then(() => {
      transition(SHOW);
    })
    .catch(error => transition(ERROR_SAVE, true));
  }
  
  function deleteInterview(){
    transition(DELETING);
    props.cancelInterview(props.id)
    .then(() => {
      transition(EMPTY);
    })
    .catch(error => transition(ERROR_DELETE, true));
  }

  return(
    <div>
      <Header time={props.time} />

      { mode === SHOW && <Show interview={props.interview} onDelete={() => transition(CONFIRM)} onEdit={() => transition(EDIT)}/> } 

      { mode === EMPTY && props.time!== "5pm" && <Empty onAdd={() => transition(CREATE)}/> }

      { mode === EDIT && <Form interviewers={props.interviewers} name={props.interview.student} interviewer={props.interview.interviewer} onCancel={back} onSave={save}/> }
      { mode === CREATE && <Form interviewers={props.interviewers} onCancel={back} onSave={save}/> }
      { mode === SAVING && <Status message="Saving..."/> }

      { mode === CONFIRM && <Confirm onConfirm={deleteInterview} onCancel={back}/> }
      { mode === DELETING && <Status message="Deleting..."/> }

      { mode === ERROR_SAVE && <Error onClose={back} message="Could not save"/> }
      { mode === ERROR_DELETE && <Error onClose={back} message="Could not delete"/> }


      <article className="appointment"></article>
    </div>
   );
 }