class WeekModeDailyInventory {
  week: string;
  on_hand_sum: number;

  constructor(week: string, on_hand_sum: number) {
    this.week = week;
    this.on_hand_sum = on_hand_sum;
  }
}

export default WeekModeDailyInventory;