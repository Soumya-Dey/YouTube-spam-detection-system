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

export const getMarkup = (htmlStr) => {
  return { __html: htmlStr };
};

export const groupBy = (list, keyGetter) => {
  const map = new Map();
  list.forEach((item) => {
    const key = keyGetter(item);
    const collection = map.get(key);
    if (!collection) {
      map.set(key, [item]);
    } else {
      collection.push(item);
    }
  });

  return map;
};
