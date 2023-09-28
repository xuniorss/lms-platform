'use client'

import { cn } from '@/lib/utils'
import { Search } from 'lucide-react'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import qs from 'query-string'
import { useDeferredValue, useEffect, useState } from 'react'
import { Input } from '../ui/input'

export const SearchInput = () => {
	const [isFocused, setIsFocused] = useState(false)
	const [value, setValue] = useState('')

	const deferredValue = useDeferredValue(value)

	const searchParams = useSearchParams()
	const router = useRouter()
	const pathname = usePathname()

	const currentCategoryId = searchParams.get('categoryId')

	useEffect(() => {
		const url = qs.stringifyUrl(
			{
				url: pathname,
				query: { categoryId: currentCategoryId, title: deferredValue },
			},
			{ skipEmptyString: true, skipNull: true },
		)

		router.push(url)
	}, [currentCategoryId, deferredValue, pathname, router])

	return (
		<div className="relative">
			<Search className="absolute left-3 top-3 h-4 w-4 text-slate-600" />
			<Input
				placeholder="Procure um curso"
				onFocus={() => setIsFocused(true)}
				onBlur={() => setIsFocused(false)}
				onChange={(e) => setValue(e.target.value)}
				value={value}
				className={cn(
					'rounded-full bg-slate-100 pl-9 transition-all duration-300 focus-visible:ring-slate-200',
					isFocused
						? 'w-full md:w-[18.75rem]'
						: 'w-[18.75rem] md:w-[15.625rem] ',
				)}
			/>
		</div>
	)
}
