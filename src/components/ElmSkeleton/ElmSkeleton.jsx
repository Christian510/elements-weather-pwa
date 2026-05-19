import Skeleton from "@mui/material/Skeleton";
import Box from "@mui/material/Box";

export function ListCardSkeleton() {
  return (
    <Box sx={{
      width: '95%',
      margin: '.75em .6em',
      display: 'flex',
      justifyContent: 'center',
    }}>
      <Box sx={{
        width: '100%',
        maxWidth: '31.25em',
        height: '5.5em',
        borderRadius: '15px',
        overflow: 'hidden',
        display: 'flex',
        alignItems: 'center',
        bgcolor: 'action.hover',
        px: 1.5,
      }}>
        <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 0.75, py: 1 }}>
          <Skeleton animation="wave" variant="text" width="55%" height={28} />
          <Skeleton animation="wave" variant="text" width="35%" height={16} />
          <Skeleton animation="wave" variant="text" width="75%" height={14} />
        </Box>
        <Box sx={{ width: '25%', display: 'flex', justifyContent: 'center' }}>
          <Skeleton animation="wave" variant="text" width="60%" height={52} />
        </Box>
      </Box>
    </Box>
  );
}

export default function ElmSkeleton({ count = 4 }) {
  return (
    <Box sx={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      {Array.from({ length: count }).map((_, i) => (
        <ListCardSkeleton key={i} />
      ))}
    </Box>
  );
}
