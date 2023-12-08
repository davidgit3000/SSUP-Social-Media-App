import {
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Stack,
  Typography,
  Avatar,
} from "@mui/material";
import { Circle } from "@mui/icons-material";
import { useEffect, useState } from "react";
import axios from "axios";

export default function OnlineUsersView() {
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [offlineUsers, setOfflineUsers] = useState([]);

  useEffect(() => {
    // Fetch users' online status from API
    async function fetOnlineUsers() {
      try {
        const response = await axios.get("http://localhost:8000/api/users/");
        const users = response.data;

        // FIlter users based on online status
        const online = users.filter((user) => user.is_online);
        const offline = users.filter((user) => !user.is_online);

        setOnlineUsers(online);
        setOfflineUsers(offline);
      } catch (error) {
        console.error("Error fetching users: ", error.response.data);
      }
    }

    fetOnlineUsers();
  }, []);

  return (
    <>
      <Stack spacing={0.5}>
        <Stack direction={"row"} spacing={1}>
          <Circle sx={{ color: "green" }} />
          <Typography>Online</Typography>
        </Stack>
        <Stack>
          <List>
            {onlineUsers.map((user) => (
              <ListItem key={user.id}>
                <ListItemAvatar>
                  <Avatar>
                    {user.firstname.charAt(0)}
                    {user.lastname.charAt(0)}
                  </Avatar>
                </ListItemAvatar>
                <ListItemText primary={user.username} />
              </ListItem>
            ))}
          </List>
        </Stack>
        <Stack direction={"row"} spacing={1}>
          <Circle sx={{ color: "red" }} />
          <Typography>Offline</Typography>
        </Stack>
        <Stack>
          <List>
            {offlineUsers.map((user) => (
              <ListItem key={user.id}>
                <ListItemAvatar>
                  <Avatar>
                    {user.firstname.charAt(0)}
                    {user.lastname.charAt(0)}
                  </Avatar>
                </ListItemAvatar>
                <ListItemText primary={user.username} />
              </ListItem>
            ))}
          </List>
        </Stack>
      </Stack>
    </>
  );
}
