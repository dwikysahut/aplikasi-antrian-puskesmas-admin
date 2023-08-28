/* eslint-disable react/prop-types */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/prefer-stateless-function */
import React from 'react';
import '../styles/PrintedComponent.css';
import { QRCodeSVG } from 'qrcode.react';

import PuskesmasLogo from '../../../../assets/logo-puskesmas-gribig.png';

class PrintedComponent extends React.Component {
  render() {
    return (
      <div className="wrapper-paper">
        <div className="wrapper-inner-print">

          <div className="d-flex flex-column justify-content-center align-items-center">
            <div className="sidebar-image-wrapper">
              <img src={PuskesmasLogo} alt="" />
            </div>
            <div className="qrcode-wrapper">
              <QRCodeSVG height="100%" width="100%" value={JSON.stringify(this.props.data)} />
              <h3>{this.props.dataPraktek.nama_poli}</h3>
            </div>

          </div>
        </div>
        <div className="wrapper-inner-print-bottom" />
        <div className="wrapper-inner-print" />
      </div>
    );
  }
}
export default PrintedComponent;
