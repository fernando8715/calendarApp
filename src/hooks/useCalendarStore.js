import { useDispatch, useSelector } from "react-redux"
import { onSetActiveEvent, onAddNewEvent, onUpdateEvent } from "../store";

export const useCalendarStore = () => {

    const { events, activeEvent } = useSelector(state => state.calendar);
    const dispatch = useDispatch();

    const setActiveEvent = (calendarEvent) => {
        dispatch(onSetActiveEvent(calendarEvent))
    }

    const startSavingNewEvent = (calendarEvent) => {
        // todo: llegar al backend

        // todo sale bien
        if (calendarEvent._id) {
            // *actualizando
            dispatch( onUpdateEvent(calendarEvent));
        } else {
            // * creando
            dispatch(onAddNewEvent({ ...calendarEvent, _id: new Date().getTime() }));
        }
    }



    return {
        //* properties
        events,
        activeEvent,

        //* Metodos
        setActiveEvent,
        startSavingNewEvent,
    }
}
