import { CourseWithProgressWithCategory } from '@/actions/get-courses'

import { CourseCard } from '../CourseCard'

interface CoursesListProps {
	items: CourseWithProgressWithCategory[]
}

export const CoursesList = ({ items }: CoursesListProps) => {
	return (
		<article>
			<section className="grid gap-4 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-4">
				{items.map((item) => (
					<CourseCard
						key={item.id}
						id={item.id}
						title={item.title}
						imageUrl={item.imageUrl!}
						chaptersLength={item.chapters.length}
						price={item.price!}
						progress={item.progress}
						category={item?.category?.name!}
					/>
				))}
			</section>
			{items.length === 0 && (
				<span className="mt-10 text-center text-sm text-muted-foreground">
					Nenhum curso encontrado.
				</span>
			)}
		</article>
	)
}
