/* eslint-disable max-len */
/* eslint-disable no-use-before-define */
/* eslint-disable react/prop-types */
/* eslint-disable react/destructuring-assignment */
import React, {
  useEffect, useState, useCallback, useMemo,
} from 'react';
import DataTable from 'react-data-table-component';
import { Button } from 'reactstrap';
import { useSelector } from 'react-redux';
import * as yup from 'yup';
import { useNavigate } from 'react-router-dom';
import { confirmationMessage, successfullyMessage } from '../../../utils/CONSTANT';
import { dateConvert, swalCallback, swalConfirmation } from '../../../utils/functionHelper';
import {
  deleteDokter, getAllDokter, postDokter, putDokter,
} from '../../../utils/http';
import SearchBar from '../components/SearchBar';
// import Select from 'react-select'
import FormModal from './components/FormModal';
import DetailModal from '../components/DetailModal';

import useRekamMedis from './customHooks/useRekamMedis';
import SpinnerComponents from '../../../components/SpinnerComponents';
import CustomAlert from '../../../components/Alert';
import { datatableStyle } from '../../../utils/customStyles';

function RekamMedis() {
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
    dataRak,
    fetchDataRak,
    onCloseFormModal,
    onCloseDetailModal,
    onSubmitEditHandler,
    onClickDeleteHandler,
    onClickShowFormHandler,
    dataFiltered,
    dataRekamMedis,
    dataKartuKeluarga,
    setDataRekamMedis,
    isShowFormModal,
    setIsShowFormModal,
    isShowDetailModal,
    setIsShowDetailModal,
    formField,
    setFormField,
    stateUser,
    fetchData,
    fetchDataKartuKeluarga,
    isLoading,
    alertValue,
    setAlertValue,
  } = useRekamMedis();
  const renderActionButton = (row) => (
    <div className="d-flex gap-1">
      <Button color="secondary" size="sm" onClick={() => { onClickDetailShowHandler(row); }} id={row.ID}>Info</Button>

      <Button
        color="primary"
        size="sm"
        onClick={() => {
          // console.log(props);
          navigate('/main/detail-rekam-medis', { state: { id: row.no_rm } });
        }}
        id={row.ID}
      >
        Detail

      </Button>
      {/* <Button color="danger" size="sm" onClick={() => { onClickDeleteHandler(row); }} id={row.ID}>Hapus</Button> */}
    </div>
  );

  const columns = [
    {
      id: 'no',
      name: 'No.',
      selector: (row, index) => index + 1,
      minWidth: '80px',
    },
    {
      id: 'no_rm',
      name: 'Nomor Rekam Medis',
      selector: (row) => row.no_rm,
      sortable: true,
      minWidth: '200px',
    },
    {
      id: 'no_kk',
      name: 'No. Kartu Keluarga',
      selector: (row) => row.no_kk,
      sortable: true,
      minWidth: '200px',
    },

    {
      id: 'created_at',
      name: 'Created At',
      selector: (row) => dateConvert(row.created_at),
      sortable: true,

      minWidth: '180px',
    },
    {
      id: 'updated_at',
      name: 'Updated At',
      selector: (row) => dateConvert(row.updated_at),
      sortable: true,

      minWidth: '180px',
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
      dataKartuKeluarga={dataKartuKeluarga}
      dataRak={dataRak}
      onClose={onCloseFormModal}
      setIsShow={() => setIsShowFormModal(!isShowFormModal)}
    />
  ), [isShowFormModal, formField, isEdit, dataRak, dataKartuKeluarga]);
  const detailModalComponent = useMemo(() => (
    <DetailModal
      isShow={isShowDetailModal}
      onClickEditHandler={onClickShowFormHandler}
      setIsShow={setIsShowDetailModal}
      data={formField}
      title="Informasi Dokumen RM"
      onToggleHandler={onCloseDetailModal}
    />
  ), [isShowDetailModal]);
  return (
    <div className="main-content">
      <h3>
        Dokumen RM
      </h3>
      <CustomAlert
        isOpen={alertValue.isOpen}
        color={alertValue.color}
        text={alertValue.text}
        onDismiss={() => setAlertValue({ isOpen: false, color: 'danger' })}
      />
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
      {modalComponent}
      {detailModalComponent}

    </div>
  );
}

export default RekamMedis;
