import Link from "next/link"
import { makeStyles } from "@material-ui/core"
import { useCity } from "../../lib/Context/CityCTX"

const useStyles = makeStyles((theme) => ({
	bread: {
		marginBottom: '32px',
		marginTop: '25px',
		[theme.breakpoints.down("1080")]: {
			marginBottom: "0px"
		}
	},
	breadActiveItem: {
		color: "#2C2C2C",
		height: '16px',
	}
}))

export default function BreadCrumbs({ data, /**productV2 = false,**/ searchData }) {
	const classes = useStyles()

	const {city} = useCity();

	return (
		<div className={classes.bread}>
			<div className="clientPage__breadcrumbs thin">
				{data ?
				<Link href="/">
					<a className="breadCrumb light">{city}</a>
				</Link> : null
				}
				{data ?
				data.map((item, index) => {
					const title = item.label[0].toUpperCase() + item.label.substring(1,)
					return (
						<Link key={item.alias + index} href={`/search/${item.alias}`}>
							<a className={`breadCrumb light line 
							${index === data?.length - 1 && !searchData ? classes.breadActiveItem : ''}`}>
								{title}
							</a>
						</Link>
					)
				}) : null}
				{searchData &&
				<a className={`breadCrumb light line ${classes.breadActiveItem}`}>{searchData}</a>}
				{/* {productV2 ?
					<Link href="#">
						<a className={`breadCrumb light line ${classes.breadActiveItem}`}>{productV2}</a>
					</Link> : null} */}
			</div>
		</div>
	)
}
