export class OutgoingTransfers {
  id: number | undefined;
  transfer_amount: number | undefined;
  account_balance_before: number | undefined;
  account_balance_after: number | undefined;
  destination_account: string | undefined;
  transfer_date: Date | undefined;
  outgoing_email: string | undefined;
  category: string | undefined;

  constructor() {}
}
