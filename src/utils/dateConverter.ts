export default function dateConverter(time: number) {
  const now = new Date();
  const passedTime = now.getTime() - time * 1000;
  const years = Math.floor(passedTime / (1000 * 60 * 60 * 24 * 30 * 12));
  const months = Math.floor((passedTime / (1000 * 60 * 60 * 24 * 30)) % 12);
  const days = Math.floor((passedTime / (1000 * 60 * 60 * 24)) % 30);
  const hours = Math.floor((passedTime / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((passedTime / (1000 * 60)) % 60);
  const seconds = Math.floor((passedTime / 1000) % 60);
  if (passedTime === 0) {
    return "now";
  }
  if (years) {
    return `${years} years ago`;
  }
  if (!years && months) {
    return `${months} months ago`;
  }
  if (!years && !months && days) {
    return `${days} days ago`;
  }
  if (!years && !months && !days && hours) {
    return `${hours} hours ago`;
  }
  if (!years && !months && !days && !hours && minutes) {
    return `${minutes} minutes ago`;
  }
  if (!years && !months && !days && !hours && !minutes && seconds) {
    return `${seconds} seconds ago`;
  }
}
