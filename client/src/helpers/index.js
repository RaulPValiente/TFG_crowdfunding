export const calculateBarPercentage = (goal, raisedAmount) => {
  const percentage = (raisedAmount / goal) * 100;

  return Math.min(Math.max(Math.round(percentage), 0), 100);
};

export const daysLeft = (deadline) => {
  const difference = new Date(deadline).getTime() - Date.now();
  const remainingDays = Math.floor(difference / (1000 * 3600 * 24));

  return remainingDays;
};

export const checkIfImage = (url, callback) => {
  const img = new Image();
  img.src = url;

  img.onload = () => callback(true);
  img.onerror = () => callback(false);

  if (img.complete) {
    callback(true);
  }
};
