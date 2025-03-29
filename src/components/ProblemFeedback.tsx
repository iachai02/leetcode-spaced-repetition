import React, { useState } from 'react';
import './ProblemFeedback.css';

type FeedbackType = 'easy' | 'struggled' | 'failed';

interface Props {
  problemTitle: string;
  onSubmit: (feedback: FeedbackType) => void;
}

const ProblemFeedback: React.FC<Props> = ({ problemTitle, onSubmit }) => {
  const [selected, setSelected] = useState<FeedbackType | null>(null);

  const handleClick = (type: FeedbackType) => {
    setSelected(type);
    onSubmit(type);
  };

  return (
    <div className='feedback-container'>
      <h3 className='feedback-title'>
        How did you do on <strong>{problemTitle}</strong>?
      </h3>
      <div className='feedback-buttons'>
        <button
          className={`feedback-btn ${selected === 'easy' ? 'selected' : ''}`}
          onClick={() => handleClick('easy')}
        >
          Solved Easily
        </button>
        <button
          className={`feedback-btn ${
            selected === 'struggled' ? 'selected' : ''
          }`}
          onClick={() => handleClick('struggled')}
        >
          Solved with struggle
        </button>
        <button
          className={`feedback-btn ${selected === 'failed' ? 'selected' : ''}`}
          onClick={() => handleClick('failed')}
        >
          Couldn't Solve
        </button>
      </div>
    </div>
  );
};

export default ProblemFeedback;
