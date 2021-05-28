import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { useHistory, useLocation } from "react-router-dom";
import axios from "../config/axios";

const useStyles = makeStyles({
  root: {
    maxWidth: 345,
  },
  media: {
    height: 140,
  },
});

export default function CoachCard({ coaches, user }) {
  const classes = useStyles();
  console.log(coaches);
  const history = useHistory();
  const handlePushNewPage = async (coach) => {
    history.push(`/coach-profile/${coach.id}`, { coach });
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "start",
        flexFlow: "wrap",
        width: "100vw",
        padding: "50px",
      }}
    >
      {coaches?.length > 0 ? (
        coaches?.map((coach) => {
          return (
            <Card
              variant="elevation"
              onClick={() => handlePushNewPage(coach)}
              style={{ width: "200px", margin: "50px" }}
            >
              <img
                src={coach.avatar}
                alt="Avatar"
                style={{
                  width: "100%",
                  height: "200px",
                  overflow: "hidden",
                  objectFit: "cover",
                  objectPosition: "50% 50%",
                }}
              />
              <div className="container" style={{ padding: "16px" }}>
                <Typography
                  variant="h5"
                  component="h4"
                  style={{ fontWeight: "600" }}
                >
                  {coach.username}
                </Typography>
                <Typography variant="body1" component="h4">
                  {coach.rank}
                </Typography>
              </div>
            </Card>
          );
        })
      ) : (
        <div> not found</div>
      )}
    </div>
  );
}
