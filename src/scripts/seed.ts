const { PrismaClient } = require('@prisma/client')

const database = new PrismaClient()

async function main() {
	try {
		await database.category.createMany({
			data: [
				{ name: 'Ciência da Computação' },
				{ name: 'Música' },
				{ name: 'Fitness' },
				{ name: 'Fotografia' },
				{ name: 'Contabilidade' },
				{ name: 'Engenharia' },
				{ name: 'Filmando' },
			],
		})

		console.log('Sucesso')
	} catch (error) {
		console.error('Erro ao propagar as categorias do banco de dados', error)
	} finally {
		await database.$disconnect()
	}
}

main()
