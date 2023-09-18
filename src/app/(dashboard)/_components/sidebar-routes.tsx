'use client'

import { Compass, Layout, LucideIcon } from 'lucide-react'
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

export const SidebarRoutes = () => {
	const routes = guestRoutes

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
