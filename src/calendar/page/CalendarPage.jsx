import { Calendar, } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';

import { addHours } from 'date-fns';

import { CalendarEvent, Navbar } from "../"
import { getMessagesES, localizer } from '../../helpers';
import { useState } from 'react';


const events = [{
  title: 'cumpleaños esposa',
  note: 'reservar una cena',
  start: new Date(),
  end: addHours(new Date(), 2),
  bgColor: '#fafafa',
  user: {
    id: 123,
    name: 'fernando'
  }
}]

export const CalendarPage = () => {

  const [lastView, setLastView] = useState(localStorage.getItem('lastView') || 'agenda')

  const eventStyleGetter = (event, start, end, isSelected) => {

    const style = {
      backgroudColor: '#347CF7',
      borderRadius: '8px',
      opacity: 0.8,
      color: 'black'
    }

    return {
      style
    }

  }

  const onDobleclick = (event)=> {
    console.log({Dobleclick : event});
    
  }
  
  const onSelect = (event)=> {
    console.log({click: event});
    
  }
  
  const onViewChanged = (event)=>{
    localStorage.setItem('lastView', event);
    setLastView( event)

  }


  return (
    <>
      <Navbar />

      <Calendar
        culture='es'
        localizer={localizer}
        events={events}
        defaultView={lastView}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 'calc(100vh - 80px)' }}
        messages={getMessagesES()}
        eventPropGetter={eventStyleGetter}
        components={{
          event: CalendarEvent
        }}
        onDoubleClickEvent={ onDobleclick }
        onSelectEvent={ onSelect }
        onView={ onViewChanged }
      />

    </>
  )
}
