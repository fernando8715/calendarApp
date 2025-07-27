import { useCalendarStore, useUiStore } from "../../hooks"

export const FabDelete = () => {

    const { startDeletingEvent, hasActiveEvent } = useCalendarStore()
    const { isDateModalOpen } = useUiStore()

    const handleDeleteNote = () => {
        startDeletingEvent();
    }

    return (
        <button className="btn btn-danger fab-delete"
            style={{
                display: (hasActiveEvent && !isDateModalOpen) ? '' : 'none'
            }}
            onClick={handleDeleteNote}
        >
            <i className="fas fa-trash"></i>
        </button>

    )
}
