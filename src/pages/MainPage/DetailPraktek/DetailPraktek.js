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
// import Select from 'react-select'
import FormModal from './components/FormModal';
import DetailModal from './components/DetailModal';

import SpinnerComponents from '../../../components/SpinnerComponents';
import CustomAlert from '../../../components/Alert';
import useDetailPraktek from './customHooks/useDetailPraktek';
import FilterData from '../components/FilterData';
import { datatableStyle } from '../../../utils/customStyles';

function DetailPraktek() {
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
    onChangeFilterDataPraktek,
    onCloseFormModal,
    onCloseDetailModal,
    onSubmitEditHandler,
    onClickDeleteHandler,
    dataDokter,
    fetchDataPraktek,
    fetchDataDokter,
    filterDataPraktek,
    dataPraktek,
    onClickShowFormHandler,
    dataFiltered,
    dataPoli,
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
  } = useDetailPraktek();
  const renderActionButton = (row) => (
    <div className="d-flex gap-1">
      <Button size="sm" color="secondary" onClick={() => { onClickDetailShowHandler(row); }} id={row.ID}>Info</Button>
      {/* <Button size="sm" onClick={() => { }} id={row.ID}>Detail</Button> */}
      <Button color="warning" size="sm" onClick={() => { onClickEditHandler(row); }} id={row.ID}>Edit</Button>
      <Button color="danger" size="sm" onClick={() => { onClickDeleteHandler(row); }} id={row.ID}>Delete</Button>
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
      id: 'id_praktek',
      name: 'ID Praktek',
      selector: (row) => row.id_praktek,
      sortable: true,
      minWidth: '200px',
    },
    {
      id: 'nama_dokter',
      name: 'Nama Dokter',
      selector: (row) => row.nama_dokter,
      sortable: true,
      minWidth: '200px',
    },

    {
      id: 'nama_poli',
      name: 'Nama Poli',
      selector: (row) => row.nama_poli,
      sortable: true,
      minWidth: '200px',
    },
    {
      id: 'hari_praktek',
      name: ' Hari Praktek',
      selector: (row) => row.hari_praktek,
      sortable: true,
      minWidth: '200px',
    },
    {
      id: 'jam_praktek',
      name: 'Jam Praktek',
      selector: (row) => row.jam_praktek,
      sortable: true,
      minWidth: '200px',
    },
    {
      id: 'status_operasional',
      name: 'Status Operasional',
      selector: (row) => (row.status_operasional === 0 ? 'Tidak Aktif' : 'Aktif'),

      sortable: true,
      minWidth: '200px',
    },

    {
      id: 'created_at',
      name: 'Created At',
      selector: (row) => dateConvert(row.created_at),
      sortable: true,

      minWidth: '200px',
    },
    {
      id: 'updated_at',
      name: 'Updated At',
      selector: (row) => dateConvert(row.updated_at),
      sortable: true,

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
      dataDokter={dataDokter}
      onClose={onCloseFormModal}
      setIsShow={() => setIsShowFormModal(!isShowFormModal)}
    />
  ), [isShowFormModal, formField, isEdit, dataPoli]);
  const detailModalComponent = useMemo(() => (
    <DetailModal
      isShow={isShowDetailModal}
      onClickEditHandler={onClickShowFormHandler}
      setIsShow={setIsShowDetailModal}
      data={formField}
      title="Informasi Detail Praktek"
      onToggleHandler={onCloseDetailModal}
    />
  ), [isShowDetailModal]);
  console.log(filterDataPraktek);
  return (
    <div className="main-content">
      <h3>
        Data Detail Praktek
      </h3>
      <CustomAlert
        isOpen={alertValue.isOpen}
        color={alertValue.color}
        text={alertValue.text}
        onDismiss={() => setAlertValue({ isOpen: false, color: 'danger' })}
      />
      <FilterData
        data={dataPraktek}
        onChangeHandler={onChangeFilterDataPraktek}
        filterValue={filterDataPraktek}
        title="Pilih ID Praktek"
        dataKey="id_praktek"
        value="nama_poli"
      />

      {filterDataPraktek !== ''
        ? (
          <>
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
          </>
        )
        : <></>}

      {modalComponent}
      {detailModalComponent}

    </div>
  );
}

export default DetailPraktek;
