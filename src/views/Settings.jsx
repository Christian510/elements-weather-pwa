import { Container, Typography, Paper } from "@mui/material";
import { NavLink } from "react-router-dom";

const Settings = () => {
  //   const [form, setForm] = useState({
  //     units: 'Farenheit',
  //   });

  //   const handleChange = (e) => {
  //     setForm({ ...form, [e.target.name]: e.target.value });
  //   };

 // NavLink should be mad into a component for reusability and consistency.
  return (
    <Container maxWidth="xs" sx={{ mt: 4 }}>
      <Paper elevation={3} sx={{ p: 3 }}>
        <Typography variant="h5" align="center" gutterBottom>
          Settings
        </Typography>
      </Paper>
        <Typography variant="h6" align="right" gutterBottom color={"white"}>
      <NavLink to="/">
          Done
      </NavLink>
        </Typography>
    </Container>
  );
};

export default Settings;
