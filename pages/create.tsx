import dayjs from "dayjs";
import React, { useState } from "react";
import _toast, { toast, Toaster } from "react-hot-toast";
import DatePicker from "react-datepicker";
import QRCode from "react-qr-code";

import Head from "@components/Head";
import Menu from "@components/Menu";
import Footer from "@components/Footer";
import Button from "@components/Button";
import { QRCode as QRIcon } from "@components/create/icons";

import { useTranslation } from "react-i18next";
import { AnimatePresence, motion } from "framer-motion";

// Datepicker
import "react-datepicker/dist/react-datepicker.css";

// Day.js customizations
import relativeTime from "dayjs/plugin/relativeTime";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
import { timeZonesNames } from "@vvo/tzdb";
import {
  getTimezoneOffset,
  dateAddSeconds,
  getTimeZoneCode,
} from "@utils/timeZones";
import { useWindowSize } from "../lib/helpers/useWindowSize";

dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.extend(relativeTime);

export default function Create(props: { baseURL: string }): JSX.Element {
  const { t } = useTranslation();
  const [date, setDate] = useState<Date>(new Date());
  const [currentTimeZone, setSelectedTimeZone] = useState(
    Intl.DateTimeFormat().resolvedOptions().timeZone
  );
  const [link, setLink] = useState<string>("");

  const defaultEventName = "";
  const [eventName, setName] = useState<string>(defaultEventName);
  const [qrCodeZoom, setQrCodeZoom] = useState<boolean>(false);

  const reducedDate = Math.floor(date.getTime() / 1000);
  const { baseURL } = props;
  const eventURL = link
    ? `${baseURL}/event/${link}`
    : `${baseURL}/?date=${reducedDate}&name=${eventName}`;

  const createLink = async (copy?: boolean) => {
    const req = await fetch(
      `/api/createCountdown?date=${reducedDate}&name=${eventName}`
    );
    const data = await req.json();
    console.log(data);
    setLink(data.slug);
    if (copy) {
      await navigator.clipboard.writeText(`${baseURL}/event/${data.slug}`);
    }
    return data.slug;
  };

  const downloadIcal = async () => {
    const createEvent = (await import("ics")).createEvent;

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
      async (error, value) => {
        if (error) {
          console.log(error);
        }
        // Create a blob of the value and save it as event.ics
        const blob = new Blob([value], { type: "text/calendar" });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;

        const unidecode = (await import("unidecode")).default;

        const fileName = `${unidecode(eventName)}.ics`
          .toLowerCase()
          .replaceAll(" ", "-");

        a.download = fileName;
        a.click();
      }
    );
  };

  const inputStyle =
    "w-1/2 p-3 mt-3 ml-0 font-thin transition duration-200 focus:shadow-md focus:outline-none ring-offset-2 border border-gray-400 rounded-lg focus:ring-2 focus:ring-gray-500 text-black dark:text-white bg-white dark:bg-[#262A2B]";

  return (
    <>
      <div className="flex flex-col items-center justify-between h-screen">
        <Menu />
        <Head titlePrefix="Create countdown" />
        <motion.main
          className="text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <Toaster />
          <h1 className="text-3xl">{t("Create a new countdown")}</h1>

          <label htmlFor="name">{t("Event name")}: </label>
          <input
            id="name"
            type="text"
            className={inputStyle}
            value={eventName}
            onChange={(e) => {
              setName(e.target.value);
            }}
          />
          <br />
          <label>
            {t("Event date & time")}:
            <DatePicker
              dateFormat="dd/MM/yyyy"
              className={inputStyle}
              selected={date}
              showTimeSelect
              timeIntervals={15}
              minDate={new Date()}
              onChange={(val: Date) => {
                const selectedTimeOffset = getTimezoneOffset(
                  Intl.DateTimeFormat().resolvedOptions().timeZone
                );
                const newTimeZoneOffset = getTimezoneOffset(currentTimeZone);
                setDate(
                  dateAddSeconds(
                    val,
                    (selectedTimeOffset - newTimeZoneOffset) * 3600
                  )
                );
              }}
            />
          </label>
          <br />
          <label>
            Time zone:
            <select
              name="tz"
              id="tz"
              className={inputStyle}
              onChange={(val) => {
                const selectedTimeOffset = getTimezoneOffset(currentTimeZone);
                const newTimeZoneOffset = getTimezoneOffset(val.target.value);
                setSelectedTimeZone(val.target.value);
                setDate(
                  dateAddSeconds(
                    date,
                    (selectedTimeOffset - newTimeZoneOffset) * 3600
                  )
                );
              }}
              defaultValue={currentTimeZone}
            >
              {timeZonesNames.map((name) => {
                return (
                  <option key={name} value={name}>
                    {name} ({getTimeZoneCode(name)})
                  </option>
                );
              })}
              ;
            </select>
          </label>
          <AnimatePresence>
            {qrCodeZoom && (
              <QRModal eventURL={eventURL} setQrCodeZoom={setQrCodeZoom} />
            )}

            {defaultEventName !== eventName && (
              <motion.div
                initial={{ opacity: 0, y: 100 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 100 }}
                key="card"
                id="output"
                className="flex flex-col items-center mt-4 w-full"
              >
                <div className="p-4 rounded-2xl mb-8 flex text-black dark:text-white bg-white dark:bg-[#262A2B] shadow-custom">
                  <div className="mr-6">
                    <h2 className="text-4xl mb-2">{eventName}</h2>
                    <h3 className="text-2xl text-gray-400">
                      {dayjs(date).format("dddd, D MMMM YYYY HH:mm")} (
                      {getTimeZoneCode(currentTimeZone)})
                    </h3>
                  </div>
                  <QRIcon
                    onClick={() => {
                      setQrCodeZoom(true);
                    }}
                  />
                </div>
                <div id="actions" className="flex gap-5">
                  <Button
                    onClick={async () => {
                      // Copy the URL to clipboard
                      if (!navigator.clipboard) {
                        // Clipboard API not available
                        return;
                      }
                      try {
                        await createLink(true);
                        toast.success("Copied to clipboard");
                      } catch (err: any) {
                        toast.error("Failed to copy!", err);
                      }
                    }}
                  >
                    <>{t("Copy link")}</>
                  </Button>

                  <Button
                    onClick={() => {
                      toast.success("Event created!");
                      downloadIcal();
                    }}
                  >
                    <> {t("Download")} .ics</>
                  </Button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.main>

        <Footer />
      </div>
    </>
  );
}

const QRModal = (props: {
  eventURL: string;
  setQrCodeZoom: React.Dispatch<React.SetStateAction<boolean>>;
}): JSX.Element => {
  const [width, height] = useWindowSize();

  const { eventURL, setQrCodeZoom } = props;
  const size = Math.min(520, width - width * 0.17, height - height * 0.17);
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0 }}
      transition={{ duration: 0.15 }}
      key="modal"
      className="absolute top-0 left-0 w-screen h-screen z-200 backdrop-filter backdrop-blur-sm flex items-center overflow-hidden"
      onClick={() => {
        setQrCodeZoom(false);
      }}
    >
      <div className="m-auto bg-white p-4 rounded-2xl shadow-custom">
        <QRCode value={eventURL} size={size} level="M" />
      </div>
    </motion.div>
  );
};

export async function getServerSideProps() {
  return { props: { baseURL: process.env.VERCEL_URL || process.env.BASE_URL } };
}
