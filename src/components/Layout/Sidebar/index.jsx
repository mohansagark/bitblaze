import React from "react";
import { List, ListItem, ListItemText } from "@mui/material";
import { menuList, sidebarWidth } from "../../../helpers/config";

const SidebarDrawer = () => {
  return (
    <nav
      className={`bg-surface h-full`}
      style={{ transition: "width 400ms ease", width: sidebarWidth }}
    >
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
