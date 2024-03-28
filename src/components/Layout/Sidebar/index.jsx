import React from "react";
import { List, ListItem, ListItemText } from "@mui/material";
import { menuList } from "../../../helpers/config";

const SidebarDrawer = () => {
  return (
    <nav className="w-64 bg-surface h-full">
      <List component="menu">
        {menuList.map((item, _index) => (
          <ListItem key={_index}>
            <div className="text-primary mr-2">{item.icon}</div>
            <ListItemText
              primary={item.title}
              className="text-primary whitespace-nowrap"
            />
          </ListItem>
        ))}
      </List>
    </nav>
  );
};

export default SidebarDrawer;
