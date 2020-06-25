export interface IProfile {
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
    expiredAt?: Timestamp;
    success: ISuccess[];
    status: 'active' | 'archive';
}
