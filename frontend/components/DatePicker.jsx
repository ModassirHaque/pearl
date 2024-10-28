// frontend/components/DatePicker.jsx
import React, { useState } from 'react';

const DatePicker = ({ onSelect }) => {
  const [recurrence, setRecurrence] = useState({
    frequency: 'daily',
    interval: 1,
    daysOfWeek: [],
    nthDay: null,
    startDate: '',
    endDate: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setRecurrence((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSelect(recurrence);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block">Frequency:</label>
        <select name="frequency" onChange={handleChange} className="mt-1">
          <option value="daily">Daily</option>
          <option value="weekly">Weekly</option>
          <option value="monthly">Monthly</option>
          // frontend/components/DatePicker.jsx (continued)

          <option value="yearly">Yearly</option>
        </select>
      </div>

      <div>
        <label className="block">Interval:</label>
        <input
          type="number"
          name="interval"
          value={recurrence.interval}
          onChange={handleChange}
          min="1"
          className="mt-1 border rounded p-2"
        />
      </div>

      {recurrence.frequency === 'weekly' && (
        <div>
          <label className="block">Days of the Week:</label>
          {['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'].map((day, index) => (
            <div key={index}>
              <input
                type="checkbox"
                value={day}
                onChange={(e) => {
                  const days = e.target.checked
                    ? [...recurrence.daysOfWeek, day]
                    : recurrence.daysOfWeek.filter((d) => d !== day);
                  setRecurrence((prev) => ({ ...prev, daysOfWeek: days }));
                }}
              />
              {day}
            </div>
          ))}
        </div>
      )}

      {recurrence.frequency === 'monthly' && (
        <div>
          <label className="block">Nth Day of the Month:</label>
          <input
            type="number"
            name="nthDay"
            value={recurrence.nthDay}
            onChange={handleChange}
            min="1"
            max="31"
            className="mt-1 border rounded p-2"
          />
        </div>
      )}

      <div>
        <label className="block">Start Date:</label>
        <input
          type="date"
          name="startDate"
          value={recurrence.startDate}
          onChange={handleChange}
          className="mt-1 border rounded p-2"
        />
      </div>

      <div>
        <label className="block">End Date:</label>
        <input
          type="date"
          name="endDate"
          value={recurrence.endDate}
          onChange={handleChange}
          className="mt-1 border rounded p-2"
        />
      </div>

      <button type="submit" className="mt-4 bg-blue-500 text-white py-2 px-4 rounded">
        Set Recurrence
      </button>
    </form>
  );
};

export default DatePicker;