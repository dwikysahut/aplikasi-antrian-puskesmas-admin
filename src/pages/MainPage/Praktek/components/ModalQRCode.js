/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable eqeqeq */
/* eslint-disable react/prop-types */
import React, { useEffect, useRef } from 'react';
import '../styles/Form.css';
import { Link } from 'react-router-dom';
import {
  Button, Modal, ModalHeader, ModalBody, ModalFooter,
} from 'reactstrap';
// import QRCode from 'react-qr-code';
import { QRCodeSVG } from 'qrcode.react';
import ReactToPrint from 'react-to-print';
import PrintedComponent from './PrintedComponent';

function QRModal({
  isShow, setIsShow, onToggleHandler, onPrintClickHandler, onSubmitEditHandler, dataPraktek,
  formValidationSchema, isEdit, dataPoli,
}) {
  const data = {
    data: {
      status_antrian: 5,
      id_praktek: dataPraktek.id_praktek,
    },
  };

  let componentRef = useRef();
  const canvasRef = useRef(null);

  return (
    <div>

      <Modal
        isOpen={isShow}
        toggle={
          onToggleHandler
        }

      >
        <ModalHeader toggle={onToggleHandler}>QR Code</ModalHeader>
        <ModalBody style={{
          height: '70vh', overflowY: 'scroll', display: 'flex', justifyContent: 'center', flexDirection: 'column',
        }}
        >
          <ReactToPrint
            trigger={() => (

              <Button
                outline
                color="success"
                className="w-100 mt-3 mb-3"
              >
                Cetak

              </Button>

            )}
            content={() => componentRef}
          />
          <div style={{ display: 'none' }}>

            <PrintedComponent ref={(el) => (componentRef = el)} data={data} dataPraktek={dataPraktek} />
          </div>

          {/* <QRCode
            size={256}
            style={{ height: '100%', maxWidth: '100%', width: '100%' }}
            value={data}
          /> */}
          <QRCodeSVG height="100%" width="100%" value={JSON.stringify(data)} />
          ,
        </ModalBody>
        <ModalFooter>

          <Button
            outline
            className="w-20 mt-3"
            onClick={() => {
              onToggleHandler();
            }}
          >
            Cancel

          </Button>
        </ModalFooter>

      </Modal>

    </div>

  );
}

export default QRModal;
