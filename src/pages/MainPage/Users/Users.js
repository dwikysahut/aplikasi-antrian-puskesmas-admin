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
import { Lightbox } from 'react-modal-image';
import { confirmationMessage, successfullyMessage } from '../../../utils/CONSTANT';
import { dateConvert, swalCallback, swalConfirmation } from '../../../utils/functionHelper';
import SearchBar from '../components/SearchBar';
// import Select from 'react-select'
import FormModal from './components/FormModal';

import useUsers from './customHooks/useUsers';
import SpinnerComponents from '../../../components/SpinnerComponents';
import CustomAlert from '../../../components/Alert';
import DetailModal from './components/DetailModalUser';
import { datatableStyle } from '../../../utils/customStyles';
import TabComponent from './components/TabComponent';

function Users() {
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
    dataUsers,
    dataKartuKeluarga,
    setDataUsers,
    isShowFormModal,
    setIsShowFormModal,
    isShowDetailModal,
    setIsShowDetailModal,
    formField,
    fetchData,
    fetchDataKartuKeluarga,
    isLoading,
    alertValue,
    setAlertValue,
    onClickTabHandler,
    tabValue,

    onClickVerifikasiHandler,
  } = useUsers();
  const renderActionButton = (row) => (
    <div className="d-flex gap-1">
      <Button color="secondary" size="sm" onClick={() => { onClickDetailShowHandler(row); }} id={row.ID}>Info</Button>

      <Button color="warning" size="sm" onClick={() => { onClickEditHandler(row); }} id={row.ID}>Edit</Button>
      <Button color="danger" size="sm" onClick={() => { onClickDeleteHandler(row); }} id={row.ID}>Hapus</Button>
    </div>
  );
  const renderActionButtonVerifikasi = (row) => (
    <div className="d-flex gap-1">
      <Button color="secondary" size="sm" onClick={() => { onClickDetailShowHandler(row); }} id={row.ID}>Info</Button>

      <Button color="success" size="sm" onClick={() => { onClickVerifikasiHandler(row, 1); }} id={row.ID}>Setujui</Button>
      <Button color="danger" size="sm" onClick={() => { onClickVerifikasiHandler(row, 0); }} id={row.ID}>Tolak</Button>
    </div>
  );

  const columns = [
    {
      id: 'no',
      name: 'No.',
      selector: (row, index) => index + 1,
      minWidth: '100px',
    },
    {
      id: 'user_id',
      name: 'User ID',
      selector: (row) => row.user_id,
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
      id: 'email',
      name: 'Email',
      selector: (row) => row.email,
      sortable: true,
      minWidth: '200px',
    },
    {
      id: 'jenis_kelamin',
      name: 'Jenis kelamin',
      selector: (row) => row.jenis_kelamin,
      sortable: true,
      minWidth: '200px',
    },
    {
      id: 'tanggal_lahir',
      name: 'Tanggal Lahir',
      selector: (row) => dateConvert(row.tanggal_lahir),
      sortable: true,
      omit: true,
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
  const columnsVerifikasi = [
    {
      id: 'no',
      name: 'No.',
      selector: (row, index) => index + 1,
      minWidth: '100px',
    },
    {
      id: 'user_id',
      name: 'User ID',
      selector: (row) => row.user_id,
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
      id: 'email',
      name: 'Email',
      selector: (row) => row.email,
      sortable: true,
      minWidth: '200px',
    },
    {
      id: 'jenis_kelamin',
      name: 'Jenis kelamin',
      selector: (row) => row.jenis_kelamin,
      sortable: true,
      minWidth: '200px',
    },
    {
      id: 'tanggal_lahir',
      name: 'Tanggal Lahir',
      selector: (row) => dateConvert(row.tanggal_lahir),
      sortable: true,
      omit: true,
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
      cell: (row) => renderActionButtonVerifikasi(row),
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
      onClose={onCloseFormModal}
      setIsShow={() => setIsShowFormModal(!isShowFormModal)}
    />
  ), [isShowFormModal, formField, isEdit, dataKartuKeluarga]);
  const detailModalComponent = useMemo(() => (
    <DetailModal
      isShow={isShowDetailModal}
      onClickEditHandler={onClickShowFormHandler}
      setIsShow={setIsShowDetailModal}
      data={formField}
      title="Informasi User"
      onToggleHandler={onCloseDetailModal}
    />
  ), [isShowDetailModal]);
  return (
    <div className="main-content">
      <h3>
        User
      </h3>
      <CustomAlert
        isOpen={alertValue.isOpen}
        color={alertValue.color}
        text={alertValue.text}
        onDismiss={() => setAlertValue({ isOpen: false, color: 'danger' })}
      />
      <TabComponent tabValue={tabValue} onClickHandler={onClickTabHandler} />
      {tabValue == 'Verifikasi'
        ? (
          <div>
            <h4
              className="mt-2"
              style={{
                fontSize: '0.9rem',
                color: 'black',
                padding: '8px',
                backgroundColor: 'currentcolor',
                borderRadius: '5px',
              }}
            >

              <bold style={{ color: 'white' }}>Akun Perlu Diverifikasi</bold>
            </h4>

            <DataTable
              columns={columnsVerifikasi}
              data={dataUsers.filter((item) => item.verif_akun == 0 && item.verif_email == 1)}
             // subHeader
             // subHeaderComponent={subHeaderComponent}
              pagination
              customStyles={datatableStyle}
              paginationResetDefaultPage={resetPaginationToggle}
              progressPending={isLoading}
            />
          </div>
        )
        : (
          <div>
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
            {' '}

          </div>
        )}

      {modalComponent}
      {detailModalComponent}

    </div>
  );
}

export default Users;
