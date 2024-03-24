import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import { useIncidence } from '../../../hooks/useIncidence'
import { useTranslation } from "react-i18next";
import Swal from 'sweetalert2'

function ExampleModal({ show, handleClose, id_apartment }) {
    const { t } = useTranslation();
    const [selectedOption, setSelectedOption] = useState('');
    const [description, setDescription] = useState('');
    const { useCreateIncidence } = useIncidence();
    const handleSelectChange = (event) => {
        setSelectedOption(event.target.value);
    };

    const handleDescriptionChange = (event) => {
        setDescription(event.target.value);
    };

    const handleSubmit = () => {
        const incidenceData = {
            apartment_incidence: {
                apartment_id: id_apartment,
                title: selectedOption,
                desc: description
            }
        };
        useCreateIncidence(incidenceData);
        handleClose();
        Swal.fire({
            position: "top-end",
            icon: "success",
            title: `${t('alerts.incidence')}`,
            showConfirmButton: false,
            timer: 2000
        });

    };

    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>{t('modals.incidence.title')}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group controlId="exampleForm.ControlSelect1">
                        <Form.Label>{t('modals.incidence.type')}</Form.Label>
                        <Form.Control as="select" onChange={handleSelectChange}>
                            <option value="Bathroom">{t('modals.incidence.optionBath')}</option>
                            <option value="Kitchen">{t('modals.incidence.optionKitchen')}</option>
                            <option value="Keys">{t('modals.incidence.optionKeys')}</option>
                            <option value="Heating">{t('modals.incidence.optionHeating')}</option>
                        </Form.Control>
                    </Form.Group>
                    <Form.Group controlId="exampleForm.ControlTextarea1">
                        <Form.Label>{t('modals.incidence.desc')}</Form.Label>
                        <Form.Control as="textarea" rows={3} onChange={handleDescriptionChange} />
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                {t('modals.incidence.buttonClose')}
                </Button>
                <Button variant="primary" onClick={handleSubmit}>
                {t('modals.incidence.buttonSend')}
                </Button>
            </Modal.Footer>
        </Modal>
    );
}

export default ExampleModal;
