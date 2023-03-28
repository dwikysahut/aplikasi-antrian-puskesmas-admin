import React from 'react';
import {
  Button, Modal, ModalHeader, ModalBody, ModalFooter,
} from 'reactstrap';

function ButtonColumn({
  isShow, onToggleHandler, data, onClickEditHandler, setIsShow,
  onUpdateStatusHadirHandler, onUpdateStatusAntrianHandler,
  panggilHandler,
}) {
  console.log(data);
  const renderButtonProccesAntrian = (row) => {
    if (row.status_antrian == 1) {
      return (
        <Button
          className="btn-action w-100"
          color="warning"
          size="sm"
          onClick={() => {
            setIsShow(!isShow);
            onUpdateStatusAntrianHandler(false, row.id_antrian, row.status_antrian + 1, (item) => {
              onClickEditHandler(item);
            });
          }}
          id={row.ID}
        >
          Proses Dokumen
        </Button>
      );
    }
    if (row.status_antrian == 2) {
      return (
        <>
          <Button
            className="btn-action w-100"
            color="warning"
            size="sm"
            onClick={() => {
              setIsShow(!isShow);
              onClickEditHandler(row);
            }}
            id={row.ID}
          >
            Proses
          </Button>
          <Button
            className="btn-action w-100"
            color="dark"

            size="sm"
            onClick={() => {
            // eslint-disable-next-line react/prop-types
              panggilHandler('loket', row);
            }}
          >
            Panggil
          </Button>
        </>
      );
    }
    if (row.status_antrian == 3) {
      if (row.status_hadir == 1) {
        return (
          <>
            <Button
              className="btn-action w-100"
              color="warning"
              size="sm"
              onClick={() => {
                onUpdateStatusAntrianHandler(true, row.id_antrian, row.status_antrian + 1);
              }}
              id={row.ID}
            >
              Konfirmasi pembayaran

            </Button>
            {/* <Button
              className="btn-action w-100"
              color="danger"
              outline
              size="sm"
              onClick={() => {
                onUpdateStatusAntrianHandler(true, row.id_antrian, 7);
              }}
              id={row.ID}
            >
              Lewati

            </Button> */}
          </>
        );
      }
      return (<></>
      // <Button
      //   className="btn-action w-100"
      //   color="danger"
      //   size="sm"
      //   onClick={() => {
      //     onUpdateStatusAntrianHandler(true, row.id_antrian, 7);
      //   }}
      //   id={row.ID}
      // >
      //   Lewati
      // </Button>
      );
    }
    if (row.status_antrian == 4 && row.status_hadir == 1) {
      return (
        <>
          <Button className="btn-action w-100" color="dark" size="sm" onClick={() => { panggilHandler('poli', row); }} id={row.ID}>Panggil</Button>
          <Button className="btn-action w-100" color="warning" size="sm" onClick={() => { onUpdateStatusAntrianHandler(true, row.id_antrian, row.status_antrian + 1); }} id={row.ID}>Update Status Antrian</Button>
          {/* <Button
            className="btn-action w-100"
            color="danger"
            outline
            size="sm"
            onClick={() => {
              onUpdateStatusAntrianHandler(true, row.id_antrian, 7);
            }}
            id={row.ID}
          >
            Lewati

          </Button> */}
        </>
      );
    }
    if ((row.status_antrian == 5) && row.status_hadir == 1) {
      return (
        <Button
          className="btn-action w-100"
          color="success"
          size="sm"
          onClick={() => {
            onUpdateStatusAntrianHandler(true, row.id_antrian, row.status_antrian + 1);
          }}
          id={row.ID}
        >
          Selesai
        </Button>
      );
    }
    if ((row.status_antrian == 6) && row.status_hadir == 1) {
      return <Button className="btn-action w-100" outline disabled color="secondary" size="sm" onClick={() => {}} id={row.ID}>Selesai</Button>;
    }
  };

  const renderButtonKehadiranAntrian = (row) => {
    if (row.status_hadir == 0 && row.status_antrian < 4) {
      return (
        <>
          <h4 className="center" style={{ fontSize: '0.8rem' }}>
            Verifikasi Kehadiran

          </h4>
          <div className="d-flex w-100 justify-content-center gap-2 border-bottom">

            <Button className="btn-action" style={{ flex: 1 }} outline color="success" size="sm" onClick={() => { onUpdateStatusHadirHandler(true, row.id_antrian, 1); }} id={row.ID}>Hadir</Button>
            <Button className="btn-action" style={{ flex: 1 }} outline color="danger" size="sm" onClick={() => { onUpdateStatusHadirHandler(true, row.id_antrian, 2); }} id={row.ID}>Tidak Hadir</Button>
          </div>
        </>
      );
    }
  };

  return (

    <Modal
      isOpen={isShow}
      toggle={onToggleHandler}
      centered
    >
      <ModalHeader toggle={onToggleHandler}>Aksi</ModalHeader>
      <ModalBody style={{ }}>
        {renderButtonKehadiranAntrian(data)}
        <div className="d-flex flex-column px-2">
          {renderButtonProccesAntrian(data)}
          {data.status_antrian > 4
            ? <></>
            : (
              <Button
                className="btn-action w-100"
                color="danger"
                outline
                size="sm"
                onClick={() => {
                  // eslint-disable-next-line react/prop-types
                  onUpdateStatusAntrianHandler(true, data.id_antrian, 7);
                }}
              >
                Batal
              </Button>
            )}

        </div>

      </ModalBody>
      <ModalFooter>

        <Button
          outline
          className="w-20 mt-3"
          onClick={onToggleHandler}
        >
          Close

        </Button>
      </ModalFooter>

    </Modal>

  );
}
export default ButtonColumn;
