
export interface Credit {
    id: string;
    request_user_id: string;
    subject_id?: string;
    created_at: Date;
    updated_at: Date;
    amount: number;
    type: string;
    resource:CreditDetail
    status:string
  }
interface CreditDetail{
  flavor_id:string,
  instance:number,
  details:string
  time:string
}
  