import React, { Component } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import withDragAndDrop from "react-big-calendar/lib/addons/dragAndDrop";
import axios from "../../config/axios";
import localStorageService from "../../services/localStorageService";
import ConfirmModal from "./ConfirmModal";

// import "./App.css";
import "react-big-calendar/lib/addons/dragAndDrop/styles.css";
import "react-big-calendar/lib/css/react-big-calendar.css";

const localizer = momentLocalizer(moment);
const DnDCalendar = withDragAndDrop(Calendar);
let bookingTime = "test";

class CalendarDnd extends Component {
  constructor(props) {
    super(props);
  }

  state = {
    events: [
      {
        start: moment().toDate(),
        end: moment().toDate(),
        title: "Booking Coach",
      },
    ],
  };

  onEventResize = (data) => {
    const { start, end } = data;

    this.setState((state) => {
      state.events[0].start = start;
      state.events[0].end = end;
      bookingTime = state.events[0].start + "-" + state.events[0].end;
      return { events: [...state.events] };
    });
  };

  onEventDrop = (data) => {
    console.log(data);
  };

  render() {
    const coach = this.props.coach;
    const game = this.props.coach.game;
    const user = this.props.user;

    return (
      <div className="App">
        <DnDCalendar
          defaultDate={moment().toDate()}
          defaultView="month"
          events={this.state.events}
          localizer={localizer}
          onEventDrop={this.onEventDrop}
          onEventResize={this.onEventResize}
          resizable
          style={{ height: "65vh" }}
        />
        <ConfirmModal
          info={{ bookingTime, coach, game, user }}
          // bookingTime={bookingTime} coachId={coachId} game={game} userId={userId}
        ></ConfirmModal>
      </div>
    );
  }
}

export default CalendarDnd;
