import React, { useEffect, useState } from "react";
import dayjs from "dayjs";

import Head from "next/head";

const getDiffParams = (from: dayjs.Dayjs, to: dayjs.Dayjs) => {
  const diffs: any = [];
  const parameters = [
    "year",
    "month",
    "week",
    "day",
    "hour",
    "minute",
    "second",
  ];

  for (const param of parameters) {
    const difference = to.diff(from, param);
    diffs.push(`${difference} ${param}${difference === 1 ? "" : "s"}`);
  }

  return diffs;
};

export default function Home() {
  const [date, setDate] = useState<Date>(new Date("August 24 2021"));
  const parsed = dayjs(date);
  const [today, setToday] = useState(dayjs());

  setInterval(() => {
    setToday(dayjs());
  }, 1000);

  const diffParams = getDiffParams(today, parsed);

  return (
    <div className="flex flex-col items-center justify-between h-screen">
      <Head>
        <title>CountDowner</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <header>
        <nav className="w-screen text-xm gap-10 bg-[#262A2B] py-4 cursor-pointer">
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
          <div id="countdown-area" className="mt-5 text-4xl">
            {diffParams.join(" ")}
          </div>
        </div>
      </main>

      <footer>By @filiptronicek with 💖</footer>
    </div>
  );
}
