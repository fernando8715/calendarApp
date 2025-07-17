import { useMemo, useState } from 'react';

import Modal from 'react-modal';
import DatePicker, { registerLocale } from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

import Swal from 'sweetalert2';

import { addHours, differenceInSeconds } from 'date-fns';
import { es } from 'date-fns/locale/es';

import { useUiStore } from '../../hooks';


registerLocale('es', es)


const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
    },
};

Modal.setAppElement('#root');



export const CalendarModal = () => {

    const { isDateModalOpen, closeDateModal } = useUiStore();
    const [formSubmitted, setIsFormSubmitted] = useState(false);

    const [formValues, setFormValues] = useState({
        title: 'Fernando',
        notes: 'Ruiz',
        start: new Date(),
        end: addHours(new Date(), 2)
    });

    const titleClass = useMemo(() => {
        if (!formSubmitted) return '';

        if (formValues.title.length <= 0) return 'is-invalid'

    }, [formValues.title, formSubmitted])


    const onCloseModal = () => {
        closeDateModal();
    }

    const onInputChange = ({ target }) => {
        setFormValues({
            ...formValues,
            [target.name]: target.value
        })
    }

    const onDateChange = (event, changing) => {
        setFormValues({
            ...formValues,
            [changing]: event
        })
    }

    const onSubmit = (event) => {
        event.preventDefault();
        setIsFormSubmitted(true);

        const difference = differenceInSeconds(formValues.end, formValues.start);

        if (isNaN(difference) || difference <= 0) {
            Swal.fire({ title: 'Error fechas', text: 'Verificar fechas ingresadas', icon: 'error' })
            return
        }

        if (formValues.title.length <= 0) return;

        console.log(formValues);

    }


    return (
        <div>
            <Modal
                isOpen={isDateModalOpen}
                onRequestClose={onCloseModal}
                style={customStyles}
                closeTimeoutMS={2000}
                className='modal'
                overlayClassName='modal-fondo'
            >
                <h1> Nuevo evento </h1>
                <hr />
                <form className="container" onSubmit={onSubmit}>

                    <div className="form-group mb-2 ">
                        <label className='d-block'>Fecha y hora inicio</label>
                        <div className="customDatePickerWidth">
                            <DatePicker
                                selected={formValues.start}
                                className="form-control"
                                onChange={(event) => onDateChange(event, 'start')}
                                dateFormat="d/MM/yyyy h:mm aa"    // dateFormat="d MMMM yyyy h:mm aa"   // dateFormat="Pp"
                                showTimeSelect
                                locale={es}
                                timeCaption='Hora'
                            />
                        </div>
                    </div>

                    <div className="form-group mb-2">
                        <label >Fecha y hora fin</label>
                        <div className="customDatePickerWidth">
                            <DatePicker
                                minDate={formValues.start}
                                selected={formValues.end}
                                className="form-control"
                                onChange={(event) => onDateChange(event, 'end')}
                                dateFormat="d/MM/yyyy h:mm aa"
                                showTimeSelect
                                locale={es}
                                timeCaption='Hora'
                            />
                        </div>
                    </div>

                    <hr />
                    <div className="form-group mb-2">
                        <label>Titulo y notas</label>
                        <input
                            type="text"
                            className={`form-control ${titleClass}`}
                            placeholder="Título del evento"
                            name="title"
                            autoComplete="off"
                            value={formValues.title}
                            onChange={onInputChange}
                        />
                        <small id="emailHelp" className="form-text text-muted">Una descripción corta</small>
                    </div>

                    <div className="form-group mb-2">
                        <textarea
                            type="text"
                            className="form-control"
                            placeholder="Notas"
                            rows="5"
                            name="notes"
                            value={formValues.notes}
                            onChange={onInputChange}
                        ></textarea>
                        <small id="emailHelp" className="form-text text-muted">Información adicional</small>
                    </div>

                    <button
                        type="submit"
                        className="btn btn-outline-primary btn-block"
                    >
                        <i className="far fa-save"></i>
                        <span> Guardar</span>
                    </button>

                </form>
            </Modal>
        </div>
    )
}
