/* eslint-disable no-tabs */
/* eslint-disable no-mixed-spaces-and-tabs */
/* eslint-disable no-nested-ternary */
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
import { confirmationMessage, poliColor, successfullyMessage } from '../../../utils/CONSTANT';
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
import TabComponent from './components/TabComponent';
import BoxItem from './components/BoxItem';

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
    isFilterSubmitClicked,

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
    tabValue,
    onClickTabHandler,
    panggilHandler,
    isFirstRender,
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

  const renderPoli = (row) => (

    <Button color="secondary" style={{ background: `${poliColor[row.id_praktek]}`, width: '200px' }} size="sm" disabled id={row.ID}>{row.poli_tujuan}</Button>

  );
  const columns = [
    {
      id: 'no',
      name: 'No.',
      selector: (row, index) => index + 1,
      width: '60px',
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
      cell: (row) => renderPoli(row),
      sortable: true,
      width: '150px',
    },
    {
      id: 'tanggal_periksa',
      name: 'Tgl Kunjungan',
      selector: (row) => dateOnlyConvert(row.tanggal_periksa),

      sortable: true,
      minWidth: '150px',

    },
    {
      id: 'urutan',
      name: 'Urutan',
      selector: (row) => row.urutan,

      sortable: true,
      width: '90px',
    },
    {
      id: 'nomor_antrian',
      name: 'No. Antrian',
      selector: (row) => row.nomor_antrian,
      sortable: true,

      width: '120px',
    },
    {
      id: 'nik',
      name: 'NIK Pasien',
      selector: (row) => row.nik,
      sortable: true,
      omit: true,

      minWidth: '200px',
    },
    {
      id: 'nama',
      name: 'Nama Pasien',
      selector: (row) => row.email,
      sortable: true,
      omit: true,

      minWidth: '200px',
    },
    {
      id: 'user_id',
      name: 'ID Akun',
      selector: (row) => row.user_id,
      sortable: true,
      omit: true,

      minWidth: '100px',
    },

    {
      id: 'prioritas',
      name: 'Prioritas',
      selector: (row) => (row.prioritas == 0 ? 'Biasa' : 'Prioritas'),

      sortable: true,
      width: '100px',
    },
    {
      name: 'Opsi',
      cell: (row) => renderActionButton(row),
      ignoreRowClick: true,
      allowOverflow: true,
      button: true,
      minWidth: '200px',

    },
    {
      id: 'no_kk',
      name: 'Nomor KK',
      selector: (row) => row.no_kk,
      sortable: true,
      minWidth: '200px',
      omit: true,

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
      minWidth: '150px',
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

  ];
  // const conditionalRowStylesFunc = useCallback(() => {
  //   const newArrDataPraktek = dataPraktek;
  //   const colorArr = [];
  //   for (let i = 0; i < newArrDataPraktek.length; i++) {
  //     console.log(newArrDataPraktek[i].nama_poli + poliColor[newArrDataPraktek[i].id_praktek]);
  //     colorArr.push({
  //   		when: (row) => row.id_praktek == newArrDataPraktek[i].id_praktek,
  //         		style: {
  //         			backgroundColor: poliColor[newArrDataPraktek[i].id_praktek],
  //         			color: 'white',
  //         			'&:hover': {
  //         				cursor: 'pointer',
  //         			},
  //         		},

  //   	});
  //   }
  //   return colorArr;
  // }, [dataPraktek]);
  const conditionalRowStylesFunc = useCallback(() => {
    const newArrDataPraktek = dataPraktek;
    const colorArr = [];

    for (let i = 0; i < dataAntrian.length; i++) {
      // console.log(newArrDataPraktek[i].nama_poli + poliColor[newArrDataPraktek[i].id_praktek]);
      colorArr.push({
        when: (row) => row.status_antrian == 4,
        style: {
          background: 'lightgreen',

        },

      });
    }
    for (let i = 0; i < newArrDataPraktek.length; i++) {
      // console.log(newArrDataPraktek[i].nama_poli + poliColor[newArrDataPraktek[i].id_praktek]);
      colorArr.push({
    		when: (row) => row.id_antrian == dataFiltered.filter((item) => item.id_praktek == newArrDataPraktek[i].id_praktek)[0]?.id_antrian && newArrDataPraktek[i].jumlah_pelayanan > 0,
          		style: {
          			background: 'Khaki',

          		},

    	});
    }
    return colorArr;
  }, [dataFiltered, dataPraktek]);
  const conditionalRowStyles = conditionalRowStylesFunc();
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
  const dataAntrianSorted = [...dataFiltered].sort((a, b) => {
    if (a.status_antrian < b.status_antrian) {
      return -1;
    }
    if (b.status_antrian > a.status_antrian) {
      return 1;
    }
    return 0;
  });
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
      panggilHandler={panggilHandler}
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
  const renderBoxPoli = useMemo(() => (
    <BoxItem dataPraktek={dataPraktek} dataAntrian={dataAntrian} />
  ), [dataPraktek, dataAntrian]);
  const buttonModalComponent = useMemo(() => (
    <ButtonColumn
      isShow={isShowButtonModal}
      onClickEditHandler={onClickEditHandler}
      setIsShow={setIsShowButtonModal}
      data={formField}
      panggilHandler={panggilHandler}
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

      {renderBoxPoli}
      <Filter dataPraktek={dataPraktek} value={stateFilter} onResetHandler={onFilterResetHandler} onChangeHandler={onFilterChangeHandler} onSubmitFilter={onFilterSubmitHandler} />

      <TabComponent onClickHandler={onClickTabHandler} tabValue={tabValue} />

      {tabValue == 'List'
        ? (
          <div>
            <Button onClick={onClickTambahHandler} size="sm" style={{ marginTop: '20px', backgroundColor: 'darkslategray' }}>Tambah</Button>

            <DataTable
              columns={columns}
              data={isFilterSubmitClicked ? dataFiltered.filter((item) => item.status_antrian < 6) : []}
              // data={dataFiltered}
              subHeader
              conditionalRowStyles={conditionalRowStyles}
              subHeaderComponent={subHeaderComponent}
              pagination
              customStyles={datatableStyle}
              paginationResetDefaultPage={resetPaginationToggle}
              progressPending={isFirstRender && isLoading}
            />
          </div>

        )
        : (
          <div>
            <h4 style={{ fontSize: '0.9rem', marginTop: '16px' }}>
              Riwayat Antrian
            </h4>

            <DataTable
              columns={columns}
              data={dataAntrian.filter((item) => item.status_antrian > 5)}
              pagination
              customStyles={datatableStyle}
              paginationResetDefaultPage={resetPaginationToggle}
              progressPending={isLoading}
            />
          </div>
        )}

      {modalComponent}
      {detailModalComponent}
      {buttonModalComponent}

    </div>
  );
}

export default Antrian;
