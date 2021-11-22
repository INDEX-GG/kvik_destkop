import withSession from '../../lib/session'

export default withSession(async (req, res) => {
	const user = req.session.get('user')
	if (user) {
		res.json({id: user.id})
	} else {
		res.json(
			{message: 'empty'}
		)
	}
})