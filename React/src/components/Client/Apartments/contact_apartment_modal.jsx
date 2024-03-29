import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import HomeCSS from  '../../../pages/home.module.css';
import { useTranslation } from "react-i18next";

function ContactApartmentModal({show2, handleClose2, form, sendEmail}) {
    const { t } = useTranslation();

    return (
    <>
        <Modal show={show2} onHide={handleClose2} centered>
            <Modal.Body>
                <div className="d-flex justify-content-center">
                    <div className={`${HomeCSS.formbox} modal-content-wrapper`}>
                        <h1>{t('modals.info.title')}</h1>
                        <br></br>
                        <form ref={form} onSubmit={sendEmail}>
                            <div className="form-group">
                                <label htmlFor="question">{t('modals.info.text')}</label>
                                <textarea className="form-control" id="question" name="question"></textarea>
                            </div>
                            <br></br>
                            <input className="btn btn-primary" type="submit" value={t('modals.info.buttonSend')} />
                        </form>
                    </div>
                </div>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose2}>
                    {t('modals.info.buttonClose')}
                </Button>
            </Modal.Footer>
        </Modal>

    </>
    );
}

export default ContactApartmentModal;