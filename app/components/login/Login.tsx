import React, { FormEvent, ChangeEvent } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  setUser,
  setPassword,
  selectLoginState,
  submit,
} from '../../reducers/loginComponentSlice';
import { login } from '../../reducers/authentication.reducer';

export default function Login(): JSX.Element {
  /**
   * TODO: possibly add synchronising loading animation
   * and disable login ?
   * while the backend syncronizes data with the server
   */
  const dispatch = useDispatch();

  const state = useSelector(selectLoginState);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // this.setState({ submitted: true });
    // eslint-disable-next-line @typescript-eslint/naming-convention
    const { user_name, password } = state;
    if (user_name && password) {
      dispatch(login(user_name, password));
    }
    dispatch(submit());
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const { name, value } = e.target;
    if (name === 'user_name') dispatch(setUser(value));
    if (name === 'password') dispatch(setPassword(value));
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
                state.submitted && !state.user_name ? 'is-invalid' : ''
              }`}
              name="user_name"
              placeholder="Entrer Nom d'utilisateur .."
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <input
              type="password"
              className={`form-control form-control-user ${
                state.submitted && !state.password ? 'is-invalid' : ''
              }`}
              name="password"
              placeholder="Mot de pass"
              onChange={handleChange}
            />
          </div>
          {/* <input
            type=""
            value="Login"
            className="btn theme-gradient btn-user btn-block "
          /> */}
          <input
            className="btn theme-gradient btn-user btn-block"
            type="submit"
            value="Login"
          />
        </form>
      </div>
    </div>
  );
}
