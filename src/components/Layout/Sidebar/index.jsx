import React from "react";
import { List, ListItem, ListItemText } from "@mui/material";
import {
  RiHome2Fill,
  RiInformationFill,
  RiServiceFill,
  RiContactsFill,
} from "react-icons/ri";

const SidebarDrawer = () => {
  return (
    <div className="w-64 bg-surface h-full">
      <List component="nav">
        <ListItem>
          <RiHome2Fill className="text-primary mr-2" />
          <ListItemText primary="Home" className="text-primary" />
        </ListItem>
        <ListItem>
          <RiInformationFill className="text-primary mr-2" />
          <ListItemText primary="About" className="text-primary" />
        </ListItem>
        <ListItem>
          <RiServiceFill className="text-primary mr-2" />
          <ListItemText primary="Services" className="text-primary" />
        </ListItem>
        <ListItem>
          <RiContactsFill className="text-primary mr-2" />
          <ListItemText primary="Contact" className="text-primary" />
        </ListItem>
      </List>
    </div>
  );
};

export default SidebarDrawer;
