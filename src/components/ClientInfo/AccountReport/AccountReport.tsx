import React, { ReactElement, useEffect } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { useActions } from '../../../redux/useActions';
import "./AccountReport.sass";


export function AccountReport(): ReactElement {

  const location = useLocation();
  const splitLocation = location.pathname.split("/");
  const api_key = splitLocation[splitLocation.length - 2];

  const history = useHistory();

  const { dashboardUrl } = useActions();

  useEffect(() => {

  }, [api_key]);


  return (
    <div className="containerReportAccount">
      <div className="reportAccountBtn" onClick={() => history.push(`/${api_key}/start`)}>
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
