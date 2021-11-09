import React, { ReactElement } from 'react';
import "./InfoDevice.sass";


export default function InfoDevice(): ReactElement {

  const today = new Date();

  const time = new Intl.DateTimeFormat("en-US", {
    hour: "numeric",
    minute: "numeric",
  });

  console.log("time", time.format(today));

  return (
    <div className="containerInfoDevice">

        <div className="containerInfoClient">

          <div className="containerAccountIcon">
            <div className="icon"><i className="fas fa-user-alt"/></div>
            <sub className="countClients">+2</sub>
          </div>

          <div className="circleAccountIcon"></div>
          <div className="circleAccountIcon activeCircleAccountIcon"></div>
          <div className="circleAccountIcon"></div>
          <div className="circleAccountIcon"></div>
          <div className="circleAccountIcon"></div>

        </div>

        <div className="containerBatteryTime">

          <div className="bluetooth">
            <svg xmlns="http://www.w3.org/2000/svg" width="19.877" height="28.833" viewBox="0 0 19.877 28.833">
              <path id="Icon_awesome-bluetooth-b" data-name="Icon awesome-bluetooth-b" d="M14.437,14.643l6.85-5.819L10.491,0V11.62L4.123,6.77,1.8,8.539l7.991,6.1L1.8,20.748l2.323,1.769,6.368-4.849.2,11.166,10.986-8.371-7.241-5.819Zm3.022-5.8-3.7,2.815-.025-5.648Zm-3.7,8.786,3.7,2.815-3.721,2.834.025-5.648Z" transform="translate(-1.801)" fill="#fff"/>
            </svg>
          </div>

          <div className="containerBattery">
            <div className="battery">
              <svg xmlns="http://www.w3.org/2000/svg" width="41.588" height="20.083" viewBox="0 0 41.588 20.083">
                <path id="Icon_awesome-battery-three-quarters" data-name="Icon awesome-battery-three-quarters" d="M35.35,10.767v4.017h2.079V18.8H35.35v4.017H4.159V10.767H35.35M36.39,6.75H3.119A3.067,3.067,0,0,0,0,9.763V23.821a3.067,3.067,0,0,0,3.119,3.013H36.39a3.067,3.067,0,0,0,3.119-3.013v-1h.52a1.534,1.534,0,0,0,1.56-1.506V12.273a1.534,1.534,0,0,0-1.56-1.506h-.52v-1A3.067,3.067,0,0,0,36.39,6.75Zm-9.357,6.025H6.238v8.033H27.032Z" transform="translate(0 -6.75)" fill="#30ff3e"/>
              </svg>
            </div>
            <div className="batteryRate">85%</div>
          </div>

          <div className="containerTime">
              {time.format(today)}
          </div>

        </div>

    </div>
  )
};
