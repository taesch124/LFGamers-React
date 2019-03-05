import React, { Component } from 'react'
import PropTypes from 'prop-types'
import classNames from "classnames"
import './../../App.css'
import './../chat-components/styles/Message.css';

class Message extends Component {
  static propTypes = {
    author: PropTypes.string,
    body: PropTypes.string.isRequired,
    me: PropTypes.bool,
  }

  render() {
    const classes = classNames('chat-message', 'align-left', {
      log: !this.props.author,
      me: this.props.me
    })

    return (
      <div className={classes}>
        {this.props.author && (
          <p className="author">{this.props.author}</p>
        )}
        {this.props.body}
      </div>
    )
  }
}

export default Message