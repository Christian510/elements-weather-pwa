import { Container } from "@mui/material";
import { styled } from "@mui/material/styles";

const ElmContainer = styled(Container)(({ theme }) => ({
    height: "100vh",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "flex-between",
}));

export default ElmContainer;