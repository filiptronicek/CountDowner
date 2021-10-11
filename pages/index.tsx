// Datepicker
import 'react-datepicker/dist/react-datepicker.css';

import Footer from '@components/Footer';
import Head from '@components/Head';
import Menu from '@components/Menu';
import getFormattedDiffs from '@utils/dateManipulation';
import formatTime from '@utils/formatTime';
import getNextDefaultEvent from '@utils/getNextDefaultEvent';
import timeSync from '@utils/timeSync';
import dayjs from 'dayjs';
// Day.js customizations
import relativeTime from 'dayjs/plugin/relativeTime';
import { motion } from 'framer-motion';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { toast, Toaster } from 'react-hot-toast';
import { useTranslation } from 'react-i18next';
dayjs.extend(relativeTime);

const EventName = dynamic(() => import('@components/EventName'), {
  ssr: false,
  loading: () => <p>Loading...</p>,
});

const TimeRemaining = dynamic(() => import('@components/TimeRemaining'), {
  ssr: false,
  loading: () => <p>...</p>,
});

export default function Home(props: {
  name: string | undefined;
  date: string | undefined;
}): JSX.Element {
  const { t } = useTranslation();

  const [defaultName, defaultDate] = getNextDefaultEvent(new Date());

  const [date, setDate] = useState<Date>(defaultDate);
  const [eventName, setName] = useState<string>(defaultName);

  const parsedDate = dayjs(date);
  const [today, setToday] = useState<dayjs.Dayjs>(dayjs());
  const [offset, setOffset] = useState<number>(0);

  const [shortTime, setShortTime] = useState<string | null>('');
  const pageTitle = parsedDate.isAfter(today)
    ? `${shortTime} ${t('until')} ${eventName}`
    : undefined;

  const { query }: any = useRouter();

  // Sync the date
  useEffect(() => {
    const sync = async () => {
      const diff = await timeSync();
      const secondsOffset = Math.abs(diff / 1000);
      if (Math.abs(diff) > 1000) {
        toast.success(
          `${diff > 0 ? 'Added' : 'Removed'} ${formatTime(secondsOffset)} ${
            diff > 0 ? 'to' : 'from'
          } the time`,
        );
        setOffset(diff);
      }
    };
    sync();
  }, []);

  useEffect(() => {
    if (parsedDate.isAfter(today.add(offset, 'milisecond'))) {
      
      const countDown = setInterval(() => {
        
        setToday(dayjs());
        setShortTime(
          getFormattedDiffs(today.add(offset, 'milisecond'), parsedDate, true),
        );
      }, 250);

      return () => {
        clearInterval(countDown);
      };
    } else {
      const countDown = setInterval(() => {
        
        setToday(dayjs());
        setShortTime(null);
      }, 30 * 1000);

      return () => {
        clearInterval(countDown);
      };
    }
  }, [parsedDate, today, offset]);

  useEffect(() => {
    if (query.name && query.date) {
      setName(decodeURIComponent(query.name));
      setDate(new Date(parseInt(query.date) * 1000));
    }
  }, [query]);

  const addQueryParam = (key: string, value: string) => {
    const url = new URL(window.location.href);
    url.searchParams.set(key, value);
    window.history.pushState({}, '', url.toString());
  };

  useEffect(() => {
    addQueryParam('date', (date.getTime() / 1000).toString());
    addQueryParam('name', encodeURIComponent(eventName));
  }, [date, eventName]);

  return (
    <>
      <div className="flex flex-col items-center justify-between min-h-screen">
        <Menu />
        <Head
          titlePrefix={pageTitle}
          name={props.name && decodeURIComponent(props.name)}
          date={
            props.date &&
            dayjs(parseInt(props.date) * 1000).format('MM/DD/YYYY')
          }
        />

        <motion.main
          className="text-center shadow-custom rounded-2xl bg-white dark:bg-[#262A2B] text-black dark:text-white"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <Toaster />
          <EventName
            eventName={eventName}
            setName={setName}
            date={date}
            setDate={setDate}
          />
          <TimeRemaining
            countingTo={parsedDate}
            countingFrom={today}
            timeOffset={offset}
          />
        </motion.main>

        <Footer />
      </div>
    </>
  );
}

// Render the metatags for the page
export async function getServerSideProps({ query }: { query: any }) {
  return { props: query };
}
