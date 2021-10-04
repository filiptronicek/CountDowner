import dayjs from 'dayjs';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

const inputStyle =
  'w-1/2 p-3 mt-3 ml-0 font-thin transition duration-200 focus:shadow-md focus:outline-none ring-offset-2 border border-gray-400 rounded-lg focus:ring-2 focus:ring-gray-500 text-black dark:text-white bg-white dark:bg-[#262A2B]';

/**
 * The component in which the user can change the date, time and name of the event.
 * @param props -
 * @param props.eventName - the name of the event to count down to.
 * @param props.setName - the React setState for `props.eventName`.
 * @param props.date - the date of the event to count down to.
 * @param props.setDate - the React setState for `props.date`.
 * @returns a component with the event's name and a date time picker.
 */
const EventName = (props: {
  eventName: string;
  setName: React.Dispatch<React.SetStateAction<string>>;
  date: Date;
  setDate: React.Dispatch<React.SetStateAction<Date>>;
}): JSX.Element => {
  const { t } = useTranslation();

  const [editingTitle, setEditingTitle] = useState<boolean>(false);
  const { eventName, setName, date, setDate } = props;
  return (
    <>
      {editingTitle ? (
        <input
          className="text-7xl text-center mb-4 bg-white dark:bg-[#262A2B] text-black dark:text-white border-gray-200 dark:border-gray-600 rounded-xl "
          value={eventName}
          onChange={(e) => {
            setName(e.target.value);
          }}
          onBlur={() => {
            setEditingTitle(false);
          }}
          onKeyUp={(e) => {
            if (e.key === 'Enter') {
              setEditingTitle(false);
            }
          }}
          autoFocus
        />
      ) : (
        <div
          className="text-7xl mb-4 bg-white dark:bg-[#262A2B] text-black dark:text-white border-2 border-gray-200 dark:border-gray-600 rounded-xl p-4 "
          tabIndex={0}
          onFocus={() => {
            setEditingTitle(true);
          }}
          onClick={() => {
            setEditingTitle(true);
          }}
        >
          {eventName}
        </div>
      )}
      <div className="text-3xl flex justify-center items-center flex-wrap">
        <span>{t('Counting down to')}</span>
        <input
          type="datetime-local"
          className={inputStyle}
          defaultValue={dayjs(date).format('YYYY-MM-DDThh:mm')}
          onChange={(e) => {
            setDate(new Date(e.target.value));
          }}
        />
      </div>
    </>
  );
};

export default EventName;
