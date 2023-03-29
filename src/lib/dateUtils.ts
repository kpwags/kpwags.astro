import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';

dayjs.extend(utc);
dayjs.extend(timezone);

export const formatDate = (value: string|Date): string => {
    const date = dayjs(value).add(1, 'day');
    const timeZone = dayjs.tz.guess();
    date.tz(timeZone);
    return date.format('MMMM D, YYYY');
};

export const formatDateTime = (value: string|Date): string => {
    const date = dayjs(value).add(1, 'day');
    const timeZone = dayjs.tz.guess();
    date.tz(timeZone);

    return `${dayjs(date).format('MMMM D, YYYY')} at ${dayjs(date).format('h:mm A')}`;
};
