import React, { useState, useEffect } from 'react';

//Beware for my spaghetti code sorry po medyo naguguluhan pa me sa ReactJS
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
    fetchReservationInfo(date)
      .then((info) => setReservationInfo(info))
      .catch((error) => console.error('Error fetching reservation info:', error));
  };

  // Function to fetch reservation info for a specific date
  const fetchReservationInfo = async (date) => {
    try {
      // Implement logic to get the information from the database
      // Sample reservation info
      const info = {
        date: date.toDateString(),
        name: 'Sean Lowie Berbon',
        // Add more reservation information as needed
      };
      return info;
    } catch (error) {
      throw new Error('Failed to fetch reservation info');
    }
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

  //Generate weekday names in week
  const weekDayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

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

  // Year and Month will change depending on the selected Month and Year hehe
  useEffect(() => {
    const daysInMonth = getDaysInMonth(selectedYear, selectedMonth);
    const newDates = Array.from({ length: daysInMonth }, (_, index) => new Date(selectedYear, selectedMonth, index + 1));
    setDates(newDates);
  }, [selectedYear, selectedMonth]);

  // Arrange days based on day of the week (Monday, Tuesday, etc.)
  const arrangeDays = () => {
    const orderedDates = [];
    const firstDayOfMonth = new Date(selectedYear, selectedMonth, 1);
    let currentDay = new Date(firstDayOfMonth);
    
    // Move to the previous Sunday
    while (currentDay.getDay() !== 0) { // 0 corresponds to Sunday
      currentDay.setDate(currentDay.getDate() - 1);
    }
  
    // Push days of the previous month
    while (orderedDates.length < 36) { // 36 value para ma-fit yung 31 day per month if 30 then magshoshow yung preivous days of month sa current month.
      orderedDates.push(new Date(currentDay));
      currentDay.setDate(currentDay.getDate() + 1);
    }
    return orderedDates;
  };

  return (
    <section className='w-4/5 font-semibold bg-backColor h-screen overflow-y-auto flex flex-col justify-start items-center gap-2 p-4 scrollbar-thin scrollbar-webkit'>
      <div id='main-section' className='grid lg:grid-cols-3 grid-cols-1 gap-4 w-full h-full'>
        {/* Select Day */}
        <div className="col-span-1 lg:col-span-2">
          <div className="bg-mainCol mt-2 border-b-[1px] border-mainBorder p-4 rounded-xl shadow">
            <h2 className='text-2xl text-act-text font-semibold py-2'>Reserve Day:</h2>
            <div className="grid grid-cols-7 gap-2">
            {weekDayNames.map((dayName, index) => (
            <div key={index} className="text-center text-lg border border-bordColor border--300 rounded-xl">{dayName}</div>
              ))}
              {arrangeDays().map(date => (
                <button
                  key={date}
                  className={`date-button ${
                    selectedDate && selectedDate.getTime() === date.getTime() ? 'text-black bg-bordColor border-black' : 'bg-mainBg border-gray-300 border border--300 rounded-xl shadow'
                  } rounded-xl px-4 py-2 m-1 hover:bg-actNav`}
                  style={{
                    backgroundColor: date.getMonth() !== selectedMonth ? 'rgba(240, 240, 240, 0.5)' : (isCurrentDay(date) ? '#bef264' : ''),
                  }}
                  onClick={() => handleDateClick(date)}
                  disabled={date.getMonth() !== selectedMonth} // Disable buttons for dates of the previous/next month
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
              <h2 className
              ='py-2'>Select Month:</h2>
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