export const DIFF_DAY = 24 * 60 * 60 * 1000;
export const DIFF_5_DAYS = 5 * DIFF_DAY;
export const DIFF_10_DAYS = 10 * DIFF_DAY;

export const isOverDiff = (timestamp, diff) => {
  const now = new Date().getTime();
  return now - timestamp > diff;
};
