// Datepicker
import 'react-datepicker/dist/react-datepicker.css';

import Button from '@components/Button';
import { QRCode as QRIcon } from '@components/create/icons';
import Footer from '@components/Footer';
import Head from '@components/Head';
import Menu from '@components/Menu';
import { useWindowSize } from '@utils/helpers/useWindowSize';
import { getTimeZoneCode } from '@utils/timeZones';
import { timeZonesNames } from '@vvo/tzdb';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import timezone from 'dayjs/plugin/timezone';
import utc from 'dayjs/plugin/utc';
import { AnimatePresence, motion } from 'framer-motion';
import { DateTime } from 'luxon';
import React, { useState } from 'react';
import { toast, Toaster } from 'react-hot-toast';
import { useTranslation } from 'react-i18next';
import QRCode from 'react-qr-code';

dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.extend(relativeTime);

const inputStyle =
  'w-1/2 p-3 mt-3 ml-0 font-thin transition duration-200 focus:shadow-md focus:outline-none ring-offset-2 border border-gray-400 rounded-lg focus:ring-2 focus:ring-gray-500 text-black dark:text-white bg-white dark:bg-[#262A2B]';

export default function Create(): JSX.Element {
  const { t } = useTranslation();
  const [date, setDate] = useState<DateTime>(DateTime.now());
  const currentTimeZone = date.zoneName;

  const defaultEventName = '';
  const [eventName, setName] = useState<string>(defaultEventName);
  const [qrCodeZoom, setQrCodeZoom] = useState<boolean>(false);

  const reducedDate = Math.floor(date.toMillis() / 1000);
  const baseURL =
    typeof window !== 'undefined' &&
    `${window.location.protocol}//${window.location.host}`;
  const eventURL = `${baseURL}/?date=${reducedDate}&name=${eventName}`;

  const downloadIcal = async (): Promise<void> => {
    const createEvent = (await import('ics')).createEvent;

    createEvent(
      {
        title: eventName,
        busyStatus: 'FREE',
        start: [date.year, date.month, date.day, date.hour, date.minute],
        duration: { minutes: 60 },
        url: eventURL,
      },
      async (error, value) => {
        if (error) {
          toast.error(`Error creating event: ${error.message}`);
        }
        // Create a blob of the value and save it as event.ics
        const blob = new Blob([value], { type: 'text/calendar' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;

        const unidecode = (await import('unidecode')).default;

        const fileName = `${unidecode(eventName)}.ics`
          .toLowerCase()
          .replaceAll(' ', '-');

        a.download = fileName;
        a.click();
      },
    );
  };

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
          <h1 className="text-3xl">{t('Create a new countdown')}</h1>

          <label>
            {t('Event name')}:
            <input
              type="text"
              className={inputStyle}
              value={eventName}
              onChange={(e) => {
                setName(e.target.value);
              }}
            />
          </label>
          <br />
          <label>
            {t('Event date & time')}:
            <input
              type="datetime-local"
              className={inputStyle}
              onChange={(e) => {
                setDate(
                  DateTime.fromMillis(new Date(e.target.value).getTime()),
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
                const tz = val.target.value;
                setDate(date.setZone(tz, { keepLocalTime: true }));
              }}
              onBlur={(val) => {
                const tz = val.target.value;
                setDate(date.setZone(tz, { keepLocalTime: true }));
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
                      {date.toFormat('D MMMM HH:mm')} (
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
                        toast.error(
                          "Failed to copy! Your browser doesn't support the Clipboard API.",
                        );
                        return;
                      }
                      try {
                        await navigator.clipboard.writeText(
                          `${baseURL}/?date=${reducedDate}&name=${eventName}`,
                        );
                        toast.success('Copied to clipboard');
                      } catch (err: any) {
                        toast.error('Failed to copy!', err);
                      }
                    }}
                  >
                    <>{t('Copy link')}</>
                  </Button>
                  <Button
                    onClick={() => {
                      toast.success('Event created!');
                      downloadIcal();
                    }}
                  >
                    <> {t('Download')} .ics</>
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
