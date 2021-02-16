import Route from '@ember/routing/route';
import axios from 'axios';

export default class EditRoute extends Route {
  async model(car){

    const {data} = await axios.get(`http://localhost:3000/vehicles/${car.vehicle_id}`);

    console.log(data);
    return data;
  }
}
