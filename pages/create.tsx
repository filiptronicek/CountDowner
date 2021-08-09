import dayjs from "dayjs";
import { useRouter } from "next/router";
import React, { useState, useEffect } from "react";
import _toast, { Toaster } from "react-hot-toast";

import getFormattedDiffs from "../lib/dateManipulation";
import EventName from "../components/EventName";
import Head from "../components/Head";
import Menu from "../components/Menu";

// Datepicker
import "react-datepicker/dist/react-datepicker.css";

// Day.js customizations
import relativeTime from "dayjs/plugin/relativeTime";
dayjs.extend(relativeTime);

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-between h-screen">
      <Head />

      <Menu />
      <main className="text-center">
        <Toaster />
        <h1 className="text-3xl">Create a new countdown</h1>
        
      </main>

      <footer>By @filiptronicek with 💖</footer>
    </div>
  );
}
