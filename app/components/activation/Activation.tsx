import React, { FormEvent, ChangeEvent, useState, FC } from 'react';
import { useDispatch } from 'react-redux';
// import { activate } from '../../reducers/activation.reducer';
// import { selectLoginState, submit } from '../../reducers/loginComponentSlice';

export default function Activation(): JSX.Element {
  /**
   * TODO: possibly add synchronising loading animation
   * and disable login ?
   * while the backend syncronizes data with the server
   */
  const dispatch = useDispatch();

  const [restaurantApiKey, setRestaurantApiKey] = useState<string>();
  const [submitted, setSubmitted] = useState(false);
  // const state = useSelector(selectLoginState);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // this.setState({ submitted: true });
    // eslint-disable-next-line @typescript-eslint/naming-convention
    setSubmitted(true);
    if (restaurantApiKey) {
      // console.log(username, password);
      // dispatch(activate(restaurantApiKey));
    }
  };

  return (
    <div className="Logincontainer">
      <div className="p-5 LoginForm">
        <div className="text-center">
          <h1 className="h4 mb-4">Activation Page</h1>
        </div>
        <form className="user" onSubmit={handleSubmit}>
          <div className="form-group">
            <input
              className={`form-control form-control-user ${
                submitted && !restaurantApiKey ? 'is-invalid' : ''
              }`}
              name="Restaurant clé"
              placeholder="Entrer Nom d'utilisateur .."
              onChange={(e) => {
                setRestaurantApiKey(e.target.value);
              }}
            />
          </div>
          {/* <input
            type=""
            value="Login"
            className="btn theme-gradient btn-user btn-block "
          /> */}
          <input
            className="btn theme-gradient btn-user btn-block theme-glow"
            type="submit"
            value="Valider"
          />
        </form>
      </div>
    </div>
  );
}
