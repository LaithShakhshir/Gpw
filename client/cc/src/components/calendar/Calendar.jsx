import React, { useState, useEffect } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import './calendar.css'

function Calendar() {

    
  const [events, setEvents] = useState([]);

  useEffect(() => {
    fetch('/api/events')
      .then(response => response.json())
      .then(data => setEvents(data));
  }, []);

 const handleDateSelect = (arg) => {
  const title = prompt('Event Title:');
  if (title) {
    const eventData = {
      title: title,
      start: new Date(arg.startStr),
      end: new Date(arg.endStr),
      allDay: arg.allDay
    };
    fetch('/api/events', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(eventData)
    })
      .then(response => response.json())
      .then(data => setEvents([...events, {
        ...data,
        start: new Date(data.start),
        end: new Date(data.end),
      }]));
  }
};

  const handleEventClick = (arg) => {
    if (window.confirm(`Delete event '${arg.event.title}'?`)) {
      fetch(`/api/events/${arg.event.id}`, { method: 'DELETE' })
        .then(() => setEvents(events.filter(event => event.id !== arg.event.id)));
    }
  };

  return (
    <FullCalendar
      plugins={[dayGridPlugin]}
      events={events}
    //   dateClick={handleDateSelect}
    //   eventClick={handleEventClick}
    />
  );
}

export default Calendar;
