import React from "react";
import List from  "@mui/material/List";


export default function ElmList({ items, renderItem }) {
    return (
      <List>
          {items.map((item, index) => {
            return renderItem(item);
          })}
      </List>
    );
}