import { Calendar, } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';


import { CalendarEvent, CalendarModal, Navbar } from "../"
import { getMessagesES, localizer } from '../../helpers';
import { useState } from 'react';
import { useCalendarStore, useUiStore } from '../../hooks';



export const CalendarPage = () => {

  const { openDateModal } = useUiStore()
  const { events, setActiveEvent } = useCalendarStore();
  
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

  const onDobleclick = (event) => {
    openDateModal();
  }

  const onSelect = (event) => {
    setActiveEvent(event);

  }

  const onViewChanged = (event) => {
    localStorage.setItem('lastView', event);
    setLastView(event)

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
        onDoubleClickEvent={onDobleclick}
        onSelectEvent={onSelect}
        onView={onViewChanged}
      />

      <CalendarModal />

    </>
  )
}
