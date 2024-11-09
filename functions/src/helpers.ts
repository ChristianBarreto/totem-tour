import { Totem } from '../../src/api/totems/types';
import { Customer } from '../../src/api/customers/types';

export const initTotem: Totem = {
  id: '',
  nickName: '',
  locationDescription: '',
  responsiblePerson: '',
  posId: '',
  cityOrder: '',
  showTestProduct: false,
  lastPing: null,
  lastUpdated: '',
  timestamp: '',
}

export const initCustomer: Customer = {
  name: '',
  email: '',
  phone: ''
}