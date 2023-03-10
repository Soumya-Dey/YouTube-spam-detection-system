import numeral from 'numeral';
import { formatDistance } from 'date-fns';

export const formatNumber = (num) =>
  +num > 1000
    ? numeral(num).format('0.00a').toUpperCase()
    : numeral(num).format('0a').toUpperCase();

export const formatDateDistance = (date) =>
  formatDistance(new Date(date), new Date(), {
    includeSeconds: true,
    addSuffix: true,
  });

export const getRandomColor = () => {
  const letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return `${color}80`;
};