import { cn } from '@/lib/utils';
import {
	Carousel,
	CarouselContent,
	CarouselItem,
	CarouselNext,
	CarouselPrevious,
} from '../ui/carousel';
import { useState } from 'react';
import { apiFetch } from '@/lib/api-fetch';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

const templates = [
	{
		id: 'blank',
		name: 'Blank document',
		imageUrl: '/blank-document.svg',
		content: '',
	},
	{
		id: 'business-letter',
		name: 'Business Letter',
		imageUrl: '/business-letter.svg',
		content: '',
	},
	{
		id: 'cover-letter',
		name: 'Cover Letter',
		imageUrl: '/cover-letter.svg',
		content: '',
	},
	{
		id: 'letter',
		name: 'Letter',
		imageUrl: '/letter.svg',
		content: '',
	},
	{
		id: 'project-proposal',
		name: 'Project Proposal',
		imageUrl: '/project-proposal.svg',
		content: '',
	},
	{
		id: 'resume',
		name: 'Resume',
		imageUrl: '/resume.svg',
		content: '',
	},
	{
		id: 'software-proposal',
		name: 'Software Proposal',
		imageUrl: '/software-proposal.svg',
		content: '',
	},
];

export function TemplateGallery() {
	const [isCreating, setIsCreating] = useState(false);
	const navigate = useNavigate();

	return (
		<div className="bg-[#F1F3F4]">
			<div className="mx-auto flex max-w-7xl flex-col gap-y-4 px-16 py-6">
				<h3 className="text-base font-normal">Start a new document</h3>
				<Carousel>
					<CarouselContent className="-ml-4">
						{templates.map((template) => (
							<CarouselItem
								className="basis-1/2 pl-4 sm:basis-1/3 md:basis-1/4 lg:basis-1/5 xl:basis-1/6"
								key={template.id}
							>
								<div
									className={cn(
										'flex aspect-3/4 flex-col gap-y-2.5',
										isCreating &&
											'pointer-events-none opacity-50'
									)}
								>
									<button
										className="flex h-full w-full flex-col items-center justify-center gap-y-4 rounded-sm border bg-white transition hover:border-blue-500"
										disabled={isCreating}
										style={{
											backgroundImage: `url(${template.imageUrl})`,
											backgroundSize: 'cover',
											backgroundPosition: 'center',
											backgroundRepeat: 'no-repeat',
										}}
										onClick={async () => {
											setIsCreating(true);
											try {
												const response = await apiFetch(
													'/api/documents',
													{
														method: 'POST',
														body: JSON.stringify({
															title:
																template.name ||
																'Untitled Document',
															content:
																template.content ||
																'',
														}),
													}
												);
												navigate(
													`/documents/${response.data.document.id}`
												);
											} catch (error) {
												toast.error(
													error instanceof Error
														? error.message
														: 'Failed to create document'
												);
											} finally {
												setIsCreating(false);
											}
										}}
									/>
									<p className="truncate text-sm font-medium">
										{template.name}
									</p>
								</div>
							</CarouselItem>
						))}
					</CarouselContent>
					<CarouselPrevious />
					<CarouselNext />
				</Carousel>
			</div>
		</div>
	);
}
