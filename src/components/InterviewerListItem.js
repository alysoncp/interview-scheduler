import React from "react";
import "components/InterviewerListItem.scss";
import { action } from "@storybook/addon-actions/dist/preview";

import classNames from "classnames";

export default function InterviewerListItem(props) {
  
  const interviewerClass = classNames("interviewers__item", {
    "interviewers__item--selected": props.selected
  });

  return (
    <span 
      className={interviewerClass}
      onClick={props.setInterviewer}
    >
      <img
        className="interviewers__item-image"
        src={props.avatar}
        alt={props.name}
      />
     

      { props.selected && props.name }

    </span>
  );
}
