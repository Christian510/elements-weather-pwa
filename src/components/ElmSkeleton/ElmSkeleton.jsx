import Skeleton from "@mui/material/Skeleton"
import Box from "@mui/material/Box"

export default function ElmSkeleton({height, width}) {
    
    return (
        <Box 
            id="list-skeleton-loader" 
            sx={{
                width: "100%",
                display: "flex",
                flexDirection: "column",
                alignItems: "center"}} >
            <Skeleton animation="wave" height={height} width={width} />
            <Skeleton animation="wave" height={height} width={width} />
            <Skeleton animation="wave" height={height} width={width} />
            <Skeleton animation="wave" height={height} width={width} />
        </Box>
    )
};