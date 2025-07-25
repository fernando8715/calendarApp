import { addHours } from "date-fns";
import { useCalendarStore, useUiStore } from "../../hooks"

export const FabAddNew = () => {

    const { openDateModal } = useUiStore();
    const { setActiveEvent } = useCalendarStore();

    const handleNewNote = () => {
        setActiveEvent({
            title: '',
            notes: '',
            start: new Date(),
            end: addHours(new Date(), 2),
            bgColor: '#fafafa',
            user: {
                id: 123,
                name: 'fernando'
            }
        })
        openDateModal();
    }

    return (
        <button className="btn btn-primary fab"
            onClick={handleNewNote}
        >
            <i className="fas fa-plus"></i>
        </button>

    )
}
