import React, { useState } from "react";
import DatePicker from "react-datepicker";

const EventName = (props: {
  eventName: any;
  setName: any;
  date: any;
  setDate: any;
}): JSX.Element => {
  const [editingTitle, setEditingTitle] = useState<boolean>(false);
  const { eventName, setName, date, setDate } = props;
  return (
    <>
      {editingTitle ? (
        <input
          className="text-7xl text-center mb-4 text-black bg-white border-2 border-gray-200 rounded-xl "
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
          className="text-7xl mb-4 bg-white border-2 border-gray-200 rounded-xl p-4 "
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
        <span>Counting down to</span>
        <DatePicker
          className="text-black  bg-white border-2 border-gray-200 rounded-xl p-2"
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
