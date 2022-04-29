export interface ITest {
    id: number,
    client_id: number,
    doctor_id: number,
    care_plan_id: number,
    date: string,
};

export interface INote {
    id?: number,
    client_id: number,
    doctor_id: number,
    note: string,
    date?: string,
    visit_id?: number,
    start_time?: string,
    end_time?: string,
};

export interface IConsult {
    id?: number,
    client_id: number,
    doctor_id: number,
    consult: string,
    date?: string,
    visit_id?: number,
    start_time?: string,
    end_time?: string,
};

export interface ICarePlan {
    id: number,
    date: string,
    start_time: string,
    end_time: string | null,
    progress_date: string | null,
    care_plan: string,
    frequency: string,
    client_id: number,
    doctor_id: number,
    doctor_name: string,
    tests: ITest[],
    notes: INote[],
    consults: IConsult[]
};
