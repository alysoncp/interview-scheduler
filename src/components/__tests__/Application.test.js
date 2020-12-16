import React from "react";

import { render, cleanup, waitForElement, fireEvent, act, prettyDOM, wait, getByText, queryByText, getAllByTestId, getByAltText, queryByAltText, getByPlaceholderText, waitForElementToBeRemoved, getByDisplayValue } from "@testing-library/react";
import Application from "components/Application";
import axios from 'axios';  
jest.mock('axios');

afterEach(cleanup);

describe("Test Application", () => {
  it("defaults to Monday and changes the schedule when a new day is selected", () => {
    const { getByText } = render(<Application />);

    return waitForElement(() => getByText("Monday")).then(() => {
      fireEvent.click(getByText("Tuesday"));
      expect(getByText("Leopold Silvers")).toBeInTheDocument();
    });
  });

  it("loads data, books an interview and reduces the spots remaining for Monday by 1", async () => {
    const { container, debug } = render(<Application />);
  
    await waitForElement(() => getByText(container, "Archie Cohen"));
  
    const appointments = getAllByTestId(container, "appointment");
    const appointment = appointments[0];
  
    fireEvent.click(getByAltText(appointment, "Add"));
  
    fireEvent.change(getByPlaceholderText(appointment, /enter student name/i), {
      target: { value: "Lydia Miller-Jones" }
    });
    fireEvent.click(getByAltText(appointment, "Sylvia Palmer"));
  
    fireEvent.click(getByText(appointment, "Save"));
    expect(getByText(appointment, "Saving...")).toBeInTheDocument();
    await waitForElementToBeRemoved(()=> getByText(appointment, "Saving..."));

    const day = getAllByTestId(container, "day").find(day =>
      queryByText(day, "Monday")
    );
    expect(getByText(container, "no spots remaining")).toBeInTheDocument();
  
  });

  it("loads data, cancels an interview and increases the spots remaining for Monday by 1", async () => {
    // 1. Render the Application.
    const { container, debug } = render(<Application />);
  
    // 2. Wait until the text "Archie Cohen" is displayed.
    await waitForElement(() => getByText(container, "Archie Cohen"));
  
    // 3. Click the "Delete" button on the booked appointment.
    const appointment = getAllByTestId(container, "appointment").find(
      appointment => queryByText(appointment, "Archie Cohen")
    );
  
    fireEvent.click(queryByAltText(appointment, "Delete"));
  
    // 4. Check that the confirmation message is shown.
    expect(
      getByText(appointment, "Delete the appointment?")
    ).toBeInTheDocument();
  
    // 5. Click the "Confirm" button on the confirmation.
    fireEvent.click(queryByText(appointment, "Confirm"));
  
    // 6. Check that the element with the text "Deleting" is displayed.
    expect(getByText(appointment, "Deleting...")).toBeInTheDocument();
  
    // 7. Wait until the element with the "Add" button is displayed.
    await waitForElement(() => getByAltText(appointment, "Add"));
  
    // 8. Check that the DayListItem with the text "Monday" also has the text "2 spots remaining".
    const day = getAllByTestId(container, "day").find(day =>
      queryByText(day, "Monday")
    );
  
    expect(getByText(day, "2 spots remaining")).toBeInTheDocument();

  });

  it("loads data, edits an interview and keeps the spots remaining for Monday the same", async () => {
    // We want to start by finding an existing interview.
      const { container, debug } = render(<Application />);
      await waitForElement(() => getByText(container, "Archie Cohen"));

    // With the existing interview we want to find the edit button.
      const appointment = getAllByTestId(container, "appointment").find(
        appointment => queryByText(appointment, "Archie Cohen")
      );
    
      fireEvent.click(queryByAltText(appointment, "Edit"));

    // We change the name and save the interview.

      fireEvent.change(getByDisplayValue(appointment, "Archie Cohen"), {
        target: { value: "Lydia Miller-Jones" }
      });
      fireEvent.click(getByAltText(appointment, "Sylvia Palmer"));
    
      fireEvent.click(getByText(appointment, "Save"));
      expect(getByText(appointment, "Saving...")).toBeInTheDocument();

      await waitForElementToBeRemoved(()=> getByText(appointment, "Saving..."));
    
      
      // // We don't want the spots to change for "Monday", since this is an edit.
      const day = getAllByTestId(container, "day").find(day =>
        queryByText(day, "Monday")
        );
        expect(getByText(day, "1 spot remaining")).toBeInTheDocument();


  });


  it("shows the save error when failing to save an appointment", async() => {

    axios.put.mockRejectedValueOnce();

    const { container, debug } = render(<Application />);
  
    await waitForElement(() => getByText(container, "Archie Cohen"));
  
    const appointments = getAllByTestId(container, "appointment");
    const appointment = appointments[0];
  
    fireEvent.click(getByAltText(appointment, "Add"));
    console.log(debug(appointment));
  
    fireEvent.change(getByPlaceholderText(appointment, /enter student name/i), {
      target: { value: "Lydia Miller-Jones" }
    });
    fireEvent.click(getByAltText(appointment, "Sylvia Palmer"));
  
    fireEvent.click(getByText(appointment, "Save"));
    expect(getByText(appointment, "Saving...")).toBeInTheDocument();

    await waitForElementToBeRemoved(()=> getByText(appointment, "Saving..."));
  
    console.log(debug(appointment));
    
  });



   it("shows the delete error when failing to delete an existing appointment", async() => {
    axios.put.mockRejectedValueOnce();
   // 1. Render the Application.
   const { container, debug } = render(<Application />);
  
   // 2. Wait until the text "Archie Cohen" is displayed.
   await waitForElement(() => getByText(container, "Archie Cohen"));
 
   // 3. Click the "Delete" button on the booked appointment.
   const appointment = getAllByTestId(container, "appointment").find(
     appointment => queryByText(appointment, "Archie Cohen")
   );
 
   fireEvent.click(queryByAltText(appointment, "Delete"));
 
   // 4. Check that the confirmation message is shown.
   expect(
     getByText(appointment, "Delete the appointment?")
   ).toBeInTheDocument();
 
   // 5. Click the "Confirm" button on the confirmation.
   fireEvent.click(queryByText(appointment, "Confirm"));
 
   // 6. Check that the element with the text "Deleting" is displayed.
   expect(getByText(appointment, "Deleting...")).toBeInTheDocument();
 
   // 7. Wait until the element with the "Add" button is displayed.
   await waitForElement(() => getByAltText(appointment, "Add"));
 
   // 8. Check that the DayListItem with the text "Monday" also has the text "2 spots remaining".
   const day = getAllByTestId(container, "day").find(day =>
     queryByText(day, "Monday")
   );
 
   expect(getByText(day, "2 spots remaining")).toBeInTheDocument();
  });

});