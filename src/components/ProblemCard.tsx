import React from 'react';
import './ProblemCard.css';

type Props = {
  title: string;
  difficulty: string;
  link: string;
  status: string;
};

const ProblemCard: React.FC<Props> = ({ title, difficulty, link, status }) => {
  return (
    <div className={`problem-card ${status}`}>
      <div>
        <a
          href={link}
          target='_blank'
          rel='noopener noreferrer'
          className='problem-title'
        >
          {title}
        </a>
        <span className='problem-status'>{status}</span>
      </div>
      <p className='problem-difficultry'>Difficulty: {difficulty}</p>
    </div>
  );
};

export default ProblemCard;
