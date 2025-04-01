import React, { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import ProblemCard from '../components/ProblemCard';
import './Dashboard.css';

interface UserProgress {
  next_review_date: string;
  problem_id: string;
  current_interval_index: number;
  status: string;
}

type Problem = {
  id: string;
  title: string;
  difficulty: string;
  link: string;
};

const Dashboard: React.FC = () => {
  const [userId, setUserId] = useState<string | null>(null);
  const [userProgress, setUserProgress] = useState<UserProgress[]>([]);
  const [problems, setProblems] = useState<Problem[]>([]);
  const [loading, setLoading] = useState(true);
  const [newNum, setNumNew] = useState(1);
  const [numReview, setNumReview] = useState(1);

  useEffect(() => {
    const fetchData = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      const user = session?.user;
      if (!user) {
        setLoading(false);
        return;
      }

      setUserId(user.id);

      const { data: problemsData, error: problemError } = await supabase
        .from('problems')
        .select('*');

      if (problemError) {
        console.error('Error fetching problems:', problemError.message);
      } else {
        setProblems(problemsData || []);
      }

      const { data: progressData, error: progressError } = await supabase
        .from('user_progress')
        .select('problem_id, current_interval_index, status, next_review_date')
        .eq('user_id', user.id);

      if (progressError) {
        console.error('Error fetching progress:', progressError.message);
      } else {
        setUserProgress(progressData || []);
      }

      setLoading(false);
    };

    fetchData();
  }, []);

  const getProgressForProblem = (
    problemId: string
  ): UserProgress | undefined => {
    return userProgress.find((p) => p.problem_id === problemId);
  };

  if (loading) return <p style={{ padding: '2rem' }}>Loading problems...</p>;

  // get today's date
  const today = new Date().toISOString().split('T')[0];

  // filter problems
  const reviewProblems = problems.filter((problem) => {
    const progress = getProgressForProblem(problem.id);
    if (!progress) return false;
    const nextReview = progress?.next_review_date?.split('T')[0];
    return nextReview && nextReview <= today;
  });

  const newProblems = problems.filter((problem) => {
    return !getProgressForProblem(problem.id);
  });

  const shownReview = reviewProblems.slice(0, numReview);
  const shownNew = newProblems.slice(
    0,
    reviewProblems.length === 0 ? Math.max(newNum, 2) : newNum
  );
  const visibleProblems = [...shownReview, ...shownNew];

  return (
    <div className='dashboard'>
      <h1 className='dashboard-heading'>Today's Problems</h1>
      <div className='dashboard-controls'>
        <button
          onClick={() => setNumReview((prev) => prev + 1)}
          disabled={numReview >= reviewProblems.length}
          className='add-button'
        >
          + Add Review Problem
        </button>
        <button
          onClick={() => setNumNew((prev) => prev + 1)}
          disabled={newNum >= newProblems.length}
          className='add-button'
        >
          + Add New Problem
        </button>
      </div>
      <div className='problem-list'>
        {visibleProblems.map((problem) => {
          const progress = getProgressForProblem(problem.id);
          return (
            <ProblemCard
              key={problem.id}
              title={problem.title}
              problemId={problem.id}
              difficulty={problem.difficulty}
              link={problem.link}
              status={progress?.status || 'new'}
              currentIntervalIndex={progress?.current_interval_index || 0}
              userId={userId || ''}
            />
          );
        })}
      </div>
    </div>
  );
};

export default Dashboard;
