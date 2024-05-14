import React from "react";
import { Link } from 'react-router-dom';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import { customStyles } from "../ElmThemeStyles/ElmTheme";

export function StyledButtonLink({ component=Link, children, to, sx, disableRipple, variant, color, onClick, type='button' }) {
  
  // const styles = useTheme()
  // if (!sx) {
  // }
  return (
  <StyledButton 
    component={component} 
    to={to} 
    sx={sx}
    disableRipple={disableRipple}
    variant={variant}
    color={color}
    onClick={onClick}
    type={type}
    >
    {children}
  </StyledButton>

  );

};

const StyledButton =  styled(Button)(({theme}) => ({
  color: theme.palette.text.primary,
  textShadow: customStyles.textShadow, 
}))