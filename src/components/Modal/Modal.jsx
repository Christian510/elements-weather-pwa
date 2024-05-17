import { styled } from '@mui/material/styles';
import { Card, Button, ListItemButton, Box, Link, Container } from "@mui/material";


export default function Modal({ children, open, onClose }) {
  return (
    <StyledContainer open={open} onClick={onClose}>
      <Card className="modal">
        <Button onClick={onClose} className="modal-close">Close</Button>
        <ListItemButton className="modal-content" onClick={(e) => e.stopPropagation()}>
          {children}
        </ListItemButton>
      </Card>
    </StyledContainer>
  );
}

const StyledContainer = styled(Container)`
    display: ${props => props.open ? 'flex' : 'none'};
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0,0,0,0.5);
    justify-content: center;
    align-items: center;
    z-index: 100;
`;