import Divider from "@mui/material/Divider";
import Box from "@mui/material/Box";

export default function ElmDivider() {
  return (
    <Box
      sx={{
        width: "90%",
        margin: "1em auto",
        display: "inline-flex",
        alignItems: "center",
        borderColor: "grey.600",
        borderRadius: 2,
        bgcolor: "grey.600",
        color: "text.secondary",
        "& svg": {
          m: 1,
        },
      }}
    >
      <Divider flexItem />
    </Box>
  );
}
