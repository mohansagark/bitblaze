import React from "react";
import { List, ListItem, ListItemText, capitalize } from "@mui/material";
import { menuList, sidebarWidth, version } from "../../../helpers/config";
import Logo from "../Logo";
import SearchInput from "../../common/Search";
import { useNavigate } from "react-router-dom";

const SidebarDrawer = () => {
  const navigate = useNavigate();
  const gotoRoute = (path) => {
    navigate(path);
  };

  const groupedMenu = menuList.reduce((acc, item) => {
    if (!acc[item.category]) {
      acc[item.category] = [];
    }
    acc[item.category].push(item);
    return acc;
  }, {});

  const groups = Object.entries(groupedMenu).sort((a, b) =>
    a[0].localeCompare(b[0])
  );

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
        {groups.map(([category, items]) => (
          <div key={category}>
            <ListItem>
              <ListItemText
                primary={capitalize(`${category}s`)}
                className="text-primary"
                primaryTypographyProps={{ fontWeight: 700 }}
              />
            </ListItem>
            {items.map((item, index) => (
              <ListItem
                key={index}
                className="cursor-pointer hover:bg-background"
              >
                <div className="text-primary mr-2">{item.icon}</div>
                <ListItemText
                  primary={item.title}
                  className="text-primary whitespace-nowrap"
                  onClick={() => gotoRoute(item.path)}
                />
              </ListItem>
            ))}
          </div>
        ))}
      </List>
      <p className="p-5 text-primary">Version: {version}</p>
    </nav>
  );
};

export default SidebarDrawer;
