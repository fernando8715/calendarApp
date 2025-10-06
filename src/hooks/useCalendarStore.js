import { useDispatch, useSelector } from "react-redux"
import { onSetActiveEvent, onAddNewEvent, onUpdateEvent, onDeleteEvent } from "../store";
import calendarApi from "../apis/calendarApi";

export const useCalendarStore = () => {

    const { events, activeEvent } = useSelector(state => state.calendar);
    const dispatch = useDispatch();

    const setActiveEvent = (calendarEvent) => {
        dispatch(onSetActiveEvent(calendarEvent))
    }

    const startSavingNewEvent = async(calendarEvent) => {
        // todo: llegar al backend
        try {
            await calendarApi.post('/events', calendarEvent)
        } catch (error) {
            console.log(error);
        }

        // todo sale bien
        if (calendarEvent._id) {
            // *actualizando
            dispatch(onUpdateEvent(calendarEvent));
        } else {
            // * creando
            dispatch(onAddNewEvent({ ...calendarEvent, _id: new Date().getTime() }));
        }
    }

    const startDeletingEvent = () => {
        
        //* todo: hacer petición al backend

        //* todo sale bien
        dispatch(onDeleteEvent())
    }



    return {
        //* properties
        events,
        activeEvent,
        hasActiveEvent: !!activeEvent,

        //* Metodos
        setActiveEvent,
        startDeletingEvent,
        startSavingNewEvent,


    }
}
