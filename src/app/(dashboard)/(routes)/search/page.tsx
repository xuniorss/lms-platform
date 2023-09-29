import { getCourses } from '@/actions/get-courses'
import { CoursesList } from '@/components/CoursesList'
import { SearchInput } from '@/components/SearchInput'
import { prismadb } from '@/lib/prismadb'
import { auth } from '@clerk/nextjs'
import { redirect } from 'next/navigation'

import { Categories } from './_components/categories'

interface SearchParamsProps {
	searchParams: { title: string; categoryId: string }
}

export default async function SearchPage({ searchParams }: SearchParamsProps) {
	const { userId } = auth()

	if (!userId) return redirect('/')

	const categories = await prismadb.category.findMany({
		orderBy: { name: 'asc' },
	})

	const courses = await getCourses({ userId, ...searchParams })

	return (
		<>
			<div className="block px-6 pt-6 md:mb-0 md:hidden">
				<SearchInput />
			</div>
			<div className="space-y-4 p-6">
				<Categories items={categories} />
				<CoursesList items={courses} />
			</div>
		</>
	)
}
