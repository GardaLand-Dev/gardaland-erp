import React, { FormEvent, ChangeEvent, useState, FC, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  activate,
  selectActivated,
  selectAppState,
  activationRequest,
  activationSuccess,
  activationFailure,
} from '../../reducers/activation.reducer';
import activationService from '../../services/activation.service';

export default function Activation(): JSX.Element {
  /**
   * TODO: possibly add synchronising loading animation
   * and disable login ?
   * while the backend syncronizes data with the server
   */
  const dispatch = useDispatch();

  const [restaurantApiKey, setRestaurantApiKey] = useState<string>();
  const [submitted, setSubmitted] = useState(false);
  // const state = useSelector(selectActivated);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // this.setState({ submitted: true });
    // eslint-disable-next-line @typescript-eslint/naming-convention
    setSubmitted(true);
    if (restaurantApiKey) {
      // console.log(username, password);
      dispatch(activate(restaurantApiKey));
    }
  };
  const app = useSelector(selectAppState);
  useEffect(() => {
    if (app.activated === undefined) {
      dispatch(activationRequest());
      activationService
        .checkActivation()
        .then((ok) => {
          if (ok === true) {
            return dispatch(activationSuccess());
          }
          return dispatch(activationFailure());
        })
        .catch(console.error);
    }
  }, []);
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
              placeholder="Entrer le clé d'activation .."
              onChange={(e) => {
                setRestaurantApiKey(e.target.value);
              }}
            />
          </div>
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
