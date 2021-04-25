import { useState, useEffect, useContext } from "react";
import { useQuery, QueryClient } from "react-query";
import GamesBar from "../components/GamesBar";
import axios from "../config/axios";
import localStorageService from "../services/localStorageService";
import CoachesContainer from "../components/CoachesContainer.js";
import { AuthContext } from "../contexts/AuthContextProvider";

function Home() {
  const [game, setGame] = useState("dota");
  const [coaches, setCoaches] = useState(null);
  const { user, setUser } = useContext(AuthContext);

  // useEffect(() => {
  //   const fetchRequestList = async () => {
  //     try {
  //       const res = await axios.get("/user/me");
  //       setUser(res.data.user);
  //     } catch (err) {}
  //   };
  //   fetchRequestList();
  // }, []);
  // console.log(user);

  // const fetchCoachesList = async () => {
  //   try {
  //     console.log(game);
  //     const res = await axios.get(`/coach/${game}`);
  //     setCoach(res.data.coaches);
  //     return res.data;

  //   } catch (err) {
  //     console.log(`err`, err);
  //   }
  // };

  // const { isLoading, isError, data, error } = useQuery("coach", fetchCoachesList);
  // if(isLoading){
  //   return <span>Loading...</span>
  // }
  // if(isError){
  //   return <span>Error: {error.message}</span>
  // }
  // console.log(data)

  useEffect(() => {
    const fetchCoachesList = async () => {
      try {
        console.log(game);
        const res = await axios.get(`/coach/getCoachByGame/${game}`);
        setCoaches(res.data.coaches);
      } catch (err) {
        console.log(`err`, err);
      }
    };

    fetchCoachesList();
  }, [game]);

  return (
    <>
      <GamesBar setGame={setGame} />
      <CoachesContainer game={game} coaches={coaches} user={user} />
    </>
  );
}

export default Home;
