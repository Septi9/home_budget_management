export class IncomingTransfers {
  id: number | undefined;
  transfer_amount: number | undefined;
  account_balance_before: number | undefined;
  account_balance_after: number | undefined;
  sender_account: string | undefined;
  transfer_date: Date | undefined;
  incoming_email: string | undefined;


  constructor() {}
}
