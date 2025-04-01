import { supabase } from '../lib/supabase';
import { getUpdatedProgress, FeedbackType } from './spacedRepetition';

export async function handleFeedback({
    userId,
    problemId,
    feedback,
    currentIntervalIndex = 0
}: {
    userId: string;
    problemId: string;
    feedback: FeedbackType;
    currentIntervalIndex: number;
}) {
    const updated = getUpdatedProgress(feedback, currentIntervalIndex);

    const { error } = await supabase.from('user_progress').upsert([
        {
            user_id: userId,
            problem_id: problemId,
            ...updated,
        }
    ]);

    if (error) {
        console.error('Error updating progress:', error.message);
    }
    else {
        console.log('Progress updated for', problemId);
    }
}