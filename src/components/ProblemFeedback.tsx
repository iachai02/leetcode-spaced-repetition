import React, { useState } from 'react';
import { handleFeedback } from '../utils/handleFeedback';
import './ProblemFeedback.css';

type FeedbackType = 'easy' | 'struggled' | 'failed';

interface Props {
  problemId: string;
  problemTitle: string;
  userId: string;
  currentIntervalIndex: number;
  onSubmit: () => void;
}

const ProblemFeedback: React.FC<Props> = ({
  problemId,
  problemTitle,
  userId,
  currentIntervalIndex,
  onSubmit,
}) => {
  const [selected, setSelected] = useState<FeedbackType | null>(null);
  const [loading, setLoading] = useState(false);

  const handleClick = async (type: FeedbackType) => {
    setSelected(type);
    setLoading(true);

    await handleFeedback({
      userId,
      problemId,
      feedback: type,
      currentIntervalIndex,
    });

    setLoading(false);

    if (onSubmit) {
      onSubmit();
    }
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
          disabled={loading}
        >
          Solved Easily (7 days)
        </button>
        <button
          className={`feedback-btn ${
            selected === 'struggled' ? 'selected' : ''
          }`}
          onClick={() => handleClick('struggled')}
          disabled={loading}
        >
          Solved with struggle (3 days)
        </button>
        <button
          className={`feedback-btn ${selected === 'failed' ? 'selected' : ''}`}
          onClick={() => handleClick('failed')}
          disabled={loading}
        >
          Couldn't Solve (1 day)
        </button>
      </div>
    </div>
  );
};

export default ProblemFeedback;
