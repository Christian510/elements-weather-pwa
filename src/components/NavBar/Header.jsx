import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import { styled } from '@mui/material/styles';

export default function Header(props) {

  return (
      <StyledHeader id="elm-header" position="sticky" >
        <Toolbar 
          id='toolbar'
          sx={toolBarStyles}>
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
  // paddingRight: '.5em',
  // paddingLeft: '.5em',
  boxShadow: 'none',
  zIndex: theme.zIndex.appBar
}))

const toolBarStyles = {
  width: 'inherit',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'flex-start',
  paddingLeft: '.5em',
  paddingRight: '.5em',
}