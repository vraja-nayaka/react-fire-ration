export interface IProfile {
    name: string;
    avatar: string;
    habits: string;
    experience: number;
}

export interface IHabit<P> {
    name: string;
    startAt: P;
    expiredAt?: P;
    success: Array<{ day: P, count?: number }>;
    status: 'active' | 'archive';
}

export interface ITime {
    nanoseconds: number;
    seconds: number;
}