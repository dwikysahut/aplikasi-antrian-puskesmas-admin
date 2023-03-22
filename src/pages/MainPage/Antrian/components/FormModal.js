/* eslint-disable eqeqeq */
/* eslint-disable react/prop-types */
import React from 'react';
import '../styles/Form.css';
import { Link } from 'react-router-dom';
import {
  Button, Modal, ModalHeader, ModalBody, ModalFooter,
} from 'reactstrap';
import { Formik } from 'formik';
import FormInput from './FormInput';

function FormModal({
  isShow, setIsShow, onClose, onSubmitTambahHandler, onSubmitEditHandler,
  form, formValidationSchema, isEdit, dataPraktek, dataPasien, dataKartuKeluarga, dataRak, checkNik,
}) {
  return (

    <Formik
      enableReinitialize
      validateOnChange={false}
      initialValues={{ ...form }}
      validationSchema={formValidationSchema}
      onSubmit={isEdit ? onSubmitEditHandler : onSubmitTambahHandler}
    >
      {({
        handleChange,
        handleReset,
        setFieldValue,
        handleSubmit,
        values,
        errors,
        touched,
        isValid,
        isSubmitting,
      }) => (
        <Modal
          isOpen={isShow}
          toggle={() => {
            handleReset();
            onClose();
          }}
          size="lg"
          style={{ maxWidth: '80vw', width: '100%' }}
          onClosed={() => handleReset()}
        >
          <ModalHeader toggle={setIsShow}>Form Data Antrian</ModalHeader>
          <ModalBody style={{ height: '70vh', overflowY: 'scroll' }}>

            <FormInput
              closeModal={setIsShow}
              error={errors}
              dataPraktek={dataPraktek}
              dataPasien={dataPasien}
              dataKartuKeluarga={dataKartuKeluarga}
              dataRak={dataRak}
              checkNik={checkNik}
              isSubmitting={isSubmitting}
              touched={touched}
              values={values}
              isEdit={isEdit}
              isValid={isValid}
              setFieldValue={setFieldValue}
              onChangeHandler={handleChange}
              onSubmitHandler={handleSubmit}
            />
          </ModalBody>
          <ModalFooter>
            <Button
              color="success"
              className="w-20 mt-3"
              onClick={handleSubmit}
            >
              Submit

            </Button>
            <Button
              outline
              className="w-20 mt-3"
              onClick={() => {
                handleReset();
                onClose();
              }}
            >
              Cancel

            </Button>
          </ModalFooter>

        </Modal>
      )}
    </Formik>

  );
}

export default FormModal;
