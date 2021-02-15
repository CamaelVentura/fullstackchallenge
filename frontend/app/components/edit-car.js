import Component from '@glimmer/component';
import { inject as service } from '@ember/service';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';

import axios from 'axios';

export default class EditCarComponent extends Component {
  @service router;
  types = [{codigo: 'caminhoes', nome: 'Caminhão'},{codigo: 'carros', nome: 'Carro'},{codigo: 'motos', nome: 'Moto'}];
  @tracked brands = [{codigo: -1, nome: 'Carregando...'}];
  @tracked models = [{codigo: -1, nome: 'Carregando...'}];
  @tracked years = [{codigo: -1, nome: 'Carregando...'}];

  @action
  async loadValues(car){
    const index = this.types.indexOf(this.types.find(type => type.nome === car.type));

    let type = '';
    switch(car.type){
      case 'Caminhão':
        type = 'caminhoes';
      break;
      case 'Carro':
        type = 'carros';
      break;
      case 'Moto':
        type = 'motos';
      break;
      default:
        type = 'carros';
      break;
    }

    document.getElementById('type').selectedIndex = index;

    this.brands = (await axios.get(`https://parallelum.com.br/fipe/api/v1/${type}/marcas`)).data;

    const itemBrand = this.brands.find(brand => brand.nome === car.brand);    
    setTimeout(() => { document.getElementById('brand').selectedIndex = this.brands.indexOf(itemBrand); }, 1);
    this.models = (
      await axios.get(`https://parallelum.com.br/fipe/api/v1/${type}/marcas/${itemBrand.codigo}/modelos`)
    ).data.modelos;

    const itemModel = this.models.find(model => model.nome === car.model);
    setTimeout(() => { document.getElementById('model').selectedIndex = this.models.indexOf(itemModel); }, 1);

    this.years = (
      await axios.get(
        `https://parallelum.com.br/fipe/api/v1//${type}/marcas/${itemBrand.codigo}/modelos/${itemModel.codigo}/anos`
      )).data;
    
    const itemYear = this.years.find(year => year.nome === car.year);
    setTimeout(() => { document.getElementById('year').selectedIndex = this.years.indexOf(itemYear); }, 1);
  }

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
  async submitVehicle(car){
    const type = document.getElementById('type');
    const license_plate = document.getElementById('license_plate');
    const brand = document.getElementById('brand');
    const model = document.getElementById('model');
    const year = document.getElementById('year');
    if(!license_plate.value){
      alert('Voce precisa digitar uma placa')
      throw new Error;
    }
    if(type.selectedIndex===-1){
      alert('Voce precisa selecionar um tipo');
      throw new Error;
    }
    if(brand.selectedIndex===-1){
      alert('Voce precisa selecionar uma marca')
      throw new Error;
    }
    if(model.selectedIndex===-1){
      alert('Voce precisa selecionar um modelo')
      throw new Error;
    }
    if(year.selectedIndex===-1){
      alert('Voce precisa selecionar um ano')
      throw new Error;
    }

    try{
      await axios.put(`http://localhost:3000/cars/${car.id}`, {
        license_plate: license_plate.value,
        brand: brand.options[brand.selectedIndex].text,
        model: model.options[model.selectedIndex].text,
        year: year.options[year.selectedIndex].text,
        type: type.options[type.selectedIndex].text,
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