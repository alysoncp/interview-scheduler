import React, {useState} from "react";
import { action } from "@storybook/addon-actions/dist/preview";

import Button from "../Button"
import InterviewerList from "../InterviewerList"


export default function Form(props) {
  const [name, setName] = useState(props.name || "");
  const [interviewer, setInterviewer] = useState(props.interviewer || null);
  const [error, setError] = useState("");

  const setStudent = (event) => {
    setName(event.target.value);
  }

  const setNewInterviewer = (interviewer) => {
    setInterviewer(interviewer);
  }

  function validate() {
    if (name === "") {
      setError("Student name cannot be blank");
      return;
    }

    setError("");
  
    props.onSave(name, interviewer);
  }

  const resetFields = () => {
    setName("");
    setInterviewer(null);
  }

  const cancel = () => {
    resetFields();
    props.onCancel();
  }
  


  return (
    <main className="appointment__card appointment__card--create">
      <section className="appointment__card-left">
        <form autoComplete="off">
          <input
            data-testid="student-name-input"
            className="appointment__create-input text--semi-bold"
            name="name"
            type="text"
            value={name}
            placeholder="Enter Student Name"
            onChange={setStudent}
          />
        </form>
        <section className="appointment__validation">{error}</section>
        <InterviewerList interviewers={props.interviewers} interviewer={interviewer} setInterviewer={setNewInterviewer} />
      </section>
      <section className="appointment__card-right">
        <section className="appointment__actions">
          <Button danger onClick={() => cancel()}>Cancel</Button>
          <Button confirm onClick={() => validate()} onSubmit={event => event.preventDefault()}>Save</Button>
        </section>
      </section>
    </main>
  );
}