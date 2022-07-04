import { useEffect, useState } from "react";
import { API_DOMAIN } from "./constants";
import { User } from "./types";

export const useCurrentUser = () => {
  const [user, setuser] = useState(null as null | User);
  useEffect(() => {
    const data = localStorage.getItem("currentUser");
    if (data) setuser(JSON.parse(data) as User);
    const token = localStorage.getItem('token');
    if (token) fetch(`${API_DOMAIN}/users/@me/`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    }).then((response) => {
      response.json().then((e) => {
        setuser(e);
        localStorage.setItem("currentUser", JSON.stringify(e));
      });
    });
  }, []);
  return user;
};
