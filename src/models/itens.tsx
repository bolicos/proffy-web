export interface Item {
    label: string;
    value: string;
}

export interface ScheduleItem {
    week_day: string;
    from: string;
    to: string;
}

export interface Teacher {
    id: string;
    name: string;
    avatar: string;
    whatsapp: string;
    bio: string;
    subject: string;
    cost: number;
}

export interface Class {
    name: string;
    avatar: string;
    whatsapp: string;
    bio: string;
    subject: string;
    cost: string;
    schedules: Array<ScheduleItem>;
}