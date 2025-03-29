import React from 'react';
import { sampleProblems } from '../data/problems';
import ProblemCard from './ProblemCard';
import './Dashboard.css';

const Dashboard: React.FC = () => {
  return (
    <div className='dashboard'>
      <h1 className='dashboard-heading'>Today's Problems</h1>
      <div className='problem-list'>
        {sampleProblems.map((problem) => (
          <ProblemCard key={problem.id} {...problem} />
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
