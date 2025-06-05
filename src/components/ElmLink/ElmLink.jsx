import { Link } from "react-router-dom";
import { styled } from "@mui/material/styles";

const ElmLink = styled(Link)(({ theme }) => ({
    color: theme.palette.primary.main,
    "&:hover": {
        color: theme.palette.primary.dark,
    },
}));

export default ElmLink;