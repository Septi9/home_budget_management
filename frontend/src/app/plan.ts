export class Plan {
  id: number | undefined;
  amount: number | undefined;
  plan_desc: string | undefined;
  user_id: number | undefined;
  description: string | undefined;
  date: Date | undefined;
  is_periodic: boolean | undefined;
  cycle: string | undefined;

  constructor() {
  }
}
