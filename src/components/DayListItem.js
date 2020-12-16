import React from "react";
import "components/DayListItem.scss";
import { action } from "@storybook/addon-actions/dist/preview";

import classNames from "classnames";

export default function DayListItem(props) {
  
  const itemClass = classNames("day-list__item", {
    "day-list__item--selected": props.selected,
    "day-list__item--full": props.spots === 0
  });

  const formatSpots = function () {
    let output = "";
    if (props.spots === 0){
      output = "no spots remaining";
    } else if (props.spots === 1){
      output = props.spots + " spot remaining";
    } else {
      output = props.spots + " spots remaining";
    }
    return output;
  }

  return (
    <li 
      data-testid="day"
      className={itemClass}
      onClick={() => props.setDay(props.name)}
    >
      <h2 className="text--regular">{props.name}</h2> 
      <h3 className="text--light">{formatSpots()}</h3>
    </li>
  );
}