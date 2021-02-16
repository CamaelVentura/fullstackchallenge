import Component from '@glimmer/component';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';
import { tracked } from '@glimmer/tracking';

import axios from 'axios';

export default class VehicleListComponent extends Component {
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
        if(filtro === '' && this.vehicles){
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
    goToVehicle(vehicle){
        this.router.transitionTo(`/${vehicle.id}`);
    }

    @action
    goToEditVehicle(vehicle){
        this.router.transitionTo(`/edit/${vehicle.id}`);
    }

    @action
    goToNewVehicle(){
        this.router.transitionTo('/new');
    }

    @action
    deleteVehicle(vehicle){
        const confirmDelete = confirm(`Deletar ${vehicle.license_plate}?`);
        if(confirmDelete){
            this.delete(vehicle.id);
        }
    }

    async delete(id){
        await axios.delete(`http://localhost:3000/vehicles/${id}`);
        window.location.reload(true);
    }
}