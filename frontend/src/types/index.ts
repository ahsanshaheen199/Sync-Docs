import type { LucideIcon } from 'lucide-react';

export interface ToolbarButtonProps {
	icon: LucideIcon;
	onClick?: () => void;
	isActive?: boolean;
}

export type HeadingValue = 1 | 2 | 3 | 4 | 5 | 6 | 0;

export interface AuthState {
	user: User | undefined;
	isAuthenticated: boolean;
	login: (user: User) => void;
	logout: () => void;
}

export interface User {
	id: string;
	firstName: string;
	lastName: string;
	email: string;
	createdAt: Date;
	updatedAt: Date;
	avatarUrl: string;
}
