import { Column, Model, Table } from "sequelize-typescript";

@Table
class User extends Model<User> {

  @Column
  public name: string;

  @Column
  public birthday: Date;
}
export default User;
