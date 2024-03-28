import React from "react";
import { Box, List, ListItem, ListItemText } from "@mui/material";
import SearchInput from "../../common/Search";
import { menuList } from "../../../helpers/config";

const SidebarDrawer = () => {
  const onSearch = () => {};
  return (
    <nav className="w-64 bg-surface h-full">
      <List component="menu">
        <ListItem component="li">
          <Box sx={{ display: "flex", alignItems: "flex-end" }}>
            <SearchInput onSearch={onSearch} />
          </Box>
        </ListItem>
        {menuList.map((item, _index) => (
          <ListItem key={_index}>
            <div className="text-primary mr-2">{item.icon}</div>
            <ListItemText primary={item.title} className="text-primary" />
          </ListItem>
        ))}
      </List>
    </nav>
  );
};

export default SidebarDrawer;
