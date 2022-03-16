import React, { useState } from "react";
import HeadTag from "next/head";
import { withRouter } from "next/router";

import {
  searchClient,
  findResultsState,
  createURL,
  pathToSearchState,
  searchStateToURL
} from "../modules/instantsearch";
import SearchApp from "../modules/instantsearch/SearchApp";

import Footer from "../components/Footer";

const defaultProps = {
  searchClient,
  indexName: "instant_search"
};

const debounceTime = 700;

const HomePage = (props) => {
  const { router, page, seoProps, ...restProps } = props;

  const setStateId = React.useRef();
  const [searchState, setSearchState] = useState(
    pathToSearchState(router.asPath)
  );

  const onSearchStateChange = (nextSearchState) => {
    clearTimeout(setStateId);

    setStateId.current = setTimeout(() => {
      const href = searchStateToURL(router, nextSearchState);

      router.push(href, href, {
        shallow: true
      });

      setSearchState(nextSearchState);
    }, debounceTime);
  };

  return (
    <div className="container">
      <HeadTag>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </HeadTag>

      <style jsx>{`
        .container {
          min-height: 100vh;
          padding: 0 0.5rem;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
        }

        main {
          padding: 5rem 0;
          flex: 1;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
        }

        .title a {
          color: #0070f3;
          text-decoration: none;
        }

        .title a:hover,
        .title a:focus,
        .title a:active {
          text-decoration: underline;
        }

        .title {
          margin: 0;
          line-height: 1.15;
          font-size: 4rem;
        }

        .title,
        .description {
          text-align: center;
        }

        .description {
          line-height: 1.5;
          font-size: 1.5rem;
        }

        code {
          background: #fafafa;
          border-radius: 5px;
          padding: 0.75rem;
          font-size: 1.1rem;
          font-family: Menlo, Monaco, Lucida Console, Liberation Mono,
            DejaVu Sans Mono, Bitstream Vera Sans Mono, Courier New, monospace;
        }

        .grid {
          display: flex;
          align-items: center;
          justify-content: center;
          flex-wrap: wrap;

          max-width: 800px;
          margin-top: 3rem;
        }

        .card {
          margin: 1rem;
          flex-basis: 45%;
          padding: 1.5rem;
          text-align: left;
          color: inherit;
          text-decoration: none;
          border: 1px solid #eaeaea;
          border-radius: 10px;
          transition: color 0.15s ease, border-color 0.15s ease;
        }

        .card:hover,
        .card:focus,
        .card:active {
          color: #0070f3;
          border-color: #0070f3;
        }

        .card h3 {
          margin: 0 0 1rem 0;
          font-size: 1.5rem;
        }

        .card p {
          margin: 0;
          font-size: 1.25rem;
          line-height: 1.5;
        }

        @media (max-width: 600px) {
          .grid {
            width: 100%;
            flex-direction: column;
          }
        }
      `}</style>

      <style jsx global>{`
        html,
        body {
          padding: 0;
          margin: 0;
          font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto,
            Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue,
            sans-serif;
        }

        * {
          box-sizing: border-box;
        }
      `}</style>

      <main>
        <h1 className="title">
          Welcome to <a href="https://nextjs.org">Next.js!</a>
        </h1>

        <SearchApp
          {...defaultProps}
          searchState={searchState}
          resultsState={restProps.resultsState}
          onSearchStateChange={onSearchStateChange}
          createURL={createURL}
        />

        <div className="grid">
          <a href="https://nextjs.org/docs" className="card">
            <h3>Documentation &rarr;</h3>
            <p>Find in-depth information about Next.js features and API.</p>
          </a>

          <a href="https://nextjs.org/learn" className="card">
            <h3>Learn &rarr;</h3>
            <p>Learn about Next.js in an interactive course with quizzes!</p>
          </a>

          <a
            href="https://github.com/zeit/next.js/tree/master/examples"
            className="card"
          >
            <h3>Examples &rarr;</h3>
            <p>Discover and deploy boilerplate example Next.js projects.</p>
          </a>

          <a
            href="https://vercel.com/import?filter=next.js&utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
            className="card"
          >
            <h3>Deploy &rarr;</h3>
            <p>
              Instantly deploy your Next.js site to a public URL with Vercel.
            </p>
          </a>
        </div>
      </main>

      <Footer />
    </div>
  );
};

HomePage.getInitialProps = async (context) => {
  const { req, res, query, ...restProps } = context;

  const searchState = pathToSearchState(restProps.asPath);

  console.log("search state", searchState);

  const resultsState = await findResultsState(SearchApp, {
    ...defaultProps,
    searchState
  });

  return {
    resultsState,
    searchState
  };
};

export default withRouter(HomePage);
