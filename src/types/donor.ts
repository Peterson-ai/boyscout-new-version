export interface Donor {
  id: string;
  appeal_code: string;
  year: number;
  appeal_name: string;
  structure: string;
  giving_category: string;
  county: string;
  last_org_name: string;
  first_name?: string;
  city: string;
  state: string;
  zip: string;
  email: string;
  donation_amount: number;
  user_id: string;
  created_at?: string;
}