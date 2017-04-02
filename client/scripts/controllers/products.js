import Moment from 'moment';
import { Controller } from 'angular-ecmascript/module-helpers';

export default class ProductsCtrl extends Controller {
  constructor() {
    super(...arguments);

    this.data = [
      {
        _id: 0,
        name: 'Jamieson Kids Chewable Vitamin D 400 IU Strawberry Tablets',
        picture: 'images/6000196536690.jpg',
        price: '$4.97'
      },
      {
        _id: 1,
        name: 'Baby Ddrops® Liquid Vitamin D3 Vitamin Supplement, 400 IU',        
        picture: 'images/999999-851228000071_1.jpg',
        price: '$14.97'
      },
      {
        _id: 2,
        name: 'Jamieson Milk Thistle Caplets, 4500 mg',        
        picture: 'images/6000196917081.jpg',
        price: '$15.97'
      },
      {
        _id: 3,
        name: 'Centrum Prenatal + DHA Complete Multivitamin and Mineral Supplement',
        picture: 'images/999999-62107085205.jpg',
        price: '$23.97'
      },
      {
        _id: 4,
        name: "Nature's Bounty Saw Palmetto 450mg 100 Capsules",
        picture: 'images/40624.jpg',
        price: '$11.67'
      }
    ];
  }

  remove(product) {
    this.data.splice(this.data.indexOf(product), 1);
  }
}

ProductsCtrl.$name = 'ProductsCtrl';