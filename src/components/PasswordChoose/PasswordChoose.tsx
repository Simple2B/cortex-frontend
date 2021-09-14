import React, { ReactElement, useState } from 'react'
import { useHistory } from 'react-router-dom';
import { ReactComponent as Brain } from '../../images/brain.svg'
import { ReactComponent as Logo } from '../../images/cortex_logo.svg'


export default function PasswordChoose(): ReactElement {
  const [password, setPassword] = useState<string>('')
  const [confirmPassword, setConfirmPassword] = useState<string>('')
  const [error, setError] = useState<string>('')

  const history = useHistory();

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handlePasswordConfirmChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setConfirmPassword(e.target.value);
  };

  const handleSubmit = (e: { preventDefault: () => void; }) => {
    if (password !== confirmPassword) {
      e.preventDefault();
      setError('Passwords not match')
    } else {
      history.push('/')
    }

  };

  return (
    <div className="login">
      <div className="login_image">
        <Brain />
      </div>
      <div className="cortex_logo">
        <Logo />
      </div>
      <form className="login_form">
        <input type="password" value={password} onChange={handlePasswordChange} className="login_input" placeholder="PASSWORD" />
        <input type="password" value={confirmPassword} onChange={handlePasswordConfirmChange} className="login_input" placeholder="CONFIRM PASSWORD" />
        <div className="error">{error}</div>
        <button onClick={handleSubmit}
          disabled={
            password === "" || confirmPassword === ""
          } className="login_button">SET PASSWORD</button>
      </form>
    </div>
  )
}
