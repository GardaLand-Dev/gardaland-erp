import {
  Optional,
  Model,
  // BelongsToGetAssociationMixin,
  // BelongsToSetAssociationMixin,
  // Association,
} from 'sequelize';
// eslint-disable-next-line import/no-cycle

export interface ClientAttributes {
  id: string;
  firstname: string;
  lastname: string;
  tel?: string;
  email?: string;
  lastOrder: Date;
}
export type ClientCreationAttributes = Optional<
  ClientAttributes,
  'id' | 'email' | 'tel'
>;
export class Client extends Model<ClientAttributes, ClientCreationAttributes>
  implements ClientAttributes {
  public id!: string;

  public firstname!: string;

  public lastname!: string;

  public tel: string | undefined;

  public email: string | undefined;

  public lastOrder!: Date;

  // timestamps
  public createdAt!: Date;

  public updatedAt!: Date;

  // MODEL ASSOCATION METHODS
  // public getEmployee!: BelongsToGetAssociationMixin<ClietnOrder>;

  // public setEmployee!: BelongsToSetAssociationMixin<Employee, string>;

  // // POSSIBLE INCLUSIONS FROM ASSOTIATIONS
  // public readonly employee?: Employee;

  // public static associations: {
  //   employee: Association<Employee, Client>;
  // };
}
