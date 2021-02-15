import Component from '@glimmer/component';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';
import { tracked } from '@glimmer/tracking';

import axios from 'axios';

export default class CarListComponent extends Component {
    @service router;
    @tracked filteredVehicles;
    vehicles;

    @action
    listVehicles(vehicles){
        this.vehicles = vehicles;
        this.filteredVehicles = this.vehicles;
    }

    @action
    filter(filtro){
        if(filtro === ''){
            this.filteredVehicles = this.vehicles;
        }
        else{
            this.filteredVehicles = this.vehicles.filter(vehicle => (
                !vehicle.license_plate.toLowerCase().indexOf(filtro.toLowerCase()) 
                || !vehicle.brand.toLowerCase().indexOf(filtro.toLowerCase()) 
                || !vehicle.model.toLowerCase().indexOf(filtro.toLowerCase())
                || !vehicle.year.toLowerCase().indexOf(filtro.toLowerCase())
            ));
        }
    }

    @action
    goToCar(car){
        this.router.transitionTo(`/${car.id}`);
    }

    @action
    goToEditCar(car){
        this.router.transitionTo(`/edit/${car.id}`);
    }

    @action
    goToNewCar(){
        this.router.transitionTo('/new');
    }

    @action
    deleteCar(car){
        const confirmDelete = confirm(`Deletar ${car.license_plate}?`);
        if(confirmDelete){
            this.delete(car.id);
        }
    }

    async delete(id){
        await axios.delete(`http://localhost:3000/cars/${id}`);
        window.location.reload(true);
    }
}