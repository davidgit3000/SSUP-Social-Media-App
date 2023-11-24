import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  Container,
} from "@mui/material";

export default function LeftPanel() {
  return (
    <>
      <Stack>
        <Box sx={{ bgcolor: "#B3F992", height: "100vh", width: "40vh" }}>
          <Stack spacing={2} className="p-3">
            <div className="font-bold text-3xl text-center">Free Services</div>
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
                <InputLabel id="career_counseling">
                  Career Counseling
                </InputLabel>
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
        </Box>
      </Stack>
    </>
  );
}
