import { StyledButtonLink } from "../../components/StyledButtonLink";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";

export default function ElmFooter() {
  return (
    <Container
        maxWidth="100%">
      <Box
        id="bottom-nav"
        display="flex"
        justifyContent="space-between"
        sx={{
          padding: "0.5em 0 0.5em 0",
        }}
      >
      <StyledButtonLink
        to={`#`}
        sx
        disableRipple={true}
        variant="text"
        color="primary"
      >
        Map
      </StyledButtonLink>
      <StyledButtonLink
        to={"/"}
        sx
        disableRipple={true}
        variant="text"
        color="primary"
      >
        <FormatListBulletedIcon fontSize="small" />
      </StyledButtonLink>
      </Box>
    </Container>
  );
}
