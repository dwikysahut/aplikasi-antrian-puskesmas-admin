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
import { confirmationMessage, successfullyMessage } from '../../../utils/CONSTANT';
import { dateConvert, swalCallback, swalConfirmation } from '../../../utils/functionHelper';

import SearchBar from '../components/SearchBar';
// import Select from 'react-select'
import FormModal from './components/FormModal';
import DetailModal from './components/DetailModal';
import usePraktek from './customHooks/usePraktek';
import SpinnerComponents from '../../../components/SpinnerComponents';
import CustomAlert from '../../../components/Alert';
import { datatableStyle } from '../../../utils/customStyles';
import QRModal from './components/ModalQRCode';

function Praktek() {
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
    onClickQRModalHandler,
    isShowQRModal,
    setIsShowQRModal,
  } = usePraktek();
  const renderActionButton = (row) => (
    <div className="d-flex gap-1">
      <Button color="secondary" size="sm" onClick={() => { onClickDetailShowHandler(row); }} id={row.ID}>Info</Button>

      <Button
        color="primary"
        size="sm"
        onClick={() => {
          // console.log(props);
          navigate('/main/detail-praktek', { state: { id: row.id_praktek } });
        }}
        id={row.ID}
      >
        Detail

      </Button>
      <Button color="warning" size="sm" onClick={() => { onClickEditHandler(row); }} id={row.ID}>Edit</Button>
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
      minWidth: '80px',
    },
    {
      id: 'id_praktek',
      name: 'ID Praktek',
      selector: (row) => row.id_praktek,
      sortable: true,
      omit: true,
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
      id: 'status_operasional',
      name: 'Status Operasional',
      cell: (row) => renderStatus(row),
      sortable: true,
      minWidth: '180px',
    },
    {
      id: 'total_dokter',
      name: 'Dokter Aktif / Total ',
      selector: (row) => `${row.dokter_tersedia} / ${row.total_dokter} Orang`,

      minWidth: '160px',
    },
    {
      id: 'jumlah_pelayanan',
      name: 'Jumlah Pelayanan',
      selector: (row) => `${row.jumlah_pelayanan} `,
      omit: true,
      minWidth: '110px',
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
      dataPoli={dataPoli}
      onClose={onCloseFormModal}
      setIsShow={() => setIsShowFormModal(!isShowFormModal)}
    />
  ), [isShowFormModal, formField, isEdit, dataPoli]);
  const detailModalComponent = useMemo(() => (
    <DetailModal
      isShow={isShowDetailModal}
      onClickEditHandler={onClickShowFormHandler}
      onGenerateQRCode={onClickQRModalHandler}
      setIsShow={setIsShowDetailModal}
      data={formField}
      title="Informasi Data Praktek"
      onToggleHandler={onCloseDetailModal}
    />
  ), [isShowDetailModal]);
  const qrModalComponent = useMemo(() => (
    <QRModal
      isShow={isShowQRModal}
      onPrintClickHandler={onClickShowFormHandler}
      setIsShow={setIsShowQRModal}
      dataPraktek={formField}
      title="QR Code"
      onToggleHandler={() => setIsShowQRModal(!isShowQRModal)}
    />
  ), [isShowQRModal, formField]);
  return (
    <div className="main-content">
      <h3>
        Data Praktek
      </h3>
      <CustomAlert
        isOpen={alertValue.isOpen}
        color={alertValue.color}
        text={alertValue.text}
        onDismiss={() => setAlertValue({ isOpen: false, color: 'danger' })}
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
      {qrModalComponent}
    </div>
  );
}

export default Praktek;
