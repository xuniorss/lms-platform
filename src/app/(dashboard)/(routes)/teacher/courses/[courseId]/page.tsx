import { IconBadge } from '@/components/IconBadge'
import { prismadb } from '@/lib/prismadb'
import { auth } from '@clerk/nextjs'
import {
	CircleDollarSign,
	File,
	LayoutDashboard,
	ListChecks,
} from 'lucide-react'
import { redirect } from 'next/navigation'

import { AttachmentForm } from './_components/attachment-form'
import { CategoryForm } from './_components/category-form'
import { ChaptersForm } from './_components/chapters-form'
import { DescriptionForm } from './_components/description-form'
import { ImageForm } from './_components/image-form'
import { PriceForm } from './_components/price-form'
import { TitleForm } from './_components/title-form'

export default async function CourseIdPage({
	params,
}: {
	params: { courseId: string }
}) {
	const { userId } = auth()

	if (!userId) return redirect('/')

	const course = await prismadb.course.findUnique({
		where: { id: params.courseId },
		include: {
			chapters: { orderBy: { position: 'asc' } },
			attachments: { orderBy: { createdAt: 'desc' } },
		},
	})

	const categories = await prismadb.category.findMany({
		orderBy: { name: 'asc' },
	})

	if (!course) return redirect('/')

	const requiredFields = [
		course.title,
		course.description,
		course.imageUrl,
		course.price,
		course.categoryId,
		course.chapters.some((chapter) => chapter.isPublished),
	]

	const totalFields = requiredFields.length
	const completedFields = requiredFields.filter(Boolean).length

	const completionText = `(${completedFields}/${totalFields})`

	return (
		<section className="p-6">
			<section className="flex items-center justify-between">
				<div className="flex flex-col gap-y-2">
					<h1 className="text-2xl font-medium">Configuração do curso</h1>
					<span className="text-sm text-slate-700">
						Preencha todos os campos {completionText}
					</span>
				</div>
			</section>
			<section className="mt-16 grid grid-cols-1 gap-6 md:grid-cols-2">
				<div>
					<div className="flex items-center gap-x-2">
						<IconBadge icon={LayoutDashboard} />
						<h2 className="text-xl">Personalize seu curso</h2>
					</div>
					<TitleForm initialData={course} courseId={course.id} />
					<DescriptionForm initialData={course} courseId={course.id} />
					<ImageForm initialData={course} courseId={course.id} />
					<CategoryForm
						initialData={course}
						courseId={course.id}
						options={categories.map((category) => ({
							label: category.name,
							value: category.id,
						}))}
					/>
				</div>
				<div className="space-y-6">
					<section>
						<div className="flex items-center gap-x-2">
							<IconBadge icon={ListChecks} />
							<h2 className="text-xl">Capítulos do curso</h2>
						</div>
						<ChaptersForm initialData={course} courseId={course.id} />
					</section>
					<section>
						<div className="flex items-center gap-x-2">
							<IconBadge icon={CircleDollarSign} />
							<h2 className="text-xl">Venda seu curso</h2>
						</div>
						<PriceForm initialData={course} courseId={course.id} />
					</section>
					<section>
						<div className="flex items-center gap-x-2">
							<IconBadge icon={File} />
							<h2 className="text-xl">Recursos & Anexos</h2>
						</div>
						<AttachmentForm initialData={course} courseId={course.id} />
					</section>
				</div>
			</section>
		</section>
	)
}
