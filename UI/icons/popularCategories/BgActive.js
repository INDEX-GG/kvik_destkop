const BgActive = ({color='#e9e9e9'}) => {
	return (
		<svg width="160" height="160" fill="none" xmlns="http://www.w3.org/2000/svg">
			<circle cx="151" cy="117" r="2" fill={color}/>
			<circle cx="33.5" cy="146.5" r="8.5" fill={color}/>
			<circle cx="137.5" cy="140.5" r="5.5" fill={color}/>
			<circle cx="146" cy="127" r="3" fill={color}/>
			<circle cx="15.5" cy="130.5" r="11.5" fill={color}/>
			<circle cx="17.5" cy="18.5" r="13.5" fill={color}/>
			<circle cx="80" cy="80" r="69" fill={color}/>
		</svg>
	)
}
export default BgActive;