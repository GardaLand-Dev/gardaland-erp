import React, { FormEvent, ChangeEvent, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
// import { selectLoginState, submit } from '../../reducers/loginComponentSlice';
import {
  login,
  selecthasManagerRole,
  loginAsManager,
  loginAsCaissier,
} from '../../reducers/authentication.reducer';

export default function Login(): JSX.Element {
  /**
   * TODO: possibly add synchronising loading animation
   * and disable login ?
   * while the backend syncronizes data with the server
   */
  const dispatch = useDispatch();

  const [username, setUsername] = useState<string>();
  const [password, setPassword] = useState<string>();
  const [submitted, setSubmitted] = useState<number>();
  const [roleSelection, setRoleSelection] = useState<string>();
  const hasManagerRole = useSelector(selecthasManagerRole);
  // const state = useSelector(selectLoginState);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // this.setState({ submitted: true });
    // eslint-disable-next-line @typescript-eslint/naming-convention
    if (username && password) {
      if (hasManagerRole && hasManagerRole) {
        setSubmitted(2);
        if (roleSelection === 'Manager') {
          dispatch(loginAsManager(username, password));
        } else dispatch(loginAsCaissier(username, password));
      } else dispatch(login(username, password));
    }
    setSubmitted(1);
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const { name, value } = e.target;
    if (name === 'user_name') setUsername(value);
    if (name === 'password') setPassword(value);
  };

  return (
    <div className="Logincontainer">
      <div className="p-5 LoginForm">
        <div className="text-center">
          <h1 className="h4 mb-4">Welcome Back!</h1>
        </div>
        <form className="user" onSubmit={handleSubmit}>
          <div className="form-group">
            <input
              type="username"
              className={`form-control form-control-user ${
                submitted && !username ? 'is-invalid' : ''
              }`}
              name="user_name"
              placeholder="Entrer Nom d'utilisateur .."
              onChange={handleChange}
              disabled={hasManagerRole}
            />
          </div>
          <div className="form-group">
            <input
              type="password"
              className={`form-control form-control-user ${
                submitted && !password ? 'is-invalid' : ''
              }`}
              name="password"
              placeholder="Mot de pass"
              onChange={handleChange}
              disabled={hasManagerRole}
            />
          </div>
          {/* <input
            type=""
            value="Login"
            className="btn theme-gradient btn-user btn-block "
          /> */}
          <select
            className={`custom-select mb-3 ${
              submitted === 2 && !roleSelection ? 'invalid' : ''
            }`}
            hidden={!hasManagerRole}
            onChange={(e) => {
              setRoleSelection(e.target.value);
            }}
            defaultValue="Login as"
          >
            <option disabled selected value="">
              Login as
            </option>
            <option>Manager</option>
            <option>Caissier</option>
          </select>
          <input
            className="btn theme-gradient btn-user btn-block theme-glow"
            type="submit"
            value="Login"
          />
        </form>
      </div>
    </div>
  );
}
