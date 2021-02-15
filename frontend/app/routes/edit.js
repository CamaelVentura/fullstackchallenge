import Route from '@ember/routing/route';
import axios from 'axios';

export default class EditRoute extends Route {
  async model(car){

    const {data} = await axios.get(`http://localhost:3000/cars/${car.vehicle_id}`);

    return data;
  }
}
