/* eslint-disable max-classes-per-file */
import { Model } from 'sequelize';

export interface RestaurantCredsAttributes {
  id: string;
  apikey: string;
  hwid: string;
}

export class RestaurantCreds extends Model<RestaurantCredsAttributes>
  implements RestaurantCredsAttributes {
  public id!: string;

  public apikey!: string;

  public hwid!: string;
}
export type RestaurantCredsStatic = typeof RestaurantCreds;

// export interface RestaurantCredsModel extends Model<RestaurantCredsAttributes>, RestaurantCredsAttributes {}
