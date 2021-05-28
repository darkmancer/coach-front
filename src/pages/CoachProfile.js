import { useState, useEffect, useContext } from "react";
import { useLocation, useParams } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import BookingModal from "../components/booking/BookingModal";
import axios from "../config/axios";
import ReviewModal from "../components/ReviewModal";
import Rating from "@material-ui/lab/Rating";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import Divider from "@material-ui/core/Divider";

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
        console.log("this shit");
        setReviews(res.data.reviews.reverse());
        setAvgScore(res.data.averageScore);
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
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-start",
        alignItems: "center",
        height: "100vh",
      }}
    >
      {coach ? (
        <Paper
          elevation={5}
          style={{
            margin: "10vh",
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "row",
            }}
          >
            <div
              style={{
                width: "40%",

                display: "flex",
                flexDirection: "row",
                justifyContent: "flex-end",
              }}
            >
              <img
                src={coach.avatar}
                style={{
                  width: "100%",
                  height: "100%",
                  overflow: "hidden",
                  objectFit: "cover",
                  objectPosition: "50% 50%",
                }}
              />
            </div>
            <div
              style={{
                padding: "20px",

                width: "40%",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-evenly",
                alignItems: "flex-start",
              }}
            >
              <Typography variant="h3">{coach.username}</Typography>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "flex-start",
                }}
              >
                <Rating name="read-only" value={avgScore} readOnly /> (
                {reviews?.length} บทวิจารณ์จากลูกค้า)
              </div>
              <Typography variant="h4">฿{coach.price}/Hour</Typography>
              <BookingModal coach={coach}></BookingModal>
              <Typography>{coach.about}</Typography>

              <ReviewModal coachId={coach.id} setTrigger={setTrigger} />
            </div>
            <Paper
              style={{
                width: "20%",
                height: "600px",
                overflow: "scroll",
              }}
            >
              {reviews
                ? reviews.map((review) => (
                    <div>
                      <div style={{ padding: "20px" }}>
                        <Rating
                          name="read-only"
                          value={review.reviewScore}
                          readOnly
                        />

                        <Typography variant="subtitle1">{review.review}</Typography>
                        <Typography variant="subtitle2">
                          {" "}
                          {
                            whoReview?.filter((who) => {
                              return who.userId == review.userId;
                            })[0].username
                          } 
                        </Typography>
                      </div>
                      <Divider />
                    </div>
                  ))
                : null}
            </Paper>
          </div>
        </Paper>
      ) : (
        <div>loading</div>
      )}
    </div>
  );
}
