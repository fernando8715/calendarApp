import { useDispatch, useSelector } from "react-redux"
import { onSetActiveEvent, onAddNewEvent, onUpdateEvent, onDeleteEvent, onLoadEvents, onCleanActiveEvent } from "../store";
import calendarApi from "../apis/calendarApi";
import { convertDateStringToDate } from "../helpers/convertDateStringToDate";
import Swal from "sweetalert2";

export const useCalendarStore = () => {

    const { events, activeEvent } = useSelector(state => state.calendar);
    const { user } = useSelector(state => state.auth);
    const dispatch = useDispatch();

    const setActiveEvent = (calendarEvent) => {
        dispatch(onSetActiveEvent(calendarEvent))
    }

    const startSavingNewEvent = async (calendarEvent) => {

        try {
            if (calendarEvent.id) {
                await calendarApi.put(`/events/${calendarEvent.id}`, calendarEvent)
                dispatch(onUpdateEvent({ ...calendarEvent, user }));
                return;
            }

            // * crear nuevo evento
            const { data } = await calendarApi.post('/events', calendarEvent);
            dispatch(onAddNewEvent({ ...calendarEvent, id: data.evento.id, user }));

        } catch (error) {
            console.log(error);
            Swal.fire(
                { title: 'No tiene privilegio de usuario', text: error.response.data.msg, icon: 'error' }
            );
        }
    };


    const startDeletingEvent = async () => {

        try {
            await calendarApi.delete(`/events/${activeEvent.id}`)
            dispatch(onDeleteEvent());

        } catch (error) {
            Swal.fire(
                { title: 'No tiene privilegio de usuario', text: error.response.data.msg, icon: 'error' }
            );
        }
    }

    const startLoadingEvent = async () => {

        try {
            const { data } = await calendarApi.get('/events');
            const events = convertDateStringToDate(data.eventos);
            dispatch(onLoadEvents(events))

        } catch (error) {

            console.log("Error cargando eventos");
            console.log(error);
        }
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
        startLoadingEvent,
    }
}
