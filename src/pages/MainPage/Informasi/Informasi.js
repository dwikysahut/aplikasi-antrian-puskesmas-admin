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
import { confirmationMessage, successfullyMessage, URL_BASE_IMAGE } from '../../../utils/CONSTANT';
import { dateConvert, swalCallback, swalConfirmation } from '../../../utils/functionHelper';
import SearchBar from '../components/SearchBar';
// import Select from 'react-select'
import FormModal from './components/FormModal';
import DetailModal from '../components/DetailModal';
import SpinnerComponents from '../../../components/SpinnerComponents';
import CustomAlert from '../../../components/Alert';
import useInformasi from './customHooks/useInformasi';
import ImageModal from './components/ImageModal';
import { datatableStyle } from '../../../utils/customStyles';

function Informasi() {
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
    onClickImageShowHandler,
    onCloseFormModal,
    onCloseDetailModal,
    onSubmitEditHandler,
    onClickDeleteHandler,
    onClickShowFormHandler,
    dataFiltered,
    dataKartuKeluarga,
    isShowFormModal,
    setIsShowFormModal,
    isShowDetailModal,
    setIsShowDetailModal,
    formField,
    isShowImageModal,
    setIsShowImageModal,
    fetchData,
    fetchDataKartuKeluarga,
    isLoading,
    alertValue,
    setAlertValue,
    dataImage,
  } = useInformasi();
  const renderActionButton = (row) => (
    <div className="d-flex gap-1">
      <Button color="secondary" size="sm" onClick={() => { onClickDetailShowHandler(row); }} id={row.ID}>Info</Button>
      <Button color="warning" size="sm" onClick={() => { onClickEditHandler(row); }} id={row.ID}>Edit</Button>
      <Button color="danger" size="sm" onClick={() => { onClickDeleteHandler(row); }} id={row.ID}>Hapus</Button>
    </div>
  );
  const renderImage = (row) => (
    <div className="d-flex gap-1">
      <img style={{ width: '100px' }} onClick={() => onClickImageShowHandler(row.gambar)} alt={`gambar-${row.gambar}`} src={`${URL_BASE_IMAGE}/public/image/${row.gambar}`} />
    </div>
  );

  const columns = [
    {
      id: 'no',
      name: 'No.',
      selector: (row, index) => index + 1,
      maxWidth: '80px',

    },
    {
      id: 'id_informasi',
      name: 'ID Informasi',
      selector: (row) => row.id_informasi,
      sortable: true,
      omit: true,
      minWidth: '100px',
    },
    {
      id: 'judul_informasi',
      name: 'Judul',
      selector: (row) => row.judul_informasi,
      sortable: true,
      width: '200px',
    },
    {
      id: 'isi_informasi',
      name: 'Isi',
      selector: (row) => row.isi_informasi,
      sortable: true,
      width: '200px',
    },
    {
      id: 'gambar',
      name: 'Gambar',
      selector: (row) => renderImage(row),
      sortable: true,

      minWidth: '150px',
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
      title="Informasi"
      onToggleHandler={onCloseDetailModal}
    />
  ), [isShowDetailModal]);
  const imageModal = useMemo(() => (
    <Lightbox
      medium={`${URL_BASE_IMAGE}/public/image/${dataImage}`}
      large={`${URL_BASE_IMAGE}/public/image/${dataImage}`}
      alt={dataImage}
      onClose={() => setIsShowImageModal(!isShowImageModal)}
    />
  ), [isShowImageModal]);
  return (
    <div className="main-content">
      <h3>
        Informasi
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

      {isShowImageModal && imageModal}

    </div>
  );
}

export default Informasi;
