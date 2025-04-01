export const defaultReviewIntervals = [1, 3, 7, 14, 30, 60];

export type FeedbackType = 'easy' | 'struggled' | 'failed';

export type SpacedRepetitionUpdate = {
    current_interval_index: number;
    last_reviewed: string;
    next_review_date: string;
    status: 'review' | 'learning' | 'mastered';
};

/**
 * get updated space repetition values based on feedback
 */
export function getUpdatedProgress(
    feedback: FeedbackType,
    currentIndex: number,
    intervals = defaultReviewIntervals
): SpacedRepetitionUpdate {
    const today = new Date();

    if (feedback === 'failed') {
        return {
            current_interval_index: 0,
            last_reviewed: today.toISOString(),
            next_review_date: addDays(today, intervals[0]).toISOString(),
            status: 'learning',
        };
    }

    const nextIndex = Math.min(currentIndex + 1, intervals.length - 1);
    const nextInterval = intervals[nextIndex];

    return {
        current_interval_index: nextIndex,
        last_reviewed: today.toISOString(),
        next_review_date: addDays(today, nextInterval).toISOString(),
        status: nextIndex === intervals.length - 1 ? 'mastered' : 'review',
    };
}

/**
 * adds x days to a date
 */
export function addDays(date: Date, days: number): Date {
    const result = new Date(date);
    result.setDate(result.getDate() + days);
    return result;
}