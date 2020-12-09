import React, { Fragment } from "react";
import { action } from "@storybook/addon-actions/dist/preview";
import "./styles.scss";

import Header from "./Header"
import Show from "./Show"
import Empty from "./Empty"

export default function Appointment(props) {

  return(
    <div>
      <Header time={props.time} />
      {props.interview 
        ? <Show 
            interview={props.interview}
          /> 
        : <Empty />
      }
      <article className="appointment"></article>
    </div>
   );
 }