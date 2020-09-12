import config from '../config';

function logout() {
  // remove user from local storage to log user out
}

function handleResponse(response: Response) {
  /**
   * TODO: if login is successful and user has admin/manager role
   * suggest to login as manager
   */
  return response.text().then((text) => {
    const jsonResponse = text && JSON.parse(text);
    if (!response.ok) {
      console.log('not ok in activation.service');
      const error =
        (jsonResponse && jsonResponse.MESSAGE) || response.statusText;
      throw new Error(error);
    } else {
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
  return fetch(`${config.apiUrl}/activate`, requestOptions)
    .then(handleResponse)
    .then((app) => {
      localStorage.setItem('activationState', JSON.stringify(app));
      return <
        {
          activated: boolean;
        }
      >app;
    });
}

const activationService = {
  activate,
};
export default activationService;
