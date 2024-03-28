import React from "react";
import { List, ListItem, ListItemText } from "@mui/material";
import { menuList, sidebarWidth, version } from "../../../helpers/config";
import Logo from "../Logo";
import SearchInput from "../../common/Search";

const SidebarDrawer = () => {
  return (
    <nav
      className={`flex flex-col bg-surface h-full`}
      style={{ transition: "width 400ms ease", width: sidebarWidth }}
    >
      <menu className="p-5 mb-5 flex flex-col gap-10">
        <Logo />
        <SearchInput />
      </menu>

      <List component="menu" className="flex-1">
        {menuList.map((item, _index) => (
          <ListItem key={_index} className="cursor-pointer hover:bg-background">
            <div className="text-primary mr-2">{item.icon}</div>
            <ListItemText
              primary={item.title}
              className="text-primary whitespace-nowrap"
            />
          </ListItem>
        ))}
      </List>
      <p className="p-5 text-primary">Version: {version}</p>
    </nav>
  );
};

export default SidebarDrawer;
