'use client'

import { BarChart, Compass, Layout, List, LucideIcon } from 'lucide-react'
import { usePathname } from 'next/navigation'
import { SidebarItem } from './sidebar-item'

export type RouteProps = {
	icon: LucideIcon
	label: string
	href: string
}

const guestRoutes: RouteProps[] = [
	{ icon: Layout, label: 'Dashboard', href: '/' },
	{ icon: Compass, label: 'Navegar', href: '/search' },
]

const teacherRoutes: RouteProps[] = [
	{ icon: List, label: 'Cursos', href: '/teacher/courses' },
	{ icon: BarChart, label: 'Análise', href: '/teacher/analytics' },
]

export const SidebarRoutes = () => {
	const pathname = usePathname()

	const isTeacherPage = pathname?.includes('/teacher')

	const routes = isTeacherPage ? teacherRoutes : guestRoutes

	return (
		<div className="flex w-full flex-col">
			{routes.map((route) => (
				<SidebarItem
					key={route.href}
					icon={route.icon}
					label={route.label}
					href={route.href}
				/>
			))}
		</div>
	)
}
