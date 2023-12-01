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

export default function OnlineUsersView() {
  return (
    <>
      <Stack spacing={0.5}>
        <Stack direction={"row"} spacing={1}>
          <Circle sx={{ color: "green" }} />
          <Typography>Online</Typography>
        </Stack>
        <Stack>
          <List>
            <ListItem>
              <ListItemAvatar>
                <Avatar>DL</Avatar>
              </ListItemAvatar>
              <ListItemText primary={"dlam1"} />
            </ListItem>
            <ListItem>
              <ListItemAvatar>
                <Avatar>EM</Avatar>
              </ListItemAvatar>
              <ListItemText primary={"emusk"} />
            </ListItem>
          </List>
        </Stack>
        <Stack direction={"row"} spacing={1}>
          <Circle sx={{ color: "red" }} />
          <Typography>Offline</Typography>
        </Stack>
        <Stack>
          <List>
            <ListItem>
              <ListItemAvatar>
                <Avatar>JB</Avatar>
              </ListItemAvatar>
              <ListItemText primary={"jbezosaz"} />
            </ListItem>
            <ListItem>
              <ListItemAvatar>
                <Avatar>MZ</Avatar>
              </ListItemAvatar>
              <ListItemText primary={"markfb"} />
            </ListItem>
          </List>
        </Stack>
      </Stack>
    </>
  );
}
