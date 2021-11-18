import withSession from '../../lib/session'

export default withSession(async (req, res) => {
  const user = await req.body
  console.log(user);
  try {
    req.session.set('user', user)
    await req.session.save()
    res.json(user)
  } catch (error) {
    const { response: fetchResponse } = error
    res.status(fetchResponse?.status || 500).json(error.data)
  }
})