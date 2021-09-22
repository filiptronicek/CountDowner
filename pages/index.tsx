import dayjs from "dayjs";
import { useRouter } from "next/router";
import dynamic from "next/dynamic";
import React, { useState, useEffect } from "react";
import _toast, { toast, Toaster } from "react-hot-toast";

import formatSeconds from "@utils/formatSeconds";
import timeSync from "@utils/timeSync";
import getFormattedDiffs from "@utils/dateManipulation";
import getNextDefaultEvent from "@utils/getNextDefaultEvent";

import Head from "@components/Head";
import Menu from "@components/Menu";
import Footer from "@components/Footer";

// Datepicker
import "react-datepicker/dist/react-datepicker.css";

//import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";

// Day.js customizations
import relativeTime from "dayjs/plugin/relativeTime";
dayjs.extend(relativeTime);

const EventName = dynamic(() => import("@components/EventName"), {
  ssr: false,
  loading: () => <p>Loading...</p>,
});

const TimeRemaining = dynamic(() => import("@components/TimeRemaining"), {
  ssr: false,
  loading: () => <p>...</p>,
});

export default function Home(props: {
  name: string | undefined;
  date: string | undefined;
}): JSX.Element {
  //const { t } = useTranslation();

  const [defaultName, defaultDate] = getNextDefaultEvent(new Date());

  const [date, setDate] = useState<Date>(defaultDate);
  const [eventName, setName] = useState<string>(defaultName);

  const parsedDate = dayjs(date);
  const [today, setToday] = useState(dayjs());
  const [offset, setOffset] = useState(0);

  const [shortTime, setShortTime] = useState("");
  const pageTitle = `${shortTime} until ${eventName}`;

  const { query }: any = useRouter();

  // Sync the date
  useEffect(() => {
    const sync = async () => {
      const diff = await timeSync();
      const secondsOffset = Math.abs(diff / 1000);
      if (Math.abs(diff) > 1000) {
        toast.success(
          `${diff > 0 ? "Added" : "Removed"} ${formatSeconds(secondsOffset)} ${
            diff > 0 ? "to" : "from"
          } the time`
        );
        setOffset(diff);
      }
    };
    sync();
  }, []);

  useEffect(() => {
    if (parsedDate.isAfter(today)) {
      const countDown = setInterval(() => {
        setToday(dayjs());
        setShortTime(getFormattedDiffs(today, parsedDate, true));
      }, 250);

      return () => {
        clearInterval(countDown);
      };
    }
  }, [parsedDate, today]);

  useEffect(() => {
    if (query.name && query.date) {
      setName(decodeURIComponent(query.name));
      setDate(new Date(parseInt(query.date) * 1000));
    }
  }, [query]);

  const addQueryParam = (key: string, value: string) => {
    const url = new URL(window.location.href);
    url.searchParams.set(key, value);
    window.history.pushState({}, "", url.toString());
  };

  useEffect(() => {
    addQueryParam("date", (date.getTime() / 1000).toString());
    addQueryParam("name", encodeURIComponent(eventName));
  }, [date, eventName]);

  return (
    <>
      <div className="flex flex-col items-center justify-between min-h-screen">
        <Menu />
        <Head
          titlePrefix={pageTitle}
          name={props.name}
          date={
            props.date &&
            dayjs(parseInt(props.date) * 1000).format("MM/DD/YYYY")
          }
        />

        <motion.main
          className="text-center shadow-custom p-6 rounded-2xl bg-white dark:bg-[#262A2B] text-black dark:text-white"
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
