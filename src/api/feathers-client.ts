import Feathers, { authentication, rest } from '@feathersjs/client';
import type { ServiceTypes } from '../typings/feathers';
import type { Application } from '@feathersjs/feathers';

export type FeathersClient = Application<ServiceTypes>;

let feathers: FeathersClient;

export function setupFeathers(): FeathersClient {
  if (feathers) throw new Error('Feathers client already set up');
  feathers = Feathers<ServiceTypes>();
  const restClient = rest('http://localhost:3030');
  feathers.configure(authentication());
  feathers.configure(restClient.fetch(window.fetch));
  return feathers;
}

export function getClient() {
  if (!feathers) throw new Error('Feathers client not set up yet');
  return feathers;
}
