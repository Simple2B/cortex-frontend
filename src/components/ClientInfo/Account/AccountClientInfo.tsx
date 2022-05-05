import React, { ReactElement, useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import { Client, clientApi } from "../../../api/clientApi";
import { TODAY } from "./helper";
import editIcon from "../../../images/edit_icon.png";
import "./account.css";

export default function AccountClientInfo(props: {client: Client, nextTestDate: Date | null, api_key: string}): ReactElement {
    const {client, nextTestDate, api_key} = props;

    const [isEdit, setIsEdit] = useState(false);
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [birthday, setBirthday] = useState<any>(null);
    const [birthdayTextDate, setBirthdayTextDate] = useState('');
    const [address, setAddress] = useState('');
    const [city, setCity] = useState('');
    const [state, setState] = useState('');
    const [zip, setZip] = useState('');
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');

    useEffect(() => {
      if (birthday) {
        const testDate = new Date(
          birthday.toString().replace(/GMT.*$/, "GMT+0000")
        ).toISOString();
        const fullStartDate = testDate
          .replace("T", " ")
          .replace(".", " ")
          .split(" ");
        const dStart = fullStartDate[0].split("-");
        const birthdayDate = `${dStart[1]}/${dStart[2]}/${dStart[0]}`;
        setBirthdayTextDate(birthdayDate);
      } else {
        setBirthdayTextDate(client.birthday);
      }

    }, [birthday]);

    const handleEdit = () => {
      setIsEdit(true);
      setFirstName(firstName.length > 0 ? firstName : client.firstName);
      setLastName(lastName.length > 0 ? lastName : client.lastName);
      setBirthdayTextDate(birthdayTextDate.length > 0 ? birthdayTextDate : client.birthday);
      setAddress(address.length > 0 ? address : client.address);
      setCity(city.length > 0 ? city : client.city);
      setState(state.length > 0 ? state : client.state);
      setZip(zip.length > 0 ? zip : client.zip);
      setPhone(phone.length > 0 ? phone : client.phone);
      setEmail(email.length > 0 ? email : client.email);
    }

    const handleChange = (event: { target: { value: React.SetStateAction<string>; }; }, setFunction: Function) => {
      setFunction(event.target.value);
    };

    const saveEditedInfoClient = () => {
      setIsEdit(false);
      const editedDataClient = {
        api_key: api_key,
        first_name: firstName,
        last_name: lastName,
        birthday: birthdayTextDate,
        address: address,
        city: city,
        state: state,
        zip: zip,
        phone: phone,
        email: email
      };
      const sentData = async () => {
        const saveData = await clientApi.saveEditedInfoClient(editedDataClient);
        console.log("!!!!!!! saveData => ", saveData);
        // setInfoClient(saveData)
        setFirstName(saveData.first_name);
        setLastName(saveData.last_name);
        setBirthdayTextDate(saveData.birthday);
        setAddress(saveData.address);
        setCity(saveData.city);
        setState(saveData.state);
        setZip(saveData.zip);
        setPhone(saveData.phone);
        setEmail(saveData.email);
        return saveData
      }
      sentData();
      setBirthday(null);
    }
    return(
        <div className="clientInfo">
          <div className="clientInfo_tittle">
            {!isEdit ? (
              <>
                <div>Client info</div>
                <img onClick={handleEdit} src={editIcon} alt="editIcon" className="clientInfo_tittle_icon"/>
              </>
            ) : <div>Edit client info</div>
          }
          </div>
          {
            !isEdit ? (
              <div className="clientInfoAccount">
                <div className="infoContainer">
                  <div className="info_title">Name </div>
                  <div className={nextTestDate && TODAY < nextTestDate ? "clientInfo_text colorText"  : "clientInfo_text"}>
                    {firstName.length > 0 ? firstName : client.firstName} {lastName.length > 0 ? lastName : client.lastName}
                  </div>
                </div>
                <div className="info">
                  <div>DOB: </div>
                  <div className="clientInfo_text">{birthdayTextDate.length > 0 ? birthdayTextDate : client.birthday}</div>
                </div>
                <div className="info">
                  <div>Address: </div>
                  <div className="clientInfo_text">{address.length > 0 ? address : client.address}</div>
                </div>
                <div className="info">
                  <div>City: </div>
                  <div className="clientInfo_text">{city.length > 0 ? city : client.city}</div>
                </div>
                <div className="info">
                  <div>State: </div>
                  <div className="clientInfo_text">{state.length > 0 ? state : client.state}</div>
                </div>
                <div className="info">
                  <div>Zip: </div>
                  <div className="clientInfo_text">{zip.length > 0 ? zip : client.zip}</div>
                </div>
                <div className="info">
                  <div>Phone: </div>
                  <div className="clientInfo_text">{phone.length > 0 ? phone : client.phone}</div>
                </div>
                <div className="info">
                  <div>Email: </div>
                  <div className="clientInfo_text">{email.length > 0 ? email : client.email}</div>
                </div>
              </div>
            )
            :
            (
              <div className="clientEditInfoAccount">
                <div className="info clientInfo_editText">
                  <div>First name: </div>
                  <input type="text" onChange={(e) => handleChange(e, setFirstName)} value={firstName}/>
                </div>
                <div className="info clientInfo_editText">
                  <div>Last name: </div>
                  <input type="text" onChange={(e) => handleChange(e, setLastName)} value={lastName}/>
                </div>
                <div className="clientInfo_editText editTextBirthday">
                  <div>DOB: </div>
                  <DatePicker
                    dateFormat="MM/dd/yyyy"
                    className="dateBirthday"
                    selected={birthday}
                    onChange={(data) => setBirthday(data)}
                    selectsEnd



                    startDate={birthday}
                    isClearable
                    placeholderText={`${client.birthday}`}
                  />
                </div>
                <div className="info clientInfo_editText">
                  <div>Address: </div>
                  <input type="text" onChange={(e) => handleChange(e, setAddress)} value={address}/>
                </div>
                <div className="info clientInfo_editText">
                  <div>City: </div>
                  <input type="text" onChange={(e) => handleChange(e, setCity)} value={city}/>
                </div>
                <div className="info clientInfo_editText">
                  <div>State: </div>
                  <input type="text" onChange={(e) => handleChange(e, setState)} value={state}/>
                </div>
                <div className="info clientInfo_editText">
                  <div>Zip: </div>
                  <input type="text" onChange={(e) => handleChange(e, setZip)} value={zip}/>
                </div>
                <div className="info clientInfo_editText">
                  <div>Phone: </div>
                  <input type="text" onChange={(e) => handleChange(e, setPhone)} value={phone}/>
                </div>
                <div className="info clientInfo_editText">
                  <div>Email: </div>
                  <input type="text" onChange={(e) => handleChange(e, setEmail)} value={email}/>
                </div>
                <div className="saveBtn" onClick={saveEditedInfoClient}>
                  Save
                </div>
              </div>
            )
          }
        </div>
    )
}