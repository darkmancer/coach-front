import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { useState, useEffect, useContext } from "react";
import { AuthContext } from "../contexts/AuthContextProvider";
import axios from "../config/axios";
import moment from "moment";
import Loading from "../components/Loading";
import { CoachesContext } from "../contexts/CoachesContextProvider";
import ConfirmActionModal from "../components/booking/ConfirmActionModal.js.js";
import PayModal from "../components/PayModal";
import AvatarModal from "../components/AvatarModal";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";

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
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-start",
        alignItems: "center",
        padding: "3% 0px",
      }}
    >
      <Paper
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-evenly",
          alignItems: "center",
          width: "20%",
          height: "30%",
          padding: "20px",
        }}
      >
        โปรไฟลของ {user.username}
        <img src={user.avatar} width="75" />
        <Typography variant="h5" component="h2">
          {user.username}
        </Typography>
        <AvatarModal
          userId={user.id}
          button="UPLOAD Avatar"
          message="Are you willing change this shit?"
          title="avatar"
        />
      </Paper>

      <div style={{ width: "60%" }}>
        <Typography variant="h4" component="h2">
          My Bookings
        </Typography>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell style={{ width: "12vw" }}>Session Time</TableCell>
                <TableCell style={{ width: "7vw" }}>Name</TableCell>
                <TableCell style={{ width: "7vw" }}>Rank</TableCell>
                <TableCell>Avatar</TableCell>
                <TableCell>Status</TableCell>
                <TableCell style={{ width: "15vw" }}>Buttons</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {bookings ? (
                bookings.map((booking, idx) => (
                  <TableRow key={idx}>
                    <TableCell>
                      {booking.bookingTime
                        .split("-")
                        .map((part) => moment(part).format("DD MMM YYYY HH:mm"))
                        .join(" - ")}
                    </TableCell>
                    <TableCell>
                      {
                        coaches?.filter((coach) => {
                          return coach.id == booking.coachId;
                        })[0].username
                      }
                    </TableCell>
                    <TableCell>
                      {
                        coaches?.filter((coach) => {
                          return coach.id == booking.coachId;
                        })[0].rank
                      }
                    </TableCell>
                    <TableCell style={{ padding: "0px" }}>
                      <img
                        src={
                          coaches?.filter((coach) => {
                            return coach.id == booking.coachId;
                          })[0].avatar
                        }
                        width="100%"
                      />
                    </TableCell>
                    <TableCell>{booking.status}</TableCell>
                    <TableCell>
                      {booking.status !== "CANCELED" ? (
                        <>
                          {" "}
                          <PayModal
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
                          />
                        </>
                      ) : (
                        <></>
                      )}
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <div>
                  <Loading></Loading>
                </div>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </div>
  );
}
