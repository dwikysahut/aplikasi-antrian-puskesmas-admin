/* eslint-disable max-len */
/* eslint-disable no-use-before-define */
/* eslint-disable react/prop-types */
/* eslint-disable react/destructuring-assignment */
import React, {
  useEffect, useMemo,
} from 'react';
import DataTable from 'react-data-table-component';
import { Button } from 'reactstrap';
import { dateConvert } from '../../../utils/functionHelper';

import SearchBar from '../components/SearchBar';
// import Select from 'react-select'
import FormModal from './components/FormModal';
import DetailModal from './components/DetailModal';

import CustomAlert from '../../../components/Alert';
import useDetailRekamMedis from './customHooks/useDetailRekamMedis';
import FilterData from '../components/FilterData';
import { datatableStyle } from '../../../utils/customStyles';
import FilterDataSelect from '../components/FilterDataSelect';

function DetailRekamMedis() {
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
    dataRekamMedis,
    dataRak,
    dataPasien,
    isLoading,
    alertValue,
    setAlertValue,
    filterDataRekamMedis,
    onChangeFilterDataRekamMedis,
  } = useDetailRekamMedis();
  const renderActionButton = (row) => (
    <div className="d-flex gap-1">
      <Button color="secondary" size="sm" onClick={() => { onClickDetailShowHandler(row); }} id={row.ID}>Info</Button>
      {/* <Button size="sm" onClick={() => { }} id={row.ID}>Detail</Button> */}
      <Button color="warning" size="sm" onClick={() => { onClickEditHandler(row); }} id={row.ID}>Edit</Button>
      <Button color="danger" size="sm" onClick={() => { onClickDeleteHandler(row); }} id={row.ID}>Delete</Button>
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
      id: 'id_detail_rekam_medis',
      name: 'ID Detail RM',
      selector: (row) => row.id_detail_rekam_medis,
      omit: true,
      sortable: true,
      minWidth: '200px',
    },
    {
      id: 'no_rm',
      name: 'No. RM',
      selector: (row) => row.no_rm,
      sortable: true,
      minWidth: '200px',
    },
    {
      id: 'no_kk',
      name: 'No. KK',
      selector: (row) => row.no_kk,
      sortable: true,
      minWidth: '200px',
    },
    {
      id: 'nik',
      name: 'NIK',
      selector: (row) => row.nik,
      sortable: true,
      minWidth: '200px',
    },
    {
      id: 'kode_rak',
      name: 'Kode Rak',
      selector: (row) => row.kode_rak,
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
  const optionsRekamMedis = dataRekamMedis.map((item) => ({
    label: item.no_rm,
    value: item.no_rm,
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
      dataRak={dataRak}
      dataPasien={dataPasien}
      onClose={onCloseFormModal}
      setIsShow={() => setIsShowFormModal(!isShowFormModal)}
    />
  ), [isShowFormModal, formField, isEdit, dataRak, dataPasien]);
  const detailModalComponent = useMemo(() => (
    <DetailModal
      isShow={isShowDetailModal}
      onClickEditHandler={onClickShowFormHandler}
      setIsShow={setIsShowDetailModal}
      data={formField}
      title="Informasi Detail RM"
      onToggleHandler={onCloseDetailModal}
    />
  ), [isShowDetailModal]);

  return (
    <div className="main-content">
      <h3>
        Detail Dokumen RM
      </h3>
      <CustomAlert
        isOpen={alertValue.isOpen}
        color={alertValue.color}
        text={alertValue.text}
        onDismiss={() => setAlertValue({ isOpen: false, color: 'danger' })}
      />
      <FilterDataSelect
        onChangeHandler={onChangeFilterDataRekamMedis}
        options={optionsRekamMedis}
        value={filterDataRekamMedis}
      />

      {filterDataRekamMedis !== ''
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

export default DetailRekamMedis;
