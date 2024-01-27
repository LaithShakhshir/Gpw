
 

import './conversations.css';
import React from 'react';
import moment from 'moment';

const Conversations = ({ message }) => {
  const messageClass = message.seen ? 'seen' : '';

  return (
    
    <div className={`conversations ${messageClass}`}>
    <div className="conversationLine">
      <span className="conversationsName">
        <h4>From</h4> {message.FromName}
      </span>
      <span className="conversationsName">
        <h4>To</h4> {message.ToName}
      </span>
      <span className="conversationsName">
        <h4>Subject</h4> {message.title}
      </span>
      <span className="conversationsName">
        <h4>Date</h4>{moment(message.Date).format('YYYY-MM-DD ')}

      </span>
      <span className="conversationsName">
        <h4>Message</h4> {message.content}
      </span>
    </div></div>
  );
};

export default Conversations;
