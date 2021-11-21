import React from 'react';
import PropTypes from 'prop-types';

export default function Messages({ messages }) {
  return (
    <>
      <div className={'colored-div'}><h2>Messages</h2></div>
      {messages.map((message, i) =>
        // TODO: format as cards, add timestamp
        <div className={'message-div'}>
        <p key={i} className={message.premium ? 'is-premium' : ''}>
          <strong>{message.sender}:</strong><br/>
          {message.text} <br/>
          {message.time}
        </p>
        </div>
      )}
      
    </>
  );
}

Messages.propTypes = {
  messages: PropTypes.array
};

