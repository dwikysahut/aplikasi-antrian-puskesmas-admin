/* eslint-disable max-len */
/* eslint-disable no-use-before-define */
/* eslint-disable react/prop-types */
/* eslint-disable react/destructuring-assignment */
import React, {
  useEffect, useState, useCallback, useMemo,
} from 'react';
import DataTable from 'react-data-table-component';
import { Button } from 'reactstrap';
import { useNavigate } from 'react-router-dom';
import * as yup from 'yup';
import SelectComponent from '../components/SelectComponent';
import { confirmationMessage, successfullyMessage } from '../../../utils/CONSTANT';
import {
  dateConvert, dateOnlyConvert, swalCallback, swalConfirmation,
} from '../../../utils/functionHelper';

import SearchBar from '../components/SearchBar';
// import Select from 'react-select'
import FormModal from './components/FormModal';
import DetailModal from './components/DetailModal';

import useDetailAntrian from './customHooks/useDetailAntrian';
import SpinnerComponents from '../../../components/SpinnerComponents';
import CustomAlert from '../../../components/Alert';
import FilterDataSelect from '../components/FilterDataSelect';
import { datatableStyle } from '../../../utils/customStyles';

function DetailAntrian() {
  const navigate = useNavigate();
  const {
    filterText,
    setFilterText,
    isEdit,
    setIsEdit,
    resetPaginationToggle,
    setResetPaginationToggle,
    formValidationSchema,
    onClickTambahHandler,
    onClickEditHandler,
    onClickDetailShowHandler,
    onSubmitTambahHandler,
    onCloseFormModal,
    onCloseDetailModal,
    onSubmitEditHandler,
    onClickDeleteHandler,
    onClickShowFormHandler,
    setFilterDataAntrian,
    filterDataAntrian,
    dataFiltered,
    dataAntrian,
    isShowFormModal,
    setIsShowFormModal,
    isShowDetailModal,
    setIsShowDetailModal,
    formField,
    setFormField,
    stateUser,
    fetchData,
    fetchDataPoli,
    isLoading,
    alertValue,
    setAlertValue,
  } = useDetailAntrian();
  const renderActionButton = (row) => (
    <div className="d-flex gap-1">
      <Button color="secondary" size="sm" onClick={() => { onClickDetailShowHandler(row); }} id={row.ID}>Info</Button>

      {/* <Button color="warning" size="sm" onClick={() => { onClickEditHandler(row); }} id={row.ID}>Edit</Button> */}
    </div>
  );

  const renderStatus = (row) => (

    row.status_operasional == 1
      ? (
        <Button size="md" style={{ width: '100px' }} disabled color="success">
          Buka
        </Button>
      )
      : (
        <Button size="md" style={{ width: '100px' }} disabled color="danger">
          Tutup
        </Button>
      )

  );

  const columns = [
    {
      id: 'no',
      name: 'No.',
      selector: (row, index) => index + 1,
      minWidth: '100px',
    },
    {
      id: 'id_detail_antrian',
      name: 'ID Detail Antrian',
      selector: (row) => row.id_detail_antrian,
      sortable: true,
      omit: true,
      minWidth: '200px',
    },
    {
      id: 'id_antrian',
      name: 'ID Antrian',
      selector: (row) => row.id_antrian,
      sortable: true,
      minWidth: '200px',
    },
    {
      id: 'nomor_antrian',
      name: 'Nomor Antrian',
      selector: (row) => row.nomor_antrian,
      sortable: true,
      minWidth: '150px',

    },
    {
      id: 'nama_tahap_pelayanan',
      name: 'Tahap Pelayanan',
      selector: (row) => row.nama_tahap_pelayanan,
      sortable: true,
      minWidth: '200px',
    },
    {
      id: 'waktu_mulai_pelayanan',
      name: 'Waktu Mulai Pelayanan',
      selector: (row) => row.waktu_mulai_pelayanan,
      omit: true,
      minWidth: '150px',
    },
    {
      id: 'waktu_selesai_pelayanan',
      name: 'Waktu Selesai Pelayanan',
      selector: (row) => row.waktu_selesai_pelayanan,
      omit: true,
      minWidth: '200px',
    },
    {
      id: 'nama',
      name: 'Nama Pasien',
      selector: (row) => row.email,
      sortable: true,
      omit: true,
      minWidth: '150px',
    },
    {
      id: 'poli_tujuan',
      name: 'Poli Tujuan',
      selector: (row) => row.nama_poli,
      sortable: true,
      omit: true,
      minWidth: '200px',
    },
    {
      id: 'tanggal_periksa',
      name: 'Tanggal Kunjungan',
      selector: (row) => dateOnlyConvert(row.tanggal_periksa),

      sortable: true,
      minWidth: '200px',
    },
    {
      id: 'created_at',
      name: 'Created At',
      selector: (row) => dateConvert(row.created_at),
      sortable: true,
      omit: true,
      minWidth: '200px',
    },
    {
      id: 'updated_at',
      name: 'Updated At',
      selector: (row) => dateConvert(row.updated_at),
      sortable: true,
      omit: true,
      minWidth: '200px',
    },

    {
      name: 'Aksi',
      cell: (row) => renderActionButton(row),
      ignoreRowClick: true,
      allowOverflow: true,
      button: true,
      minWidth: '200px',
    },
  ];

  const optionsAntrian = dataAntrian.map((item) => ({
    label: item.id_antrian,
    value: item.id_antrian,
  }));
  const subHeaderComponent = useMemo(() => {
    const onClearHandler = () => {
      if (filterText) {
        setFilterText('');
        setResetPaginationToggle(!resetPaginationToggle);
      }
    };
    return (
      <SearchBar
        filterValue={filterText}
        onChangeHandler={(e) => setFilterText(e.target.value)}
        onResetHandler={onClearHandler}
      />
    );
  }, [filterText]);

  const modalComponent = useMemo(() => (
    <FormModal
      formValidationSchema={formValidationSchema}
      form={formField}
      isShow={isShowFormModal}
      onSubmitTambahHandler={onSubmitTambahHandler}
      onSubmitEditHandler={onSubmitEditHandler}
      isEdit={isEdit}
      onClose={onCloseFormModal}
      setIsShow={() => setIsShowFormModal(!isShowFormModal)}
    />
  ), [isShowFormModal, formField, isEdit]);
  const detailModalComponent = useMemo(() => (
    <DetailModal
      isShow={isShowDetailModal}
      onClickEditHandler={onClickShowFormHandler}
      setIsShow={setIsShowDetailModal}
      data={formField}
      title="Informasi Detail Antrian"
      onToggleHandler={onCloseDetailModal}
    />
  ), [isShowDetailModal]);
  return (
    <div className="main-content">
      <h3>
        Data Antrian
      </h3>
      <CustomAlert
        isOpen={alertValue.isOpen}
        color={alertValue.color}
        text={alertValue.text}
        onDismiss={() => setAlertValue({ isOpen: false, color: 'danger' })}
      />
      <FilterDataSelect
        onChangeHandler={setFilterDataAntrian}
        options={optionsAntrian}
        title="Pilih ID Antrian"
        value={filterDataAntrian}
      />
      {filterDataAntrian
      && (
      <>
        {/* <Button onClick={onClickTambahHandler} size="sm" style={{ marginTop: '20px', backgroundColor: 'darkslategray' }}>Tambah</Button> */}

        <DataTable
          columns={columns}
          data={dataFiltered}
          subHeader
          subHeaderComponent={subHeaderComponent}
          pagination
          customStyles={datatableStyle}
          paginationResetDefaultPage={resetPaginationToggle}
          progressPending={isLoading}
        />
      </>
      )}
      {modalComponent}
      {detailModalComponent}

    </div>
  );
}

export default DetailAntrian;
