export interface IProfile {
    name: string;
    avatar: string;
    habits: string;
    experience: number;
}

export type Timestamp = number;

export interface ISuccess {
    day: Timestamp;
    count?: number;
}

export interface IHabit {
    name: string;
    startAt: Timestamp;
    expiredAt?: Timestamp;
    success: ISuccess[];
    status: 'active' | 'archive';
}
