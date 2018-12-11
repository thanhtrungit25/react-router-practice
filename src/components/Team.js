import React, { Component } from "react";
import PropTypes from "prop-types";
import { getTeam } from "../api";

export default class Team extends Component {
  static propTypes = {
    id: PropTypes.string.isRequired,
    children: PropTypes.func.isRequired
  };

  state = {
    team: null
  };

  componentDidMount() {
    this.fetchTeam(this.props.id);
  }

  componentWillReceiveProps(nextProsp) {
    if (this.props.id !== nextProsp.id) {
      this.fetchTeam(nextProsp.id);
    }
  }

  fetchTeam = id => {
    this.setState(() => ({ team: null }));
    getTeam(id).then(team => this.setState({ team }));
  };

  render() {
    return this.props.children(this.state.team);
  }
}
