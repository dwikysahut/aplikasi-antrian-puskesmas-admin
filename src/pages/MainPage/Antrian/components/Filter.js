/* eslint-disable eqeqeq */
/* eslint-disable react/prop-types */
import React from 'react';

import { Link } from 'react-router-dom';
import {
  Button, Modal, ModalHeader, ModalBody, ModalFooter, FormGroup, Label, Input,
} from 'reactstrap';
import { Formik } from 'formik';
import FormInput from './FormInput';
import '../styles/Antrian.css';

function Filter({
  onChangeHandler, dataPraktek, value, onSubmitFilter, onResetHandler,
}) {
  return (
    <div className="filter-wrapper">
      <div className="item-wrapper">

        <Label for="title">Tanggal Periksa</Label>
        <Input
          value={value.tanggal_periksa}
          type="date"
          name="tanggal_periksa"
          placeholder="Tanggal Periksa"
          onChange={onChangeHandler}
        />

      </div>
      <div className="item-wrapper">

        <Label for="title">Poli</Label>
        <Input
          value={value.id_praktek}
          type="select"
          name="id_praktek"
          placeholder="Poli"
          onChange={onChangeHandler}
        >
          <option value="" hidden>
            Belum Dipilih
          </option>
          {dataPraktek
            .sort((a, b) => a.kode_poli.toLowerCase().localeCompare(b.kode_poli.toLowerCase()))
            .map((item) => (
              <option value={item.id_praktek}>
                {item.kode_poli}
                -
                {item.nama_poli}
              </option>
            ))}
        </Input>

      </div>
      <div
        className="item-wrapper"
        style={{
          flex: 1, display: 'flex', flexDirection: 'column',
        }}
      >

        <Button onClick={onResetHandler} className="btn-warning" disabled={value.id_praktek == '' || value.tanggal_periksa == ''}>
          Reset
        </Button>
        <Button onClick={onSubmitFilter} disabled={value.id_praktek == '' || value.tanggal_periksa == ''}>
          Submit
        </Button>

      </div>
    </div>

  );
}

export default Filter;
