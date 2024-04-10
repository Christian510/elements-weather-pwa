import React from "react";
import '../AboutAppView/aboutappview.css';
// import { createTheme, styled } from '@mui/material/styles';
import ListCard from '../../components/ListCard/ListCard.jsx';
// import { List } from "@mui/material";
import ElmAutoCompleteB from '../../components/ElmAutoComplete/ElmAutoComplete_B.jsx';
import ElmAutocompete from '../../components/ElmAutoComplete/ElmAutoComplete.jsx';

// const theme = createTheme();
// console.log('theme: ', theme);

function AboutView(props) {
    console.log('props: ', props);
    return (
        <>
            <div id="about-page" className="container">
                <h2>Welcome Elements Weather</h2>
                <h3>A person project to create a weather app I like using.</h3>
                <ul>
                    {Array.from(Array(3)).map((_, index) => <ListCard key={index} />)}
                </ul>
                {/* <ElmAutoCompleteB /> */}
                {/* <ElmAutocompete /> */}
            </div>
        </>
    );
}


export default AboutView;