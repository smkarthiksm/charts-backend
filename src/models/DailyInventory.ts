import { Column, Model, Table, DataType } from "sequelize-typescript";

@Table
class DailyInventory extends Model<DailyInventory> {

  @Column
  public product_id: string;

  @Column
  public date: Date;

  @Column
  public location: string;

  @Column(DataType.FLOAT)
  public on_hand_quantity: number;

  @Column(DataType.FLOAT)
  public unit_cost: number;

  @Column(DataType.FLOAT)
  public on_hand_value: number;
}
export default DailyInventory;
