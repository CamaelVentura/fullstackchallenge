import EmberRouter from '@ember/routing/router';
import config from 'ember-quickstart/config/environment';

export default class Router extends EmberRouter {
  location = config.locationType;
  rootURL = config.rootURL;
}

Router.map(function () {
  this.route('vehicles', { path: '/' });
  this.route('new', { path: 'new' });
  this.route('vehicle', { path: ':vehicle_id' });
  this.route('edit', { path: 'edit/:vehicle_id' });
});
