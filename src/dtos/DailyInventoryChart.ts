class DailyInventoryChart {
  field: string;
  onHandValueSum: number;

  constructor(field: string, onHandValueSum: number) {
    this.field = field;
    this.onHandValueSum = onHandValueSum;
  }
}

export default DailyInventoryChart;