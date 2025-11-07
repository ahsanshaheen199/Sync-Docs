import { Navbar } from '@/components/home/navbar';
import { TemplateGallery } from '@/components/home/template-gallery';
import { useAuthStore } from '@/store/use-auth-store';

export function Home() {
	const { user } = useAuthStore();
	console.log(user);
	return (
		<div className="flex min-h-screen flex-col">
			<div className="fixed top-0 right-0 left-0 z-10 h-16 bg-white p-4">
				<Navbar />
			</div>
			<div className="mt-16">
				<TemplateGallery />
			</div>
		</div>
	);
}
