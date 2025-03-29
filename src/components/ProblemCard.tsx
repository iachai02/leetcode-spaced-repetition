import React, { useState } from 'react';
import ProblemFeedback from './ProblemFeedback';
import './ProblemCard.css';

type Props = {
  title: string;
  difficulty: string;
  link: string;
  status: string;
};

const ProblemCard: React.FC<Props> = ({ title, difficulty, link, status }) => {
  const [hasClicked, setHasClicked] = useState(false);
  const [showFeedback, setShowFeedback] = useState(false);
  const [feedback, setFeedback] = useState<string | null>(null);

  const handleLinkClick = () => {
    setHasClicked(true);
  };

  const handleMarkAsDone = () => {
    setShowFeedback(true);
  };

  const handleFeedbackSubmit = (response: 'easy' | 'struggled' | 'failed') => {
    setFeedback(response);
    // save to local storage/backend
  };

  return (
    <div className={`problem-card ${status}`}>
      <div className='problem-card-header'>
        <a
          href={link}
          target='_blank'
          rel='noopener noreferrer'
          className='problem-title'
          onClick={handleLinkClick}
        >
          {title}
        </a>
        <span className='problem-status'>{status}</span>
      </div>
      <p className='problem-difficultry'>Difficulty: {difficulty}</p>

      {hasClicked && !showFeedback && (
        <button className='mark-done-btn' onClick={handleMarkAsDone}>
          Mark as Done
        </button>
      )}

      {showFeedback && !feedback && (
        <ProblemFeedback problemTitle={title} onSubmit={handleFeedbackSubmit} />
      )}

      {feedback && (
        <p className='feedback-result'>
          You marked this as: <strong>{feedback}</strong>
        </p>
      )}
    </div>
  );
};

export default ProblemCard;
