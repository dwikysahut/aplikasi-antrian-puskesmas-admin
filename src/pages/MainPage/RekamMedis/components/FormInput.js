/* eslint-disable jsx-a11y/control-has-associated-label */
/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React from 'react';
import {
  Form, FormGroup, Label, Input, Button, Row, Col,
} from 'reactstrap';
import { useNavigate } from 'react-router-dom';
import { ErrorMessage } from 'formik';
import FormDecline from '../../../../components/FormFeedback/FormDecline';
import SelectComponent from '../../components/SelectComponent';

const customStyles = {
  control: (base, state) => ({
    ...base,

  }),
  otion: (base, state) => ({
    ...base,
    zIndex: 10000,
    height: '100px',
    position: 'absolute',
  }),
};
function FormInput({
  onChangeHandler, isValid, error, values, touched, isSubmitting,
  closeModal, isEdit, dataRak, dataKartuKeluarga, setFieldValue,
}) {
  const options = dataKartuKeluarga.map((item) => ({
    label: item.no_kk,
    value: item.no_kk,
  }));
  console.log(options);
  return (

    <Form>
      <FormGroup>
        <Label for="no. rm">No. Rekam Medis</Label>
        <Input
          id="no_rm"
          name="no_rm"
          placeholder="No. Rekam Medis"
          type="number"
          disabled={!!isEdit}
          value={values.no_rm}
          onChange={onChangeHandler('no_rm')}
          invalid={error.no_rm !== undefined}
        />
        { error.no_rm && (<FormDecline text={error.no_rm} />)}
      </FormGroup>
      <FormGroup className="h-100">
        <Label for="no kk">No. Kartu keluarga</Label>
        <SelectComponent
          customStyles={customStyles}
          data={options}
          onChange={(e) => { setFieldValue('no_kk', e.value); }}
          name="no_kk"
          value={values.no_kk}
        />
        {/* <Input
          id="id_rak"
          name="id_rak"
          placeholder="Kode Rak"
          type="select"
          value={values.id_rak}
          onChange={onChangeHandler('id_rak')}
          invalid={error.id_rak !== undefined}
        >
          <option value="" hidden />
          {dataRak.map((item) => (
            <option key={item.id_rak} value={item.id_rak}>
              {item.kode_rak}
            </option>
          ))}

        </Input> */}
        { error.no_kk && (<FormDecline text={error.no_kk} />)}
      </FormGroup>
      {/* <FormGroup>
        <Label for="No. Kartu Keluarga">No. Kartu Keluarga</Label>
        <Input
          id="no_kk"
          name="no_kk"
          placeholder="No. Kartu Keluarga"
          type="text"
          maxLength={16}
          value={values.no_kk}
          onChange={onChangeHandler('no_kk')}
          invalid={error.no_kk !== undefined}
        />
        { error.no_kk && (<FormDecline text={error.no_kk} />)}
      </FormGroup> */}

      {/* <FormGroup>
        <Label for="kode rak">Kode Rak</Label>
        <Input
          id="id_rak"
          name="id_rak"
          placeholder="Kode Rak"
          type="select"
          value={values.id_rak}
          onChange={onChangeHandler('id_rak')}
          invalid={error.id_rak !== undefined}
        >
          <option value="" hidden>
            Belum Dipilih
          </option>
          {dataRak.map((item) => (
            <option key={item.id_rak} value={item.id_rak}>
              {item.kode_rak}
            </option>
          ))}

        </Input>
        { error.id_rak && (<FormDecline text={error.id_rak} />)}
      </FormGroup> */}

    </Form>

  );
}

export default FormInput;
