import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  Container,
} from "@mui/material";
import "./css/SelectMUI.css";

export default function LeftPanel() {
  return (
    <>
      <Stack className="p-2 w-1/3 md:w-1/4 bg-[#B3F992]">
        <Stack spacing={2}>
          <div className="pt-3 font-bold text-xl md:text-3xl text-center">Free Services</div>
          <div>
            <FormControl fullWidth>
              <InputLabel id="tutoring">Tutoring</InputLabel>
              <Select labelId="tutoring" label="Tutoring" fullWidth>
                <Stack spacing={2} className="px-2">
                  <FormControl fullWidth>
                    <InputLabel id="math">Mathematics</InputLabel>
                    <Select labelId="math" label="Mathematics" fullWidth>
                      <MenuItem>Tutor name 1</MenuItem>
                      <MenuItem>Tutor name 2</MenuItem>
                    </Select>
                  </FormControl>
                  <FormControl fullWidth>
                    <InputLabel id="cs">Computer Science</InputLabel>
                    <Select labelId="cs" label="Computer Science" fullWidth>
                      <MenuItem>Tutor name 1</MenuItem>
                      <MenuItem>Tutor name 2</MenuItem>
                    </Select>
                  </FormControl>
                </Stack>
              </Select>
            </FormControl>
          </div>
          <div>
            <FormControl fullWidth>
              <InputLabel id="mentorship">Mentorship</InputLabel>
              <Select labelId="mentorship" label="Mentorship" fullWidth>
                <MenuItem>Mentor name 1</MenuItem>
                <MenuItem>Mentor name 2</MenuItem>
              </Select>
            </FormControl>
          </div>
          <div>
            <FormControl fullWidth>
              <InputLabel id="career_counseling">Career Counseling</InputLabel>
              <Select
                labelId="career_counseling"
                label="Career Counseling"
                fullWidth
              >
                <MenuItem>Counselor name 1</MenuItem>
                <MenuItem>Counselor name 2</MenuItem>
              </Select>
            </FormControl>
          </div>
        </Stack>
      </Stack>
    </>
  );
}
