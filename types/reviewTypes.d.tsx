import type { User } from './userTypes';

export interface ReviewTypes {
    _id: string;
    user: User;
    book: string;
    rating: number;
    title: string;
    comment: string;
    isActive: boolean;
    likes: any[];
    dislikes: any[];
    isSpoiler: boolean;
    visibility: string;
    createdAt: string;
    updatedAt: string;
    __v: number;
}