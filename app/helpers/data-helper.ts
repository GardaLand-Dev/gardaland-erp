import log from 'electron-log';
import axios from 'axios';

type Data = {
  id: string;
  name: string;
  stationId: string;
  products?: {
    id: string;
    name: string;
    tva: number;
    priceTTC: number;
    familyId: string;
    maxQuantity: string;
  }[];
}[];

const loadImages = (dd: Data) => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  dd.forEach((f) => {
    f.products.forEach((p) => {
      axios
        .get(`http://localhost:3333/imgs/${p.id}`, {
          responseType: 'arraybuffer',
        })
        .then((response) => {
          const image = btoa(
            new Uint8Array(response.data).reduce(
              (data, byte) => data + String.fromCharCode(byte),
              ''
            )
          );
          const rslt = `data:${response.headers[
            'content-type'
          ].toLowerCase()};base64,${image}`;
          localStorage.setItem(p.id, rslt);
          return rslt;
        })
        .catch(log.error);
    });
  });
};
export default loadImages;
