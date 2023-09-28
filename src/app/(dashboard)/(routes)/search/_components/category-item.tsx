'use client'

import { cn } from '@/lib/utils'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import qs from 'query-string'
import { memo } from 'react'
import { IconType } from 'react-icons'

interface CategoryItemProps {
	label: string
	value?: string
	icon?: IconType
}

export const CategoryItem = memo(
	({ label, value = '', icon: Icon }: CategoryItemProps) => {
		const pathname = usePathname()
		const router = useRouter()
		const searchParams = useSearchParams()

		const currentCategoryId = searchParams.get('categoryId')
		const currentTitle = searchParams.get('title')

		const isSelected = currentCategoryId === value

		const onClick = () => {
			const url = qs.stringifyUrl(
				{
					url: pathname,
					query: {
						title: currentTitle,
						categoryId: isSelected ? null : value,
					},
				},
				{ skipNull: true, skipEmptyString: true },
			)

			router.push(url)
		}

		return (
			<button
				type="button"
				aria-label={`button ${label}`}
				onClick={onClick}
				className={cn(
					'flex items-center gap-x-1 rounded-full border border-slate-200 px-3 py-2 text-sm transition hover:border-sky-700',
					isSelected && 'border-sky-700 bg-sky-200/20 text-sky-800',
				)}
			>
				{Icon && <Icon size={20} />}
				<span className="truncate">{label}</span>
			</button>
		)
	},
)

CategoryItem.displayName = 'CategoryItem'
