import { useState, useEffect } from "react";
import styled from "styled-components";

const TimeOfPost = styled.p`
  color: #888888;
`;

const getTimeAgo = (timestamp) => {
  const seconds = Math.floor((Date.now() - timestamp) / 1000);

  if (seconds < 60) {
    return `${seconds} second${seconds !== 1 ? "s" : ""} ago`;
  }

  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) {
    return `${minutes} minute${minutes !== 1 ? "s" : ""} ago`;
  }

  const hours = Math.floor(minutes / 60);
  if (hours < 24) {
    return `${hours} hour${hours !== 1 ? "s" : ""} ago`;
  }

  const days = Math.floor(hours / 24);
  return `${days} day${days !== 1 ? "s" : ""} ago`;
};

export const TimeComponent = () => {
  const [postTime] = useState(Date.now()); // Spara postens publiceringstid
  const [timeAgo, setTimeAgo] = useState(getTimeAgo(postTime));

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeAgo(getTimeAgo(postTime));
    }, 10000); // Uppdatera var 10:e sekund (ändra vid behov)

    return () => clearInterval(interval);
  }, [postTime]);

  return <TimeOfPost>{timeAgo}</TimeOfPost>;
};
