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
import { confirmationMessage, successfullyMessage } from '../../../utils/CONSTANT';
import { dateConvert, swalCallback, swalConfirmation } from '../../../utils/functionHelper';

import SearchBar from '../components/SearchBar';

import FormModal from './components/FormModal';

import useDokter from './customHooks/useDokter';
import SpinnerComponents from '../../../components/SpinnerComponents';
import CustomAlert from '../../../components/Alert';
import DetailModal from '../components/DetailModal';
import { datatableStyle } from '../../../utils/customStyles';

function Dokter() {
  const {
    filterText,
    setFilterText,
    isEdit,
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
    dataFiltered,
    isShowFormModal,
    setIsShowFormModal,
    isShowDetailModal,
    setIsShowDetailModal,
    formField,
    fetchData,
    isLoading,
    alertValue,
    setAlertValue,
  } = useDokter();
  const renderActionButton = (row) => (
    <div className="d-flex gap-1">
      <Button color="secondary" size="sm" onClick={() => { onClickDetailShowHandler(row); }} id={row.ID}>Info</Button>
      <Button color="warning" size="sm" onClick={() => { onClickEditHandler(row); }} id={row.ID}>Edit</Button>
      <Button color="danger" size="sm" onClick={() => { onClickDeleteHandler(row); }} id={row.ID}>Hapus</Button>
    </div>
  );

  const columns = [
    // {
    //   id: 'no',
    //   name: 'No.',
    //   selector: (row) => row.no,
    //   sortable: true,
    //   width: '150px',
    // },
    {
      id: 'id_dokter',
      name: 'ID Dokter',
      selector: (row) => row.id_dokter,
      sortable: true,
      width: '150px',
    },
    {
      id: 'nama_dokter',
      name: 'Nama Dokter',
      selector: (row) => row.nama_dokter,
      sortable: true,
      width: '200px',
    },
    {
      id: 'no_telepon',

      name: 'No. Telepon',
      selector: (row) => row.no_telepon,
      sortable: true,
      width: '200px',
    },
    {
      id: 'alamat',
      name: 'Alamat',
      selector: (row) => row.alamat,
      sortable: true,
      minWidth: '200px',
    },
    {
      id: 'jenis_kelamin',
      name: 'Jenis Kelamin',
      selector: (row) => row.jenis_kelamin,
      sortable: true,
      omit: true,
      width: '150px',
    },
    {
      id: 'created_at',
      name: 'Created At',
      selector: (row) => dateConvert(row.created_at),
      sortable: true,
      minWidth: '200px',
      omit: true,

    },
    {
      id: 'updated_at',
      name: 'Updated At',
      selector: (row) => dateConvert(row.updated_at),
      width: '200px',
      sortable: true,
      omit: true,
    },
    {
      name: 'Aksi',
      cell: (row) => renderActionButton(row),
      ignoreRowClick: true,
      allowOverflow: true,
      button: true,
      width: '200px',
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
      title="Informasi Dokter"
      onToggleHandler={onCloseDetailModal}
    />
  ), [isShowDetailModal]);
  return (
    <div className="main-content">
      <h3>
        Dokter
      </h3>
      <CustomAlert
        isOpen={alertValue.isOpen}
        color={alertValue.color}
        text={alertValue.text}
        onDismiss={() => setAlertValue({ isOpen: false, color: 'danger', text: 'Oops.. Something Wrong' })}
      />
      <Button onClick={onClickTambahHandler} size="sm" style={{ marginTop: '20px', backgroundColor: 'darkslategray' }}>Tambah</Button>

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

export default Dokter;
