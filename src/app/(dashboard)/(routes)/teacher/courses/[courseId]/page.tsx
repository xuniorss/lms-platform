import { IconBadge } from '@/components/IconBadge'
import { prismadb } from '@/lib/prismadb'
import { auth } from '@clerk/nextjs'
import { LayoutDashboard } from 'lucide-react'
import { redirect } from 'next/navigation'
import { DescriptionForm } from './_components/description-form'
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
	})

	if (!course) return redirect('/')

	const requiredFields = [
		course.title,
		course.description,
		course.imageUrl,
		course.price,
		course.categoryId,
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
				</div>
			</section>
		</section>
	)
}
