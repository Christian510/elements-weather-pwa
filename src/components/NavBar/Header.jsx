import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import { styled } from '@mui/material/styles';

export default function Header(props) {

  return (
      <StyledHeader id="header" position="sticky" >
        <Toolbar sx={toolBarStyles}>
          { props.children }
        </Toolbar>
      </StyledHeader>
  );
}

const StyledHeader = styled(AppBar)(({ theme }) => ({
  width: 'inherit',
  minHeight: '11vh',
  backgroundColor: 'inherit',
  backgroundImage: 'unset',
  opacity: 0.9,
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'center',
  paddingRight: '0px',
  paddingLeft: '0px',
  boxShadow: 'none',
  zIndex: theme.zIndex.appBar
}))

const toolBarStyles = {
  width: 'inherit',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  paddingLeft: '.5em',
  paddingRight: '.5em',
}