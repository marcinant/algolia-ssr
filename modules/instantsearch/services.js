import algoliasearchLite from "algoliasearch/lite";

const fullTextSearch = {
  appId: "latency",
  searchApiKey: "6be0576ff61c053d5f9a3225e2a90f76"
};

const indexName = fullTextSearch.indexName; // `notes`, `customers`, etc.
const searchKey = fullTextSearch.searchKey;

const searchClientLite = algoliasearchLite(
  fullTextSearch.appId,
  fullTextSearch.searchApiKey
);

module.exports = {
  indexName,
  searchKey,
  searchClientLite
};
