namespace API {
	interface User {
		name: string
		about?: null
		address?: string
		createdAt: string
		email?: string
		favorites: Favorite[]
		phone: string
		raiting?: null
		subscriptions: []
		userChatPhoto: string
		userPhoto: string
		location: Location
	}

	interface Location {
		name: string
		geo: [number, number]
	}
	interface Favorite { }
}