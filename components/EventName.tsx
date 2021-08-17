import React, { useState } from "react";
import DatePicker from "react-datepicker";
import { useTranslation } from "react-i18next";

const EventName = (props: {
  eventName: any;
  setName: any;
  date: any;
  setDate: any;
}): JSX.Element => {
  const { t, i18n } = useTranslation();

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
            if (e.key === "Enter") {
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
        <span>{t("Counting down to")}</span>
        <DatePicker
          className="bg-white dark:bg-[#262A2B] text-black dark:text-white border-2 border-gray-200 dark:border-gray-600 rounded-xl p-2"
          dateFormat="dd/MM/yyyy"
          selected={date}
          showTimeSelect
          timeIntervals={15}
          minDate={new Date()}
          onChange={(val: Date) => {
            setDate(val);
          }}
        />
      </div>
    </>
  );
};

export default EventName;
