import {
	createBrowserRouter,
	redirect,
	RouterProvider,
} from 'react-router-dom';
import { Home } from '@/pages/home';
import { Document } from '@/pages/document';
import { Suspense } from 'react';
import { useAuthStore } from './store/use-auth-store';
import { AuthCheck } from './components/auth-check';
import { Toaster } from './components/ui/sonner';

function App() {
	const router = createBrowserRouter([
		{
			path: '/',
			element: (
				<AuthCheck>
					<Home />
				</AuthCheck>
			),
		},
		{
			path: '/documents/:id',
			element: (
				<AuthCheck>
					<Document />
				</AuthCheck>
			),
		},
		{
			path: '/login',
			async lazy() {
				const { Login } = await import('@/pages/login');
				return { Component: Login };
			},
			loader: async () => {
				const { isAuthenticated } = useAuthStore.getState();
				if (isAuthenticated) {
					return redirect('/');
				}
				return null;
			},
		},
		{
			path: '/signup',
			async lazy() {
				const { Signup } = await import('@/pages/signup');
				return { Component: Signup };
			},
			loader: async () => {
				const { isAuthenticated } = useAuthStore.getState();
				if (isAuthenticated) {
					return redirect('/');
				}
				return null;
			},
		},
	]);

	return (
		<Suspense
			fallback={
				<div className="flex h-screen w-screen items-center justify-center">
					<div className="border-primary h-10 w-10 animate-spin rounded-full border-2 border-t-transparent" />
				</div>
			}
		>
			<RouterProvider router={router} />
			<Toaster />
		</Suspense>
	);
}

export default App;
