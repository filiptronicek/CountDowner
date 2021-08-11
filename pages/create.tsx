import dayjs from "dayjs";
import React, { useState } from "react";
import _toast, { toast, Toaster } from "react-hot-toast";
import DatePicker from "react-datepicker";
import QRCode from "react-qr-code";

import unidecode from "unidecode";
import { createEvent } from "ics";

import Head from "../components/Head";
import Menu from "../components/Menu";

// Datepicker
import "react-datepicker/dist/react-datepicker.css";

// Day.js customizations
import relativeTime from "dayjs/plugin/relativeTime";
dayjs.extend(relativeTime);

const Button = (props: {
  onClick: React.MouseEventHandler<HTMLSpanElement>;
  children: JSX.Element;
}) => {
  const { onClick, children } = props;
  return (
    <span
      className="bg-[#262A2B] text-white p-5 rounded-xl mb-8 cursor-pointer"
      onClick={onClick}
    >
      {children}
    </span>
  );
};

export default function Home() {
  const [date, setDate] = useState<Date>(new Date());

  const defaultEventName = "";
  const [eventName, setName] = useState<string>(defaultEventName);
  const [qrCode, setQrCode] = useState<boolean>(false);

  const downloadIcal = () => {
    createEvent(
      {
        title: eventName,
        busyStatus: "FREE",
        start: [
          date.getFullYear(),
          date.getMonth() + 1,
          date.getDate(),
          date.getHours(),
          date.getMinutes(),
        ],
        duration: { minutes: 60 },
        url: `https://countdowner.now.sh/?date=${date.getTime()}&name=${eventName}`,
      },
      (error, value) => {
        if (error) {
          console.log(error);
        }
        // Create a blob of the value and save it as event.ics
        const blob = new Blob([value], { type: "text/calendar" });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;

        const fileName = `${unidecode(eventName)}.ics`
          .toLowerCase()
          .replaceAll(" ", "-");

        a.download = fileName;
        a.click();
      }
    );
  };

  return (
    <div className="flex flex-col items-center justify-between h-screen">
      <Head />

      <Menu />
      <main className="text-center">
        <Toaster />
        <h1 className="text-3xl">Create a new countdown</h1>
        <label htmlFor="name">Event name: </label>
        <input
          id="name"
          type="text"
          className="w-1/2 p-3 font-thin transition duration-200 focus:shadow-md focus:outline-none ring-offset-2 border border-gray-400 rounded-lg focus:ring-2 focus:ring-gray-500"
          value={eventName}
          onChange={(e) => {
            setName(e.target.value);
          }}
        />
        <br />
        <DatePicker
          dateFormat="dd/MM/yyyy"
          selected={date}
          showTimeSelect
          timeIntervals={15}
          minDate={new Date()}
          onChange={(val: Date) => {
            setDate(val);
          }}
        />

        {defaultEventName !== eventName ? (
          <div id="output" className="flex flex-col items-center mt-4">
            <h2 className="text-4xl">{eventName}</h2>
            <h3 className="text-4xl mb-8">
              {dayjs(date).format("dddd, D MMMM YYYY (HH:mm)")}
            </h3>
            <div id="actions" className="flex gap-5">
              <Button
                onClick={() => {
                  setQrCode(!qrCode);
                }}
              >
                {qrCode ? "Hide" : "Show"} QR code
              </Button>
              <Button
                onClick={() => {
                  toast.success("Event created!");
                  downloadIcal();
                }}
              >
                Download .ics
              </Button>
            </div>
            {qrCode && (
              <QRCode
                value={`https://countdowner.now.sh/?date=${date.getTime()}&name=${eventName}`}
              />
            )}
          </div>
        ) : (
          <span> Please fill in the name and date of your event </span>
        )}
      </main>

      <footer>By @filiptronicek with 💖</footer>
    </div>
  );
}
