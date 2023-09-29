import { getChapter } from '@/actions/get-chapters'
import { Banner } from '@/components/Banner'
import { Preview } from '@/components/Preview'
import { Separator } from '@/components/ui/separator'
import { auth } from '@clerk/nextjs'
import { File } from 'lucide-react'
import { redirect } from 'next/navigation'
import { CourseEnrollButton } from './_components/course-enroll-button'
import { VideoPlayer } from './_components/video-player'

export default async function ChapterIdPage({
	params,
}: {
	params: { courseId: string; chapterId: string }
}) {
	const { userId } = auth()

	if (!userId) return redirect('/')

	const {
		chapter,
		course,
		muxData,
		attachments,
		nextChapter,
		userProgress,
		purchase,
	} = await getChapter({
		userId,
		chapterId: params.chapterId,
		courseId: params.courseId,
	})

	if (!chapter || !course) return redirect('/')

	const isLocked = !chapter.isFree && !purchase
	const completeOnEnd = !!purchase && !userProgress?.isCompleted

	return (
		<div>
			{userProgress?.isCompleted && (
				<Banner
					variant="success"
					label="Você já completou este capítulo."
				/>
			)}
			{isLocked && (
				<Banner
					variant="warning"
					label="Você precisa adquirir este curso para assistir a este capítulo."
				/>
			)}
			<div className="mx-auto flex max-w-4xl flex-col pb-20">
				<div className="p-4">
					<VideoPlayer
						chapterId={params.chapterId}
						title={chapter.title}
						courseId={params.courseId}
						nextChapterId={nextChapter?.id}
						playbackId={muxData?.playbackId!}
						isLocked={isLocked}
						completeOnEnd={completeOnEnd}
					/>
				</div>
				<div>
					<div className="flex flex-col items-center justify-between p-4 md:flex-row">
						<h2 className="mb-2 text-2xl font-semibold">
							{chapter.title}
						</h2>
						{purchase ? (
							<>
								{/*   <CourseProgressButton
                          chapterId={params.chapterId}
                          courseId={params.courseId}
                          nextChapterId={nextChapter?.id}
                          isCompleted={!!userProgress?.isCompleted}
                        /> */}
							</>
						) : (
							<CourseEnrollButton
								courseId={params.courseId}
								price={course.price!}
							/>
						)}
					</div>
					<Separator />
					<div>
						<Preview value={chapter.description!} />
					</div>
					{!!attachments.length && (
						<>
							<Separator />
							<div className="p-4">
								{attachments.map((attachment) => (
									<a
										href={attachment.url}
										target="_blank"
										key={attachment.id}
										className="flex w-full items-center rounded-md border bg-sky-200 p-3 text-sky-700 hover:underline"
									>
										<File />
										<p className="line-clamp-1">{attachment.name}</p>
									</a>
								))}
							</div>
						</>
					)}
				</div>
			</div>
		</div>
	)
}
