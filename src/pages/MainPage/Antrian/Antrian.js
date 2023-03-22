/* eslint-disable no-nested-ternary */
/* eslint-disable max-len */
/* eslint-disable no-use-before-define */
/* eslint-disable react/prop-types */
/* eslint-disable react/destructuring-assignment */
import React, {
  useEffect, useState, useCallback, useMemo,
} from 'react';
import { io } from 'socket.io-client';
import DataTable from 'react-data-table-component';
import { Button } from 'reactstrap';
import { useNavigate } from 'react-router-dom';
import * as yup from 'yup';
import { confirmationMessage, successfullyMessage } from '../../../utils/CONSTANT';
import {
  dateConvert, dateOnlyConvert, swalCallback, swalConfirmation,
} from '../../../utils/functionHelper';

import SearchBar from '../components/SearchBar';
// import Select from 'react-select'
import FormModal from './components/FormModal';
import DetailModal from './components/DetailModal';
import { statusAntrian, statusKehadiran } from '../../../utils/DATA';
import useAntrian from './customHooks/useAntrian';
import SpinnerComponents from '../../../components/SpinnerComponents';
import CustomAlert from '../../../components/Alert';
import { datatableStyle } from '../../../utils/customStyles';
import Filter from './components/Filter';
import ButtonColumn from './components/ButtonColumn';

