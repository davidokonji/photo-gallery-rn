import * as json from '../data/payload.json';

export default {
  fetchGallery: () => Promise.resolve(json.data),
};
