import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { addMonths, format, set} from 'date-fns';
import Swal from 'sweetalert2'
import { useTranslation } from "react-i18next";

function DatePickerModal({show, handleClose, onAddRevervation}) {

        const { t } = useTranslation();
        //datepicker
        const [startDate, setStartDate] = useState(new Date());
        const [endDate, setEndDate] = useState(new Date());
        const [formattedStart, setFormattedStart] = useState('');
        const [formattedEnd, setformattedEnd] = useState('');

        const onChange = (dates) => {
            const [start, end] = dates;
            setStartDate(start);
            setEndDate(end);
            setFormattedStart(start ? format(start, 'yyyy/MM/dd') : '');
            setformattedEnd(end ? format(end, 'yyyy/MM/dd') : '');
        }

        const HandleReservation = () => {
            handleClose();
            onAddRevervation({ formattedStart, formattedEnd });
            Swal.fire({
                position: "top-end",
                icon: "success",
                title: `${t('alerts.reserveSucces.text1')} ${formattedStart} ${t('alerts.reserveSucces.text2')} ${formattedEnd}`,
                showConfirmButton: false,
                timer: 3000
            });
        }

    return (
    <>
        <Modal size="sm" show={show} onHide={handleClose} centered>
            <Modal.Header closeButton>
                <Modal.Title>{t('modals.reserve.title')}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
            <div className="d-flex justify-content-center">
            <DatePicker
                selected={startDate}
                onChange={onChange}
                minDate={new Date()}
                maxDate={addMonths(new Date(), 5)}
                startDate={startDate}
                endDate={endDate}
                selectsRange
                inline
                showDisabledMonthNavigation
            />
            </div>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    {t('modals.reserve.buttonClose')}
                </Button>
                <Button variant="primary" type="submit" onClick={HandleReservation}>
                    {t('modals.reserve.buttonSave')}
                </Button>
            </Modal.Footer>
        </Modal>
    </>
    );
}

export default DatePickerModal;