'use strict';

const formatDate = (date, days) => {
  const day = new Date(Number(date));

  day.setDate(date.getDate() + days);

  const left = new Intl.DateTimeFormat('de', { day: '2-digit' }).format(day);
  const right = new Intl.DateTimeFormat('de', { month: '2-digit' }).format(day);

  return `${left}.${right}`;
};

const getarrDoW = () => {
  const actualDay = new Date(),
        actualDoW = actualDay.getDay(),
        arrDoW = [],
        daysAfterDoW = 6 - actualDoW;

  for (let i = 0; i < actualDoW; i++) {
    const x = 7 - actualDoW;

    arrDoW.push(formatDate(actualDay, x + i));
  }

  arrDoW.push('Heute');

  for (let i = 0; i < daysAfterDoW; i++) {
    arrDoW.push(formatDate(actualDay, i + 1));
  }

  return arrDoW;
};

module.exports = getarrDoW;
