import React, { ReactElement, useEffect, useState } from "react";
import "./kiosk.css";
import { clientApi } from "../../api/clientApi";
import { ReactComponent as Brain } from "../../images/brain.svg";
import { ReactComponent as Logo } from "../../images/cortex_logo.svg";
import { NavLink } from "react-router-dom";
import { IPatient } from "../../types/patientsTypes";
import { useActions } from "../../redux/useActions";
import { store } from "../../redux";

export default function Kiosk(): ReactElement {
  const [phoneQuery, setPhoneQuery] = useState("");
  const [welcomeText, setWelcomeText] = useState(
    "Please enter your phone number"
  );
  const [style, setStyle] = useState(false);
  const clients:IPatient[] = store.getState().patients;
  const {patientsData} = useActions();

  useEffect(() => {
    patientsData();
  }, [phoneQuery]);

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPhoneQuery(e.target.value);
  };


  const handleSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    const clientFromDB = clients.filter(
      (client) => client.phone === phoneQuery.replace(/[^0-9]/g, "")
    );
    const filteredName =
      clientFromDB.length > 0 ? clientFromDB[0].first_name : false;

    if (filteredName) {
      console.log("filteredName => ", filteredName);

      const identifyClient = async () => {
        const client = await clientApi.identifyClientWithPhone(
          phoneQuery.replace(/[^0-9]/g, "")
        );

        return client;
      };

      identifyClient();

      setStyle(true);
      setWelcomeText(
        `Thanks ${filteredName}, have a seat and we’ll call your name shortly.`
      );
      setPhoneQuery("");

      const interval = setInterval(() => {
        setStyle(false);
        setWelcomeText("Please enter your phone number");
      }, 5000);
      return () => clearInterval(interval);
    } else {
      setStyle(false);
      setWelcomeText("You are not registered. The registration link is below!");
      setPhoneQuery("");

      const interval = setInterval(() => {
        setStyle(false);
        setWelcomeText("Please enter your phone number");
      }, 5000);
      return () => clearInterval(interval);
    }
  };

  return (
    <div className="kiosk">
      <div className="kiosk_image">
        <Brain />
      </div>
      <div className="cortex_logo">
        <Logo />
      </div>
      <div
        className={!style ? "kiosk_welcome_text" : "alert_text welcome_text"}
      >
        {welcomeText}
      </div>
      <form className="kiosk_form">
        <input
          type="phone"
          value={phoneQuery}
          onChange={handlePhoneChange}
          className="kiosk_input"
          placeholder="PHONE"
        />
        <button
          onClick={handleSubmit}
          disabled={phoneQuery === ""}
          className="kiosk_button"
        >
          LOGIN
        </button>
        <div className="redirect_registr">
          {" "}
          New here?{" "}
          <NavLink className="form_registr" to="patient-registration">
            Sign up
          </NavLink>
        </div>
      </form>
    </div>
  );
}
