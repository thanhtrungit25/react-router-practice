import React, { Component } from "react";
import { Route } from "react-router-dom";
import Sidebar from "./Sidebar";
import Article from "./Article";
import { getTeamsArticles } from "../api";

export default class Articles extends Component {
  state = {
    teamsArticles: [],
    loading: true
  };

  componentDidMount() {
    getTeamsArticles(this.props.match.params.teamId).then(teamsArticles => {
      this.setState(() => ({
        loading: false,
        teamsArticles: teamsArticles.map(article => article.title)
      }));
    });
  }

  render() {
    const { teamsArticles, loading } = this.state;
    const { url, params } = this.props.match;
    const { teamId } = params;

    return loading === true ? (
      <h1>LOADING</h1>
    ) : (
      <div className="container two-column">
        <Sidebar
          title="Articles"
          loading={loading}
          list={teamsArticles}
          {...this.props}
        />

        <Route
          path={`${url}/:articleId`}
          render={({ match }) => (
            <Article articleId={match.params.articleId} teamId={teamId}>
              {article =>
                !article ? (
                  <h1>Loading</h1>
                ) : (
                  <div className="panel">
                    <article className="article" key={article.id}>
                      <h1 className="header">{article.title}</h1>
                      <p>{article.body}</p>
                    </article>
                  </div>
                )
              }
            </Article>
          )}
        />
      </div>
    );
  }
}
