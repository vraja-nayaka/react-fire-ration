export interface IProfile {
    name: string;
    avatar: string;
    habits: string;
    experience: number;
}

export interface IHabit {
    name: string;
    startAt: Date;
    expiredAt?: Date;
    success?: Array<{day: Date, count?: number}>;
}
