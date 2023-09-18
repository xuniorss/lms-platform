'use client'

import { cn } from '@/lib/utils'
import { usePathname, useRouter } from 'next/navigation'
import { memo } from 'react'
import { RouteProps } from './sidebar-routes'

interface SideberItemProps extends RouteProps {}

export const SidebarItem = memo(
	({ icon: Icon, label, href }: SideberItemProps) => {
		const pathname = usePathname()
		const router = useRouter()

		const isActive =
			(pathname === '/' && href === '/') ||
			pathname === href ||
			pathname?.startsWith(`${href}/`)

		const onClick = () => router.push(href)

		return (
			<button
				onClick={onClick}
				type="button"
				aria-label={`button ${label}`}
				aria-current={isActive ? 'page' : undefined}
				className={cn(
					'flex items-center gap-x-2 pl-6 text-sm font-[500] text-slate-500 transition-all hover:bg-slate-300/20 hover:text-slate-600',
					isActive &&
						'bg-sky-200/20 text-sky-700 hover:bg-sky-200/20 hover:text-sky-700',
				)}
			>
				<span className="flex items-center gap-x-2 py-4">
					<Icon
						size={22}
						className={cn('text-slate-500', isActive && 'text-sky-700')}
					/>
					{label}
				</span>
				<span
					className={cn(
						'ml-auto h-full border-2 border-sky-700 opacity-0 transition-all',
						isActive && 'opacity-100',
					)}
				/>
			</button>
		)
	},
)

SidebarItem.displayName = 'SidebarItem'
