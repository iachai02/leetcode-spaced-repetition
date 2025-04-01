import React, { useState } from 'react';
import ProblemFeedback from './ProblemFeedback';
import './ProblemCard.css';

type Props = {
  title: string;
  problemId: string;
  difficulty: string;
  link: string;
  status: string;
  userId: string;
  currentIntervalIndex: number;
};

const ProblemCard: React.FC<Props> = ({
  title,
  problemId,
  difficulty,
  link,
  status,
  userId,
  currentIntervalIndex,
}) => {
  const [hasClicked, setHasClicked] = useState(false);
  const [showFeedback, setShowFeedback] = useState(false);
  const [feedbackSubmitted, setFeedbackSubmitted] = useState(false);

  const handleLinkClick = () => {
    setHasClicked(true);
  };

  const handleMarkAsDone = () => {
    setShowFeedback(true);
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

      {hasClicked && !showFeedback && !feedbackSubmitted && (
        <button className='mark-done-btn' onClick={handleMarkAsDone}>
          Mark as Done
        </button>
      )}

      {showFeedback && !feedbackSubmitted && (
        <ProblemFeedback
          problemId={problemId}
          problemTitle={title}
          userId={userId}
          currentIntervalIndex={currentIntervalIndex}
          onSubmit={() => setFeedbackSubmitted(true)}
        />
      )}

      {feedbackSubmitted && (
        <p className='feedback-result'>Feedback submitted!</p>
      )}
    </div>
  );
};

export default ProblemCard;
