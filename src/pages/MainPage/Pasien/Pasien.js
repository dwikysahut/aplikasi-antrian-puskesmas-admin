/* eslint-disable max-len */
/* eslint-disable no-use-before-define */
/* eslint-disable react/prop-types */
/* eslint-disable react/destructuring-assignment */
import React, {
  useMemo,
} from 'react';
import DataTable from 'react-data-table-component';
import { Button } from 'reactstrap';
import { Lightbox } from 'react-modal-image';
import { dateConvert } from '../../../utils/functionHelper';

import SearchBar from '../components/SearchBar';
// import Select from 'react-select'
import FormModal from './components/FormModal';

import usePasien from './customHooks/usePasien';
import CustomAlert from '../../../components/Alert';
import DetailModal from './components/DetailModalPasien';
import { datatableStyle } from '../../../utils/customStyles';

function Pasien() {
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
    onClickImageShowHandler,
    onCloseFormModal,
    onCloseDetailModal,
    isShowImageModal,
    setIsShowImageModal,
    onSubmitEditHandler,
    onClickDeleteHandler,
    onClickShowFormHandler,
    dataFiltered,
    dataRekamMedis,
    dataKartuKeluarga,
    dataImage,
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
    checkNik,
  } = usePasien();
  const renderActionButton = (row) => (
    <div className="d-flex gap-1">
      <Button color="secondary" size="sm" onClick={() => { onClickDetailShowHandler(row); }} id={row.ID}>Info</Button>

      <Button color="warning" size="sm" onClick={() => { onClickEditHandler(row); }} id={row.ID}>Edit</Button>
      <Button color="danger" size="sm" onClick={() => { onClickDeleteHandler(row); }} id={row.ID}>Hapus</Button>
    </div>
  );
  const renderImage = (row) => (
    <div className="d-flex gap-1">
      <img style={{ width: '100px', cursor: 'pointer' }} onClick={() => onClickImageShowHandler(row)} alt={`kartu-identitas-${row.nik}`} src={`${row.url_foto_kartu_identitas}`} />
    </div>
  );

  const columns = [
    {
      id: 'no',
      name: 'No.',
      selector: (row, index) => index + 1,
      width: '80px',
    },
    {
      id: 'nik',
      name: 'NIK',
      selector: (row) => row.nik,
      sortable: true,
      minWidth: '180px',
    },
    {
      id: 'no_kk',
      name: 'No. Kartu Keluarga',
      selector: (row) => row.no_kk,
      sortable: true,
      minWidth: '180px',
    },
    {
      id: 'nama',
      name: 'Nama',
      selector: (row) => row.nama,
      sortable: true,
      minWidth: '200px',
    },
    {
      id: 'ttl',
      name: 'Tempat Tgl Lahir',
      selector: (row) => row.ttl,
      sortable: true,
      minWidth: '200px',
    },
    {
      id: 'jenis_kelamin',
      name: 'Jenis Kelamin',
      selector: (row) => row.jenis_kelamin,
      sortable: true,
      omit: true,
      minWidth: '200px',
    },
    {
      id: 'no_telepon',
      name: 'No. Telepon',
      selector: (row) => row.no_telepon,
      sortable: true,
      omit: true,

      minWidth: '200px',
    },
    {
      id: 'bpjs',
      name: 'BPJS',
      selector: (row) => (row.bpjs === 1 ? 'Ya' : 'Tidak'),
      sortable: true,
      omit: true,
      minWidth: '200px',
    },
    {
      id: 'no_bpjs',
      name: 'No. BPJS',
      selector: (row) => row.nomor_kartu_bpjs,
      sortable: true,
      omit: true,
      minWidth: '200px',
    },
    {
      id: 'url_foto_kartu_identitas',
      name: 'Kartu Identitas',
      cell: (row) => renderImage(row),
      omit: true,

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
      checkNik={checkNik}
      setIsShow={() => setIsShowFormModal(!isShowFormModal)}
    />
  ), [isShowFormModal, formField, isEdit, dataKartuKeluarga]);
  const detailModalComponent = useMemo(() => (
    <DetailModal
      isShow={isShowDetailModal}
      onClickEditHandler={onClickShowFormHandler}
      setIsShow={setIsShowDetailModal}
      onClickImage={onClickImageShowHandler}
      alt={`kartu-identitas-${formField.nik}`}
      data={formField}
      title="Informasi Pasien"
      onToggleHandler={onCloseDetailModal}
    />
  ), [isShowDetailModal, isEdit]);

  const imageModal = useMemo(() => (
    <Lightbox
      medium={dataImage.image}
      large={dataImage.image}
      alt={`kartu-identitas-${dataImage.nik}`}
      onClose={() => setIsShowImageModal(!isShowImageModal)}
    />
  ), [isShowImageModal]);
  return (
    <div className="main-content">
      <h3>
        Pasien
      </h3>
      <CustomAlert
        isOpen={alertValue.isOpen}
        color={alertValue.color}
        text={alertValue.text}
        onDismiss={() => setAlertValue({ isOpen: false })}
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

export default Pasien;
