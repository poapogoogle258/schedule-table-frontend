import type { Member } from "./member";

interface Recurrence {
    freq: number;
    count: number | null;
    interval: number;
    byweekday: number[];
    bymonth: number[];
}
  
export interface Schedule {
    id: string;
    master_id: string | null;
    calendar_id: string;
    name: string;
    description: string;
    imageURL: string;
    priority: number;
    start: string;
    end: string;
    hr_start: string;
    hr_end: string;
    tzid: string;
    breaktime: number;
    use_number_people : number,
    recurrence: Recurrence,
    members: Member[]
}
 
export type CreateSchedule = Omit<Schedule, 'id'>