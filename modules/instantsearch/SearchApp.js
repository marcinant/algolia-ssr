import React from "react";
import { InstantSearch, Configure, PoweredBy } from "react-instantsearch-dom";

import { makeStyles } from "@material-ui/core/styles";
import { Paper } from "@material-ui/core";

import {
  ConnectedSearchBox,
  ConnectedBrandList,
  ConnectedHits,
  ConnectedResults,
  ConnectedPagination
} from "../instantsearch";

const useStyles = makeStyles(theme => ({
  paper: {
    width: "60%",
    marginBottom: theme.spacing(1),
    padding: theme.spacing(3),

    [theme.breakpoints.down("md")]: {
      width: "100%"
    }
  }
}));

const SearchApp = ({ indexName, searchClient, searchState, ...restProps }) => {
  const classes = useStyles();

  return (
    <Paper elevation={3} className={classes.paper}>
      <InstantSearch
        indexName={indexName}
        searchClient={searchClient}
        searchState={searchState}
        resultsState={restProps.resultsState}
        onSearchParameters={restProps.onSearchParameters}
        onSearchStateChange={restProps.onSearchStateChange}
        createURL={restProps.createURL}
        {...restProps}
      >
        <Configure hitsPerPage={restProps.hitsPerPage || 4} />

        <ConnectedSearchBox
          refinementBrand={
            <ConnectedBrandList attribute="brand" label={"Brands"} />
          }
        />

        <div style={{ marginTop: 10, textAlign: "right" }}>
          <PoweredBy />
        </div>

        <ConnectedResults>
          <ConnectedHits />
        </ConnectedResults>

        <ConnectedPagination />
      </InstantSearch>
    </Paper>
  );
};

export default SearchApp;
