import React, { ReactElement, useState } from 'react'
import './login.css'
import { useHistory } from 'react-router-dom';
import { ReactComponent as Brain } from '../../images/brain.svg'
import { ReactComponent as Logo } from '../../images/cortex_logo.svg'
import { useActions } from '../../redux/useActions';

export interface ILogin {
  username: string;
  password: string;
}

export default function Login(): ReactElement {
  const [ form, setForm ] = useState<ILogin>({
    username: "",
    password: "",
  });
  const history = useHistory();
  const { login } = useActions();

  const [messageError, setMessageError] = useState("");
  const [error, setError] = useState(false);

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((prev) => {
      return { ...prev, username: e.target.value };
    });
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((prev) => {
      return { ...prev, password: e.target.value };
    });
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();

    // try {
    const apiLogin = login({
        password: form.password,
        username: form.username,
      });
      history.push('/queue');

      console.log("login -> ", apiLogin);


    // const result = loginApi

    // } catch (error: any) {
    //   console.log("error from login -> ", error);
    //   const status = error.status;
    //   setForm({
    //     username: "",
    //     password: "",
    //   });
    //   if (status === 401 || status === 403 || status === 404) {
    //     setError(true);
    //     setMessageError("Invalid login credentials. Please try again!");
    //     return Promise.reject({
    //       message: false,
    //     });
    //   }
    //   return Promise.resolve();
    // }
  };

  return (
    <div className="login">
      <div className="login_image">
        <Brain />
      </div>
      <div className="cortex_logo">
        <Logo />
      </div>
      { error &&
        <div className="alert alert-danger loginAlertError" role="alert">
            {messageError}
        </div>
      }
      <form className="login_form">
        <input type="email" value={form.username} onChange={handleEmailChange} className="login_input" placeholder="EMAIL" />
        <input type="password" value={form.password} onChange={handlePasswordChange} className="login_input" placeholder="PASSWORD" />
        {/* <div className="errorMessage"></div> */}
        <button onClick={handleSubmit}
          disabled={
            form.password === "" || form.username === ""
          } className="login_button">LOGIN</button>
      </form>
    </div>
  )
}
