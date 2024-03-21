import React, { useState, useEffect } from 'react';

const Reservation = () => {
  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();
  const currentMonth = currentDate.getMonth();

  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedYear, setSelectedYear] = useState(currentYear);
  const [selectedMonth, setSelectedMonth] = useState(currentMonth);
  const [selectedTime, setSelectedTime] = useState(null);
  const [reservationInfo, setReservationInfo] = useState(null);
  const [dates, setDates] = useState([]);

  // Function to handle date selection
  const handleDateClick = (date) => {
    setSelectedDate(date);
    // Fetch reservation info for the selected date
    const info = fetchReservationInfo(date);
    setReservationInfo(info);
  };

  // Function to fetch reservation info for a specific date
  const fetchReservationInfo = (date) => {
    // Implement logic to get the information from the database
    // I'll just return a sample reservation info object
    return {
      date: date.toDateString(), // Sample reservation info
      name: 'Sean Lowie Berbon',
      // Add more reservation information as needed
    };
  };

  // Function to get the number of days in a month
  const getDaysInMonth = (year, month) => {
    return new Date(year, month + 1, 0).getDate();
  };

  // Generate array of years for the dropdown
  const years = Array.from({ length: 10 }, (_, index) => currentYear - 5 + index);

  // Generate array of month names
  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  // Function to check if a date is the current day nababaliw na ako sa react send welp
  const isCurrentDay = (date) => {
    return (
      date.getFullYear() === currentDate.getFullYear() &&
      date.getMonth() === currentDate.getMonth() &&
      date.getDate() === currentDate.getDate()
    );
  };

  // Set selectedTime to current time when component mounts hehe
  useEffect(() => {
    const currentTime = new Date();
    const hours = String(currentTime.getHours()).padStart(2, '0');
    const minutes = String(currentTime.getMinutes()).padStart(2, '0');
    setSelectedTime(`${hours}:${minutes}`);
  }, []);

  //Year and Month will change depending on the selected Month and Year hehe
  useEffect(() => {
    const daysInMonth = getDaysInMonth(selectedYear, selectedMonth);
    const newDates = Array.from({ length: daysInMonth }, (_, index) => new Date(selectedYear, selectedMonth, index + 1));
    setDates(newDates);
  }, [selectedYear, selectedMonth]);

  return (
    <section className='w-4/5 font-semibold bg-backColor h-screen overflow-y-auto flex flex-col justify-start items-center gap-2 p-4 scrollbar-thin scrollbar-webkit'>
      <div id='main-section' className='grid lg:grid-cols-3 grid-cols-1 gap-4 w-full h-full'>
        {/* Select Day */}
        <div className="col-span-1 lg:col-span-2">
          <div className="bg-mainCol mt-2 border-b-[1px] border-mainBorder p-4 rounded-xl shadow">
            <h2 className='text-2xl text-act-text font-semibold py-2'>Reserve Day:</h2>
            <div className="grid grid-cols-7 gap-2">
              {dates.map(date => (
                <button
                  key={date}
                  className={`date-button ${
                    selectedDate && selectedDate.getTime() === date.getTime() ? 'text-black bg-bordColor border-black' : 'bg-mainBg border-black border border--300 rounded-xl shadow'
                  } rounded-xl px-4 py-2 m-1 hover:bg-actNav`}
                  style={{
                    backgroundColor: isCurrentDay(date) ? '#bef264' : '', // Set background color for current day di nagana if galing sa tailwind.config yung color
                  }}
                  onClick={() => handleDateClick(date)}
                >
                  {date.getDate()}
                </button>
              ))}
            </div>
          </div>
          {/* Date Info if it's reserved */}
          <div key="reservationInfo" className="col-span-1 lg:col-span-2">
            <div className='bg-mainCol mt-2 border-b-[1px] border-mainBorder p-4 rounded-xl shadow'>
              <h2 className='text-2xl text-act-text font-semibold py-2'>Reservation Info:</h2>
              {reservationInfo && (
                <div className='bg-backColor rounded-md w-full overflow-wrap flex-col justify-start items-center gap-2 mt-2 p-2'>
                  <p>{`Reservation Date: ${reservationInfo.date}`}</p>
                  <p>{`Customer Name: ${reservationInfo.name}`}</p>
                  <p>{`Room: `}</p>
                  <p>{`Room Details: `}</p>
                  {/* Add more reservation information as needed */}
                </div>
              )}
            </div>
          </div>
        </div>
        {/* Select Year, Time, and Month */}
        {/* Select Year */}
        <div className="col-span-1 lg:col-span-1">
          <div className="bg-mainCol mt-2 pt-1 border-b-[1px] border-mainBorder p-4 rounded-xl shadow">
            <h2 className='py-2'>Select Year:</h2>
            <select
              value={selectedYear || ''}
              onChange={(e) => {
                const newYear = parseInt(e.target.value);
                setSelectedYear(newYear);
              }}
              className="border border-gray-300 px-4 py-2 w-full"
            >
              {years.map(year => (
                <option key={year} value={year}>{year}</option>
              ))}
            </select>
            {/*Select Month */}
            <div className='bg-mainCol py-2'>
              <h2 className='py-2'>Select Month:</h2>
              <select
                value={selectedMonth || ''}
                onChange={(e) => {
                  const newMonth = parseInt(e.target.value);
                  setSelectedMonth(newMonth);
                }}
                className="border border-gray-300 px-4 py-2 w-full"
              >
                {monthNames.map((month, index) => (
                  <option key={index} value={index}>{month}</option>
                ))}
              </select>
            </div>
            {/* Select Time */}
            <div className="bg-mainCol py-2">
              <h2 className='py-2'>Select Time:</h2>
              <input
                type="time"
                value={selectedTime}
                onChange={e => setSelectedTime(e.target.value)}
                className="border border-gray-300 px-4 py-2 w-full"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Reservation;
//Documentations needed too para magets hehe at di makalimutan purposes of each part ng code