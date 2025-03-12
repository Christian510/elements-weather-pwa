import { Link } from "react-router-dom";

function Button(props) {

    return (
        <div className='add-button'>
            <Link to={props.path}>{props.name}</Link>
        </div>
    );
}

export default Button;


