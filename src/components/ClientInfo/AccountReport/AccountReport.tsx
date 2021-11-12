import React, { ReactElement } from 'react';
import "./AccountReport.sass";


export function AccountReport(): ReactElement {


  return (
    <div className="containerReportAccount">
      <div className="reportAccountBtn">
        New Test
      </div>
      <div className="reportAccountTestTime">

        <div>March 12, 2020</div>
        <div>February 14, 2020</div>
        <div>January 13, 2020</div>

      </div>
    </div>

  )
};
