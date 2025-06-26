import { Calendar, } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';

import { addHours } from 'date-fns';


import { Navbar } from "../"

import { getMessagesES, localizer } from '../../helpers';

const events = [{
  title: 'cumpleaños esposa',
  note: 'reservar una cena',
  start: new Date(),
  end: addHours( new Date(), 2),
  bgColor: '#fafafa',
  user: {
    id: 123,
    name: 'fernando'
  }
}]

export const CalendarPage = () => {
  return (
    <>
      <Navbar />

      <Calendar
        culture='es'
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 'calc(100vh - 80px)' }}
        messages={ getMessagesES() }
      />

    </>
  )
}
