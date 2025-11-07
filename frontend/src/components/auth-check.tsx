import { Navigate } from 'react-router-dom';
import { useAuthStore } from '@/store/use-auth-store';

export const AuthCheck = ({ children }: { children: React.ReactNode }) => {
	const { isAuthenticated } = useAuthStore();
	if (!isAuthenticated) {
		return <Navigate to="/login" />;
	}
	return children;
};
