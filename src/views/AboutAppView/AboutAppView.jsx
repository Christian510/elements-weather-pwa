import React from "react";
import '../AboutAppView/aboutappview.css';
import { styled } from '@mui/system';
import ListCard from '../../components/ListCard/ListCard.jsx';
// import { List } from "@mui/material";
import ElmAutoCompleteB from '../../components/ElmAutoComplete/ElmAutoComplete_B.jsx';
import ElmAutocompete from '../../components/ElmAutoComplete/ElmAutoComplete.jsx';

function AboutView(props) {


    return (
        <>
            <div id="about-page" className="container">
                <h2>Welcome Elements Weather</h2>
                <h3>A person project to create a weather app I like using.</h3>
                <ListCard />
                <ElmAutoCompleteB />
                {/* <ElmAutocompete /> */}
            </div>
        </>
    );
}

export default AboutView;