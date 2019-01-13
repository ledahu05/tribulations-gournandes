import React, { Component } from "react";
import UserLinks from "../UserLinks";
import "./ToolbarActions.scss";
import { withStyles } from '@material-ui/core/styles';
import NotificationButton from '../NotificationButton';

const styles = theme => ({
  button: {
    margin: theme.spacing.unit,
  },
  input: {
    display: 'none',
  },
});


class Toolbar extends Component {
  render() {
    const { config } = this.props;
    return (
      <div className="toolbar-actions">
        <NotificationButton/>
        <div className="userlinks-container">
          <UserLinks config={config} />
        </div>
      </div>
    );
  }
}

export default Toolbar;
