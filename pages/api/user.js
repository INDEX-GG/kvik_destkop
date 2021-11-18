import withSession from '../../lib/session'

export default withSession(async (req, res) => {
	const user = req.session.get('user')
	console.log(req)
	if (user) {
		res.json({
			...user
		})
	} else {
		res.json(
			{message: 'empty'}
		)
	}
})