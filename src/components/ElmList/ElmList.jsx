import React from "react";
import List from  "@mui/material/List";


export default function ElmList({type='List', items, renderItem }) {
    // console.log('items: ', items);
    return (
      <List id={type}>
          {items.map((item, index) => {
            return renderItem(item);
          })}
      </List>
    );
}