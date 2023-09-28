import { SearchInput } from '@/components/SearchInput'
import { prismadb } from '@/lib/prismadb'
import { Categories } from './_components/categories'

export default async function SearchPage() {
	const categories = await prismadb.category.findMany({
		orderBy: { name: 'asc' },
	})

	return (
		<>
			<div className="block px-6 pt-6 md:mb-0 md:hidden">
				<SearchInput />
			</div>
			<div className="space-y-4 p-6">
				<Categories items={categories} />
				{/* <CoursesList items={courses} /> */}
			</div>
		</>
	)
}
