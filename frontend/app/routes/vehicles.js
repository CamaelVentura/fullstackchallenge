import Route from '@ember/routing/route';

import axios from 'axios';

export default class VehiclesRoute extends Route {
  async model(){
    const {data} = await axios.get('http://localhost:3000/vehicles');

    return data;
  }
}
