import { useState, useEffect, useContext } from "react";
import { useLocation, useParams } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import BookingModal from "../components/booking/BookingModal";
import axios from "../config/axios";
import ReviewModal from "../components/ReviewModal";
import Rating from "@material-ui/lab/Rating";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";

export default function CoachProfile({}) {
  //   const location = useLocation();
 
  const [coach, setCoach] = useState(null);
  const [reviews, setReviews] = useState(null);
  const [whoReview, setWhoReview] = useState(null);
  const [trigger, setTrigger] = useState(false);
  const [avgScore, setAvgScore] = useState(0);
  const { id } = useParams();
  console.log(id);
  // const sumReviewScore = async () => {
  //   const mapped = await reviews?.map((review) => {
  //     return Number(review.reviewScore);
  //   });
  //   let averageScore = await Math.ceil(
  //     mapped?.reduce((a, b) => a + b) / mapped?.length
  //   );
  //   await setAvgScore(averageScore);
  // };
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
        console.log("this shit")
        setReviews(res.data.reviews.reverse());
        setAvgScore(res.data.averageScore)
      } catch (err) {
        console.log(`err`, err);
      }
    };
    fetchReviews();
    // .then(() => sumReviewScore());
  }, [trigger]);
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

  console.log(`avgScore`, avgScore);

  return (
    <div>
      <div>
        {coach ? (
          <div>
            <h1>coach profile</h1>
            <h1>{coach.username}</h1>
            <img src={coach.avatar} width="100" height="100" />
            <h2>{coach.about}</h2>
            <h4>฿{coach.price}/Hour</h4>

            <Rating name="read-only" value={avgScore} readOnly />
            <BookingModal coach={coach}></BookingModal>
            <ReviewModal coachId={coach.id} setTrigger={setTrigger} />
          </div>
        ) : (
          <div>loading</div>
        )}
      </div>

      {reviews
        ? reviews.map((review) => (
            <div>
              <Rating name="read-only" value={review.reviewScore} readOnly />

              <p>review: {review.review}</p>
              <p>
                review by:
                {
                  whoReview?.filter((who) => {
                    return who.userId == review.userId;
                  })[0].username
                }
              </p>
              <hr></hr>
            </div>
          ))
        : null}
    </div>
  );
}
