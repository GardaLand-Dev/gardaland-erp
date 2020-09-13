import config from '../config';

function handleResponse(response: Response) {
  /**
   * TODO: if login is successful and user has admin/manager role
   * suggest to login as manager
   */
  return response.text().then((text) => {
    const jsonResponse = text && JSON.parse(text);
    if (!response.ok) {
      console.log('not ok in activation.service', jsonResponse);
      const error =
        (jsonResponse && jsonResponse.MESSAGE) || response.statusText;
      throw new Error(error);
    } else {
      if (jsonResponse.STATUS !== 'SUCCESS') {
        const error =
          (jsonResponse && jsonResponse.MESSAGE) || response.statusText;
        throw new Error(error);
      }
      return {
        activated: jsonResponse.DATA,
      };
    }
  });
}

function activate(apikey: string) {
  const requestOptions = {
    method: 'POST',
    headers: { 'Content-type': 'application/json' },
    body: JSON.stringify({ apikey }),
  };
  return fetch(`${config.apiUrl}/rbac/activation`, requestOptions)
    .then(handleResponse)
    .then((app) => {
      // localStorage.setItem('activationState', JSON.stringify(app));
      return <
        {
          activated: boolean;
        }
      >app;
    });
}

function checkActivation() {
  const requestOptions = {
    method: 'POST',
    headers: { 'Content-type': 'application/json' },
    body: JSON.stringify({}),
  };
  console.log('checkiiiiiing');
  return fetch(`${config.apiUrl}/rbac/checkactivation`, requestOptions)
    .then((d) => {
      return d.text();
    })
    .then((text) => {
      const jsonResponse = text && JSON.parse(text);
      if (jsonResponse.STATUS !== 'SUCCESS') return false;
      return true;
    });
}

const activationService = {
  activate,
  checkActivation,
};
export default activationService;
