
export interface Credit {
  id: string;
  request_user_id: string;
  subject_id?: string;
  created_at: Date;
  updated_at: Date;
  amount: number;
  type: string;
  academic_year:string
  resource: CreditDetail
  status: string
  details: string
}
export interface ICreditCreate extends Credit { }
export interface CreditDetail {
  flavor_id: string,
  instance: number,
  time_in_hour: number
}
