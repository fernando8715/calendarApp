import { useCalendarStore } from "../../hooks"

export const FabDelete = () => {

    const { startDeletingEvent, hasActiveEvent } = useCalendarStore()

    const handleDeleteNote = () => {
        startDeletingEvent();
    }

    return (
        <button className="btn btn-danger fab-delete"
            style={{
                display: hasActiveEvent ? '' : 'none'
            }}
            onClick={handleDeleteNote}
        >
            <i className="fas fa-trash"></i>
        </button>

    )
}