function Antrian() {
  const navigate = useNavigate();
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
    onFilterResetHandler,
    onClickShowFormHandler,
    dataFiltered,
    dataPasien,
    dataKartuKeluarga,
    dataPraktek,
    dataRak,
    dataAntrian,
    dataDetailRM,
    isShowFormModal,
    setIsShowFormModal,
    isShowDetailModal,
    setIsShowDetailModal,
    formField,
    isLoading,
    alertValue,

    stateFilter,
    onFilterChangeHandler,
    onFilterSubmitHandler,
    setAlertValue,
    checkNik,
    onClickAksiButtonHandler,
    setIsShowButtonModal,
    isShowButtonModal,
    onCloseButtonModal,
    onUpdateStatusAntrianHandler,
    onUpdateStatusHadirHandler,
  } = useAntrian();
  // const renderButtonProccesAntrian = (row) => {
  //   if (row.status_antrian == 1) {
  //     return <Button className="btn-action" color="warning" size="sm" onClick={() => { onClickEditHandler(row); }} id={row.ID}>Proses</Button>;
  //   }
  //   if (row.status_antrian == 2) {
  //     return <Button className="btn-action" color="warning" size="sm" onClick={() => { onClickEditHandler(row); }} id={row.ID}>Proses</Button>;
  //   }
  //   if (row.status_antrian == 3) {
  //     if (row.status_hadir == 1) {
  //       return (
  //         <>
  //           <Button className="btn-action" color="warning" size="sm" onClick={() => { onClickEditHandler(row); }} id={row.ID}>Konfirmasi pembayaran</Button>
  //           <Button className="btn-action" color="danger" outline size="sm" onClick={() => { onClickEditHandler(row); }} id={row.ID}>Lewati</Button>
  //         </>
  //       );
  //     }
  //     return <Button className="btn-action" color="danger" size="sm" onClick={() => { onClickEditHandler(row); }} id={row.ID}>Lewati</Button>;
  //   }
  //   if (row.status_antrian == 4 && row.status_hadir == 1) {
  //     return (
  //       <>
  //         <Button className="btn-action" color="warning" size="sm" onClick={() => { onClickEditHandler(row); }} id={row.ID}>Panggil</Button>
  //         <Button className="btn-action" color="danger" outline size="sm" onClick={() => { onClickEditHandler(row); }} id={row.ID}>Lewati</Button>
  //       </>
  //     );
  //   }
  //   if ((row.status_antrian == 5) && row.status_hadir == 1) {
  //     return <Button className="btn-action" color="success" size="sm" onClick={() => { onClickEditHandler(row); }} id={row.ID}>Selesai</Button>;
  //   }
  //   if ((row.status_antrian == 6) && row.status_hadir == 1) {
  //     return <Button className="btn-action" outline disabled color="secondary" size="sm" onClick={() => { onClickEditHandler(row); }} id={row.ID}>Selesai</Button>;
  //   }

  //   return <Button className="btn-action" outline disabled color="dark" size="sm" onClick={() => { onClickEditHandler(row); }} id={row.ID}>Verifikasi Hadir</Button>;
  // };
  const renderStatusKehadiran = (data) => (
    <div style={{
      display: 'flex', flex: 1, justifyContent: 'center', alignItems: 'center',
    }}
    >
      {data == 0
        ? <p className="m-0"><bold>{statusKehadiran[data]}</bold></p>
        : data == 1
          ? <Button disabled color="success">{statusKehadiran[data]}</Button>
          : <Button disabled color="danger">{statusKehadiran[data]}</Button>}
    </div>
  );
  const renderActionButton = (row) => (
    <div className="d-flex flex-1 justify-content-center w-100 gap-1 ">
      {row.status_antrian != 7
        ? <Button color="dark" size="sm" onClick={() => { onClickAksiButtonHandler(row); }} id={row.ID}>Aksi</Button>
        : <Button color="dark" outline disabled size="sm" onClick={() => {}} id={row.ID}>Aksi</Button>}

      <Button color="secondary" size="sm" onClick={() => { onClickDetailShowHandler(row); }} id={row.ID}>Info</Button>

      <Button
        size="sm"
        color="primary"
        onClick={() => {
          // console.log(props);
          navigate('/main/detail-antrian', { state: { id: row.id_antrian } });
        }}
        id={row.ID}
      >
        Detail
      </Button>

    </div>
  );

  const columns = [
    {
      id: 'no',
      name: 'No.',
      selector: (row, index) => index + 1,
      minWidth: '50px',
    },
    {
      id: 'id_antrian',
      name: 'ID Antrian',
      selector: (row) => row.id_antrian,
      sortable: true,
      omit: true,
      minWidth: '200px',
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
      id: 'poli_tujuan',
      name: 'Poli Tujuan',
      selector: (row) => row.poli_tujuan,
      sortable: true,
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
      id: 'urutan',
      name: 'No. Urut',
      selector: (row) => row.urutan,

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
      id: 'nik',
      name: 'NIK Pasien',
      selector: (row) => row.nik,
      sortable: true,

      minWidth: '200px',
    },
    {
      id: 'nama',
      name: 'Nama Pasien',
      selector: (row) => row.email,
      sortable: true,

      minWidth: '200px',
    },
    {
      id: 'user_id',
      name: 'ID Akun',
      selector: (row) => row.user_id,
      sortable: true,

      minWidth: '100px',
    },

    {
      id: 'prioritas',
      name: 'Prioritas',
      selector: (row) => row.prioritas,

      sortable: true,
      minWidth: '120px',
    },
    {
      id: 'no_kk',
      name: 'Nomor KK',
      selector: (row) => row.no_kk,
      sortable: true,
      minWidth: '200px',
    },
    {
      id: 'status_antrian',
      name: 'Status Antrian',
      selector: (row) => statusAntrian[row.status_antrian - 1],
      sortable: true,
      minWidth: '200px',
    },
    {
      id: 'status_kehadiran',
      name: 'Status Kehadiran',
      cell: (row) => renderStatusKehadiran(row.status_hadir),
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
      name: 'Opsi',
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
      dataPraktek={dataPraktek}
      dataPasien={dataPasien}
      dataRak={dataRak}
      checkNik={checkNik}
      dataKartuKeluarga={dataKartuKeluarga}
      onClose={onCloseFormModal}
      setIsShow={() => setIsShowFormModal(!isShowFormModal)}
    />
  ), [isShowFormModal, formField, isEdit, dataPraktek]);
  const detailModalComponent = useMemo(() => (
    <DetailModal
      isShow={isShowDetailModal}
      onClickEditHandler={onClickShowFormHandler}
      setIsShow={setIsShowDetailModal}
      data={formField}
      title="Informasi Data Antrian"
      onToggleHandler={onCloseDetailModal}
    />
  ), [isShowDetailModal]);
  const buttonModalComponent = useMemo(() => (
    <ButtonColumn
      isShow={isShowButtonModal}
      onClickEditHandler={onClickEditHandler}
      setIsShow={setIsShowButtonModal}
      data={formField}
      onToggleHandler={onCloseButtonModal}
      onUpdateStatusAntrianHandler={onUpdateStatusAntrianHandler}
      onUpdateStatusHadirHandler={onUpdateStatusHadirHandler}
    />
  ), [isShowButtonModal, formField]);
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

      <Filter dataPraktek={dataPraktek} value={stateFilter} onResetHandler={onFilterResetHandler} onChangeHandler={onFilterChangeHandler} onSubmitFilter={onFilterSubmitHandler} />
      <Button onClick={onClickTambahHandler} size="sm" style={{ marginTop: '20px', backgroundColor: 'darkslategray' }}>Tambah</Button>

      <DataTable
        columns={columns}
        data={stateFilter.tanggal_periksa !== '' ? dataFiltered : dataFiltered.sort((a, b) => a.status_antrian - b.status_antrian)}
        subHeader
        subHeaderComponent={subHeaderComponent}
        pagination
        customStyles={datatableStyle}
        paginationResetDefaultPage={resetPaginationToggle}
        progressPending={isLoading}

      />
      <h4 style={{ fontSize: '0.9rem', marginTop: '16px' }}>
        Riwayat Antrian
      </h4>
      <div>
        <DataTable
          columns={columns}
          data={dataAntrian.filter((item) => item.status_antrian > 5)}
          pagination
          customStyles={datatableStyle}
          paginationResetDefaultPage={resetPaginationToggle}
          progressPending={isLoading}
        />
      </div>
      {modalComponent}
      {detailModalComponent}
      {buttonModalComponent}

    </div>
  );
}

export default Antrian;
