import React from "react";
import { Box } from "@material-ui/core";

import Link from "next/link";

import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import Collapse from "@mui/material/Collapse";
import List from "@mui/material/List";

import { useItem } from "./style";

const Item = ({ links, name }) => {
  const [open, setOpen] = React.useState(false);

  const handleClick = () => {
    setOpen(!open);
  };

  const classes = useItem();
  const openStyle = open ? classes.drop : `${classes.drop} ${classes.dropLine}`;

  const listLinks = links.map((link, idx) => {
    return (
      <Box component="li" key={idx} className={classes.itemLink}>
        <Link href={link.link} className={classes.link} replace>
          {link.text}
        </Link>
      </Box>
    );
  });

  return (
    <Box>
      <ListItemButton onClick={handleClick} className={openStyle}>
        <ListItemText primary={name} className={classes.name} />
      </ListItemButton>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <List component="ul" disablePadding className={classes.list}>
          {listLinks}
        </List>
      </Collapse>
    </Box>
  );
};

export default React.memo(Item);
