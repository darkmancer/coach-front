import React from "react";
import { useState, useEffect, useContext } from "react";
import { AuthContext } from "../contexts/AuthContextProvider";
import axios from "../config/axios";
import moment from "moment";
import Loading from "../components/Loading";
import { CoachesContext } from "../contexts/CoachesContextProvider";
import ConfirmActionModal from "../components/booking/ConfirmActionModal.js.js";
import PayModal from "../components/PayModal"
import AvatarModal from "../components/AvatarModal"
export default function User() {
  const { user, setUser } = useContext(AuthContext);
  const [bookings, setBookings] = useState(null);
  const [coaches, setCoaches] = useState(null);
  const [triggerCancel, setTriggerCancel] = useState(false);

  const fetchCoaches = async () => {
    try {
      const res = await axios.get("/coach/");
      console.log(res);
      setCoaches(res.data.coaches);
    } catch (err) {
      console.log(`err`, err);
    }
  };

  const fetchBookingList = async () => {
    try {
      const res = await axios.get(`/booking/get-booking/`);
      setBookings(res.data.bookings.reverse());
    } catch (err) {
      console.log(`err`, err);
    }
  };
  const handleCancel = async (id) => {
    try {
      await axios.put(`booking/cancel/${id}`);
      setTriggerCancel((prev) => !prev);
      console.log("handleCancel works");
    } catch (err) {}
  };

  useEffect(() => {
    fetchBookingList();
    fetchCoaches();
  }, [triggerCancel]);

  console.log("bookings", bookings);
  console.log("coaches", coaches);

  return (
    <div>
      โปรไฟลของ {user.username}
      <hr></hr>
      <div style={{ textAlign: "center" }}>
        <img src={user.avatar} width="75" />
        <h4>{user.username}</h4>
        <AvatarModal
        userId={user.id}
        button="UPLOAD Avatar"
        message="Are you willing change this shit?"
        title="avatar"
        />
      </div>
      <div>
        <h1>My Booking</h1>
        {bookings ? (
          bookings.map((booking) => (
            <div>
              <p>
                {booking.bookingTime
                  .split("-")
                  .map((part) => moment(part).format("DD MMM YYYY HH:mm"))
                  .join(" - ")}

                {
                  coaches?.filter((coach) => {
                    return coach.id == booking.coachId;
                  })[0].username
                }

                {
                  coaches?.filter((coach) => {
                    return coach.id == booking.coachId;
                  })[0].rank
                }
                <img
                  src={
                    coaches?.filter((coach) => {
                      return coach.id == booking.coachId;
                    })[0].avatar
                  }
                  width="10%"
                />
                {booking.status}
              </p>
              {booking.status!=="CANCELED" ? (<> <PayModal 
              bookingId={booking.id}
              button="UPLOAD PAYMENT"
              message="Are you willing to pay this shit?"
              title="pay"
              />
              <ConfirmActionModal
                handleConfirm={() => handleCancel(booking.id)}
                button="CANCEL BOOKING"
                message="You are cancelling this booking. Are you sure?"
                title="Cancelling booking..."
              /></>): (<></>)}
             
            </div>
          ))
        ) : (
          <div>
            <Loading></Loading>
          </div>
        )}
      </div>
    </div>
  );
}
