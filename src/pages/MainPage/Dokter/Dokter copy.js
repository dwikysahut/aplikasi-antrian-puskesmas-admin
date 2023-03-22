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
import {
  deleteDokter, getAllDokter, postDokter, putDokter,
} from '../../../utils/http';
import SearchBar from '../components/SearchBar';

import FormModal from './components/FormModal';
import DetailModal from './components/DetailModal';

const initialState = {
  id_dokter: '',
  nama_dokter: '',
  no_telepon: '',
  alamat: '',
  jenis_kelamin: '',

};

function Dokter() {
  const [dataDokter, setDataDokter] = useState([]);
  const [isShowFormModal, setIsShowFormModal] = useState(false);
  const [isShowDetailModal, setIsShowDetailModal] = useState(false);
  const [formField, setFormField] = useState({
    id_dokter: '',
    nama_dokter: '',
    no_telepon: '',
    alamat: '',
    jenis_kelamin: '',
  });
  const dataUser = useSelector(({ reducerUser }) => reducerUser.data);
  const [filterText, setFilterText] = React.useState('');
  const [isEdit, setIsEdit] = useState(false);
  const [resetPaginationToggle, setResetPaginationToggle] = React.useState(false);

  const formValidationSchema = yup.object().shape({
    id_dokter: yup.number().required('ID Dokter harus diisi').positive().typeError('ID Dokter harus berisikan angka'),
    nama_dokter: yup.string().required('Nama Dokter harus diisi'),
    no_telepon: yup.string()

      .min(10, ({ min }) => `No. Telepon  minimal ${min} digit`)
      .max(13, ({ max }) => `No.Telepon maksimal ${max} digit`)
      .required('No telepon harus diisi')
      .typeError('Nomor Telepon terdiri dari angka'),
    alamat: yup.string().required('Alamat harus diisi'),
    jenis_kelamin: yup.string().required('Jenis Kelamin harus diisi'),

  });
  const renderActionButton = (row) => (
    <div className="d-flex gap-1">
      <Button size="sm" onClick={() => { onClickDetailShowHandler(row); }} id={row.ID}>Detail</Button>
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
      width: '200px',
    },
    {
      id: 'jenis_kelamin',
      name: 'Jenis Kelamin',
      selector: (row) => row.jenis_kelamin,
      sortable: true,
      width: '200px',
    },
    {
      id: 'created_at',
      name: 'Created At',
      selector: (row) => dateConvert(row.created_at),
      sortable: true,
      width: '200px',
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

  const fetchData = async () => {
    try {
      const response = await getAllDokter(dataUser.token);
      setDataDokter(response.data.data);
    } catch (error) {

    }
  };
  const fillFormField = (row) => {
    setFormField({
      ...row,
      created_at: dateConvert(row.created_at),
      updated_at: dateConvert(row.updated_at),
    });
  };
  const onClickTambahHandler = () => {
    setIsEdit(false);
    setFormField({ ...initialState });
    setIsShowFormModal(!isShowFormModal);
  };

  const onClickEditHandler = (row) => {
    fillFormField(row);

    setIsEdit(true);
    setIsShowFormModal(!isShowFormModal);
  };
  const onClickDetailShowHandler = useCallback((row) => {
    fillFormField(row);
    setIsShowDetailModal(!isShowDetailModal);
  }, [formField, isShowDetailModal]);

  const onSubmitTambahHandler = async (formBody, { resetForm }) => {
    await postDokter(formBody, dataUser.token).then((res) => {
      swalCallback(successfullyMessage.post, 'success');
      resetForm();
      fetchData();
      setIsShowFormModal(!isShowFormModal);
    }).catch((err) => console.log(err));
  };
  const onCloseFormModal = () => {
    setIsShowFormModal(!isShowFormModal);
  };
  const onCloseDetailModal = () => {
    setIsShowDetailModal(!isShowDetailModal);
    setFormField({ ...initialState });
  };
  const onSubmitEditHandler = async (formBody, { resetForm }) => {
    const newFormBody = {
      ...formBody,
    };
    delete newFormBody.id_dokter;
    delete newFormBody.created_at;
    delete newFormBody.updated_at;
    await putDokter(formBody.id_dokter, newFormBody, dataUser.token)
      .then((res) => {
        // swal
        swalCallback(successfullyMessage.edit, 'success');

        resetForm();
        fetchData();
        setIsShowFormModal(!isShowFormModal);
      })
      .catch((err) => console.log(err));
  };
  const onClickDeleteHandler = (row) => {
    swalConfirmation(
      confirmationMessage.confirm,
      async () => {
        await deleteDokter(row.id_dokter, dataUser.token).then(() => {
          swalCallback(successfullyMessage.delete, 'success');
          fetchData();
        }).catch();
      },
    );
  };
  const onClickShowFormHandler = () => {
    setIsEdit(true);
    setIsShowDetailModal(!isShowDetailModal);

    setIsShowFormModal(!isShowFormModal);
  };
  useEffect(() => {
    fetchData();
  }, []);

  const dataFiltered = dataDokter
    .filter(
      (item) => {
        if (item.id_dokter && item.id_dokter.toLowerCase().includes(filterText.toLowerCase())) { return true; }
        if (item.nama_dokter && item.nama_dokter.toLowerCase().includes(filterText.toLowerCase())) { return true; }
        return false;
      },
    );

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
      onToggleHandler={onCloseDetailModal}
    />
  ), [isShowDetailModal]);
  return (
    <div className="main-content">
      <h3>
        Dokter
      </h3>
      <Button onClick={onClickTambahHandler} size="sm" style={{ marginTop: '20px', backgroundColor: 'darkslategray' }}>Tambah</Button>
      <DataTable
        columns={columns}
        data={dataFiltered}
        subHeader
        subHeaderComponent={subHeaderComponent}
        pagination
        paginationResetDefaultPage={resetPaginationToggle}

      />
      {modalComponent}
      {detailModalComponent}

    </div>
  );
}

export default Dokter;
