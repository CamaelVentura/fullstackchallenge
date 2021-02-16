import Component from '@glimmer/component';
import { inject as service } from '@ember/service';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';

import axios from 'axios';

export default class NewCarComponent extends Component {
  @service router;
  @tracked brands = [];
  @tracked models = [];
  @tracked years = [];

  @action
  async loadData(select){
    switch(select.id){
      case 'type':
        this.brands = [{nome: 'Loading...', codigo: 0}];
        this.models = [{nome: 'Loading...', codigo: 0}];
        this.years = [{nome: 'Loading...', codigo: 0}];
        const brands = await axios.get(`https://parallelum.com.br/fipe/api/v1/${select.value}/marcas`);
        this.brands = brands.data;

        const modelosByType = await axios.get(`https://parallelum.com.br/fipe/api/v1/${select.value}/marcas/${this.brands[0].codigo}/modelos`);
        this.models = modelosByType.data.modelos;

        const yearByType = await axios.get(`https://parallelum.com.br/fipe/api/v1/${select.value}/marcas/${this.brands[0].codigo}/modelos/${this.models[0].codigo}/anos`);
        this.years = yearByType.data;
      break;
      case 'brand':
        this.models = [{nome: 'Loading...', codigo: 0}];
        this.years = [{nome: 'Loading...', codigo: 0}];
        const typeSelect = document.getElementById('type');
        const type = typeSelect.options[typeSelect.selectedIndex].value;
        const modelos = await axios.get(`https://parallelum.com.br/fipe/api/v1/${type}/marcas/${select.value}/modelos`);
        this.models = modelos.data.modelos;

        const year = await axios.get(`https://parallelum.com.br/fipe/api/v1/${type}/marcas/${select.value}/modelos/${this.models[0].codigo}/anos`);
        this.years = year.data;
      break;
      case 'model':
        this.years = [{nome: 'Loading...', codigo: 0}];
        const typeSelectModel = document.getElementById('type');
        const typeModel = typeSelectModel.options[typeSelectModel.selectedIndex].value;
        const brandSelect = document.getElementById('brand');
        const brand = brandSelect.options[brandSelect.selectedIndex].value;
        const {data} = await axios.get(`https://parallelum.com.br/fipe/api/v1/${typeModel}/marcas/${brand}/modelos/${select.value}/anos`);
        this.years = data;
      break;
    }
  }

  @action 
  async submitVehicle(){
    const license_plate = document.getElementById('license_plate');
    const type = document.getElementById('type');
    const brand = document.getElementById('brand');
    const model = document.getElementById('model');
    const year = document.getElementById('year');
    if(!license_plate.value){
      alert('Voce precisa digitar uma placa');
      throw new Error;
    }
    if(type.selectedIndex===-1){
      alert('Voce precisa selecionar um tipo');
      throw new Error;
    }
    if(brand.selectedIndex===-1){
      alert('Voce precisa selecionar uma marca');
      throw new Error;
    }
    if(model.selectedIndex===-1){
      alert('Voce precisa selecionar um modelo');
      throw new Error;
    }
    if(year.selectedIndex===-1){
      alert('Voce precisa selecionar um ano');
      throw new Error;
    }

    try{
      await axios.post('http://localhost:3000/vehicles', {
        license_plate: license_plate.value,
        type: type.options[type.selectedIndex].text,
        brand: brand.options[brand.selectedIndex].text,
        model: model.options[model.selectedIndex].text,
        year: year.options[year.selectedIndex].text,
      });

      this.router.transitionTo('/'); 
    }catch(err){
      alert('Essa placa já foi registrada.');
    }
  }

  @action
  returnPage(){    
    this.router.transitionTo('/'); 
  }
}