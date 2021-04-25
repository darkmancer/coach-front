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
        justifyContent: "center",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "start",
          flexFlow: "wrap",
          width: "1200px",
        }}
      >
        {coaches?.length > 0 ? (
          coaches?.map((coach) => {
            return (
              <div
                className="card"
                style={{
                  boxShowdow: "0 4px 8px 0 rgba(0,0,0,0.2)",
                  transition: "0.3s",
                  width: "20%",
                  margin: "20px",
                }}
                onClick={() => handlePushNewPage(coach)}
              >
                <img
                  src={coach.avatar}
                  alt="Avatar"
                  style={{ width: "auto", height: "200px" }}
                />
                <div className="container" style={{ padding: "2px 16px" }}>
                  <h4>
                    <b>{coach.username}</b>
                  </h4>
                  <p>{coach.rank}</p>
                </div>
              </div>
            );
          })
        ) : (
          <div> not found</div>
        )}
      </div>
    </div>
  );
}
