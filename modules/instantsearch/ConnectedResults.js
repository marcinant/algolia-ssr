import React from "react";
import { connectStateResults } from "react-instantsearch-dom";

import { Box, Typography } from "@material-ui/core";

const CustomResults = ({
  searchState,
  searchResults,
  children,
  error,
  allSearchResults
}) => (
  <Box display="flex" flexDirection="column">
    <Box display="flex" flexDirection="column">
      {searchState && searchState.query && (
        <Typography variant="overline">
          Searching for query <strong>{searchState.query}</strong>
        </Typography>
      )}
      {searchResults && searchResults.nbHits > 0 ? (
        children
      ) : (
        <div>No results have been found for {searchState.query}</div>
      )}
    </Box>

    {allSearchResults && allSearchResults.nbHits && (
      <Typography
        variant="subtitle1"
        color="textSecondary"
        style={{ fontSize: 16 }}
        gutterBottom
      >
        {`Search for more than ${allSearchResults.nbHits} brands.`}
      </Typography>
    )}

    {error && JSON.stringify(error)}
  </Box>
);

const ConnectedResults = connectStateResults(CustomResults);

export default ConnectedResults;
