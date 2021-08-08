import dayjs from "dayjs";
import Head from "next/head";
import React, { useState } from "react";
import getFormattedDiffs from "../lib/dateManipulation";

// Day.js customizations
import relativeTime from "dayjs/plugin/relativeTime";
dayjs.extend(relativeTime);

export default function Home() {
  const [date, setDate] = useState<Date>(new Date("Dec 24 2021"));
  const parsed = dayjs(date);
  const [today, setToday] = useState(dayjs());

  const countDown = setInterval(() => {
    setToday(dayjs());
  }, 1000);

  const diffParams = getFormattedDiffs(today, parsed, countDown);

  return (
    <div className="flex flex-col items-center justify-between h-screen">
      <Head>
        <title>CountDowner</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <header>
        <nav className="w-screen text-xm gap-10 bg-[#262A2B] text-white py-4 cursor-pointer">
          <span>Create countdown</span>
          <a
            href="https://github.com/filiptronicek/CountDowner"
            target="_blank"
            rel="noreferrer noopener"
          >
            Source code
          </a>
        </nav>
      </header>

      <main className="text-center">
        <div>
          <div className="text-7xl">Christmas 2021</div>
          <div className="text-3xl">
            Counting down to {parsed.format("D/M/YYYY")}
          </div>
          {parsed.isAfter(today) ? (
            <div id="countdown-area" className="mt-5 text-4xl">
              {diffParams}
            </div>
          ) : (
            <div className="mt-5 text-4xl">
              This countdown has passed {today.to(parsed)}
            </div>
          )}
        </div>
      </main>

      <footer>By @filiptronicek with 💖</footer>
    </div>
  );
}
