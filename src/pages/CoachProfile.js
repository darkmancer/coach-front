import { useState, useEffect } from "react";
import { useLocation, useParams } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import BookingModal from "../components/booking/BookingModal";
import axios from "../config/axios";
export default function CoachProfile({}) {
  //   const location = useLocation();
  const [coach, setCoach] = useState(null);
  const [reviews, setReviews] = useState(null);
  const [whoReview, setWhoReview] = useState(null);
  const { id } = useParams();
  console.log(id);
  //   const coach = location.state.coach;
  //   const user = location.state.user;

  //     location.pathname = `/coach-profile/${coach.id}`;
  //   console.log(location);

  //   console.log(coach);
  //   console.log(user);
  //   console.log("id", id);
  useEffect(() => {
    const fetchCoach = async () => {
      try {
        const res = await axios.get(`/coach/${id}`);
        console.log(res);
        setCoach(res.data.coach);
      } catch (err) {
        console.log(`err`, err);
      }
    };
    fetchCoach();
  }, []);
  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const res = await axios.get(`/review/${id}`);
        console.log(res);
        setReviews(res.data.reviews);
      } catch (err) {
        console.log(`err`, err);
      }
    };
    fetchReviews();
  }, []);
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await axios.get(`/user/allUsers`);
        console.log(res);
        setWhoReview(res.data.mappedUsers);
      } catch (err) {
        console.log(`err`, err);
      }
    };
    fetchUsers();
  }, []);
  return (
    <div>
      <div>
        {coach ? (
          <div>
            <h1>coach profile</h1>
            <h1>{coach.username}</h1>
            <img src={coach.avatar} width="100" height="100" />
            <h2>{coach.about}</h2>
            <BookingModal coach={coach}></BookingModal>
          </div>
        ) : (
          <div>loading</div>
        )}
      </div>
      {reviews?.map((review) => (
        <div>
          <p>score: {review.reviewScore}</p>
          <p>review: {review.review}</p>
          <p>review by: {whoReview?.filter((who)=> {
            return who.userId == review.userId
          })[0].username}</p>
        </div>
      ))}
    </div>
  );
}
