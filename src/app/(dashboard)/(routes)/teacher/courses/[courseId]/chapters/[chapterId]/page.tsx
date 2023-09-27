import { IconBadge } from '@/components/IconBadge'
import { prismadb } from '@/lib/prismadb'
import { auth } from '@clerk/nextjs'
import { ArrowLeft, LayoutDashboard } from 'lucide-react'
import Link from 'next/link'
import { redirect } from 'next/navigation'
import { ChapterDescriptionForm } from './_components/chapter-description-form'
import { ChapterTitleForm } from './_components/chapter-title-form'

export default async function ChapterIdPage({
	params,
}: {
	params: { courseId: string; chapterId: string }
}) {
	const { userId } = auth()

	if (!userId) return redirect('/')

	const chapter = await prismadb.chapter.findUnique({
		where: { id: params.chapterId, courseId: params.courseId },
		include: { muxData: true },
	})

	if (!chapter) return redirect('/')

	const requiredFields = [chapter.title, chapter.description, chapter.videoUrl]

	const totalFields = requiredFields.length
	const completedFields = requiredFields.filter(Boolean).length

	const completionText = `(${completedFields}/${totalFields})`

	return (
		<section className="p-6">
			<div className="flex items-center justify-between">
				<div className="w-full">
					<Link
						href={`/teacher/courses/${params.courseId}`}
						className="mb-6 flex items-center text-sm transition hover:opacity-75"
					>
						<ArrowLeft className="mr-2 h-4 w-4" />
						Voltar para a configuração do curso
					</Link>
					<section className="flex w-full items-center justify-between">
						<div className="flex flex-col gap-y-2">
							<h1 className="text-2xl font-medium">
								Criação de Capítulo
							</h1>
							<span className="text-sm text-slate-700">
								Preencha todos os campos {completionText}
							</span>
						</div>
					</section>
				</div>
			</div>
			<section className="mt-16 grid grid-cols-1 gap-6 md:grid-cols-2">
				<div className="space-y-4">
					<div>
						<div className="flex items-center gap-x-2">
							<IconBadge icon={LayoutDashboard} />
							<h2 className="text-xl">Personalize seu capítulo</h2>
						</div>
						<ChapterTitleForm
							initialData={chapter}
							courseId={params.courseId}
							chapterId={params.chapterId}
						/>
						<ChapterDescriptionForm
							initialData={chapter}
							courseId={params.courseId}
							chapterId={params.chapterId}
						/>
					</div>
				</div>
			</section>
		</section>
	)
}
