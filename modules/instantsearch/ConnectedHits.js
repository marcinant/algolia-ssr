import React from "react";
import { connectHits } from "react-instantsearch-dom";

import {
  ListItem,
  ListItemAvatar,
  Avatar,
  ListItemText,
  Typography,
  List,
  Divider
} from "@material-ui/core";

const CustomListItem = props => {
  const { name, description } = props;

  return (
    <ListItem alignItems="flex-start">
      <ListItemAvatar>
        <Avatar
          variant="square"
          style={{
            marginRight: 5,
            width: 80,
            height: 60
          }}
        >
          {name.charAt(0)}
        </Avatar>
      </ListItemAvatar>

      <ListItemText
        primary={name}
        secondary={
          <React.Fragment>
            <Typography variant="body2" color="textSecondary">
              {description}
            </Typography>
          </React.Fragment>
        }
        secondaryTypographyProps={{
          component: "div"
        }}
      />
    </ListItem>
  );
};

const CustomHits = ({ hits }) => (
  <List style={{ width: "100%" }}>
    {Object.values(hits).map((hit, kI) => (
      <React.Fragment key={kI}>
        {kI > 0 && <Divider variant="inset" component="li" />}

        <CustomListItem {...hit} />
      </React.Fragment>
    ))}
  </List>
);

const ConnectedHits = connectHits(CustomHits);

export default ConnectedHits;
