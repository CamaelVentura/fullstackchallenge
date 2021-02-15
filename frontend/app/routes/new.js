import Route from '@ember/routing/route';

export default class NewRoute extends Route {
  async model(){
    const data = [{codigo: 'caminhoes', nome: 'Caminhão'},{codigo: 'carros', nome: 'Carro'},{codigo: 'motos', nome: 'Motos'}];
    return data;
  }
}
