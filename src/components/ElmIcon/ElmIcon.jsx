import { SvgIcon } from "@mui/material/SvgIcon";
// import {styled} from '@mui/material/styles';

const ElmIcon = (props) => {
    return (
        <SvgIcon viewBox="0 0 24 24" {...props}>
            {props.children}
        </SvgIcon>
    );
};

export default ElmIcon;


