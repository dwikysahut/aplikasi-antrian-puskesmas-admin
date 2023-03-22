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
import { poliSelect } from '../../../../utils/DATA';

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
  closeModal, isEdit, dataPraktek, setFieldValue,
}) {
  const optionsData = dataPraktek.map((item) => ({
    label: item.id_praktek,
    value: item.id_praktek,
  }));
  const options = [{ label: '-', value: null }, ...optionsData];
  console.log(options);
  return (

    <Form>
      <FormGroup>
        <Label for="nama_poli">Nama Poli</Label>
        <Input
          id="nama_poli"
          name="nama_poli"
          placeholder="Nama Poli"
          type="select"
          value={values.nama_poli}
          onChange={onChangeHandler('nama_poli')}
          invalid={error.nama_poli !== undefined}
        >
          <option value="" hidden>
            Belum dipilih
          </option>
          {poliSelect.map((item) => (
            <option key={item.nama} value={item.nama}>{item.nama}</option>
          ))}
        </Input>
        { error.nama_poli && (<FormDecline text={error.nama_poli} />)}
      </FormGroup>
      <FormGroup>
        <Label for="kode_poli">Kode Poli</Label>
        <Input
          id="kode_poli"
          name="kode_poli"
          placeholder="Kode Poli"
          type="text"
          value={values.kode_poli}
          onChange={onChangeHandler('kode_poli')}
          invalid={error.kode_poli !== undefined}
        />
        { error.kode_poli && (<FormDecline text={error.kode_poli} />)}
      </FormGroup>

      {/* <FormGroup className="h-100">
        <Label for="id_praktek">ID Praktek</Label>
        <SelectComponent
          customStyles={customStyles}
          data={options}
          onChange={(e) => { setFieldValue('id_praktek', e.value); }}
          name="id_praktek"
          value={values.id_praktek}
        />

        { error.id_praktek && (<FormDecline text={error.id_praktek} />)}
      </FormGroup> */}
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
