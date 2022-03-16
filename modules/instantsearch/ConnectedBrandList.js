import React, { useEffect, useState } from "react";
import { connectRefinementList } from "react-instantsearch-dom";

import { makeStyles } from "@material-ui/core/styles";
import {
  FormControl,
  InputLabel,
  Input,
  Select,
  MenuItem,
  Checkbox,
  ListItemText
} from "@material-ui/core";

import { itHasValue } from "../utils/objects";

const useStyles = makeStyles(theme => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 180,
    maxWidth: 300,
    [theme.breakpoints.down("xs")]: {
      width: "100%",
      maxWidth: "100%"
    }
  },
  textField: {
    paddingTop: theme.spacing(1),
    marginRight: theme.spacing(1)
  },
  checkItem: {
    padding: 0
  },
  itemText: {
    marginLeft: theme.spacing(0.5)
  }
}));

const CustomBrandList = ({ items, refine, ...props }) => {
  const classes = useStyles();
  const [attributeNames, setAttributeNames] = useState([]);

  useEffect(() => {
    const names = items.filter(item => item.isRefined).map(name => name.label);

    setAttributeNames(names);

    return () => names;
  }, [items]);

  const itemHeight = 48;
  const itemPaddingTop = 8;
  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: itemHeight * 4.5 + itemPaddingTop,
        width: 250
      }
    }
  };

  const handleChange = event => {
    const target = event.target;

    setAttributeNames(target.value);
    refine(target.value);
  };

  return (
    <FormControl className={classes.formControl}>
      <InputLabel id="mutiple-checkbox-label">{props.label}</InputLabel>

      <Select
        labelId="mutiple-checkbox-label"
        id="mutiple-checkbox"
        multiple
        value={attributeNames}
        onChange={handleChange}
        input={<Input />}
        renderValue={selected => selected.join(", ")}
        MenuProps={MenuProps}
        className={classes.textField}
      >
        <MenuItem value="">
          <em>-- {props.label} --</em>
        </MenuItem>

        {items.map((item, i) => (
          <MenuItem key={i} value={item.label}>
            <Checkbox className={classes.checkItem} checked={item.isRefined} />
            <ListItemText className={classes.itemText} primary={item.label} />
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

const ConnectedBrandList = connectRefinementList(CustomBrandList);

export default ConnectedBrandList;
