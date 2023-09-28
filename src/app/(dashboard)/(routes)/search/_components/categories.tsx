'use client'

import { Category } from '@prisma/client'

import { IconType } from 'react-icons'
import {
	FcEngineering,
	FcFilmReel,
	FcMultipleDevices,
	FcMusic,
	FcOldTimeCamera,
	FcSalesPerformance,
	FcSportsMode,
} from 'react-icons/fc'
import { CategoryItem } from './category-item'

interface CategoriesProps {
	items: Category[]
}

const iconMap: Record<Category['name'], IconType> = {
	Música: FcMusic,
	Fotografia: FcOldTimeCamera,
	Fitness: FcSportsMode,
	Contabilidade: FcSalesPerformance,
	'Ciência da Computação': FcMultipleDevices,
	Filmando: FcFilmReel,
	Engenharia: FcEngineering,
}

export const Categories = ({ items }: CategoriesProps) => {
	return (
		<div className="flex items-center gap-x-2 overflow-x-auto pb-2">
			{items.map((item) => (
				<CategoryItem
					key={item.id}
					label={item.name}
					icon={iconMap[item.name]}
					value={item.id}
				/>
			))}
		</div>
	)
}
