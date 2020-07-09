export interface IProfile {
    userId: string;
    name: string;
    avatar: string;
    habits: string;
    experience: number;
    friends: string[];
}

export type Timestamp = number;

export interface ISuccess {
    day: Timestamp;
    count?: number;
}

export interface IHabit {
    id: string;
    name: string;
    startAt: Timestamp;
    endsAt?: Timestamp;
    success: ISuccess[];
    status: 'active' | 'archive';
    fixingDays: number;
    inRow: boolean;
}

export interface IHabitDate {
    id: string;
    name: string;
    startAt: string;
    endsAt?: Timestamp;
    success: ISuccess[];
    status: 'active' | 'archive';
    fixingDays: number;
    inRow: boolean;
}
