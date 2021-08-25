import Link from "next/link"
import { makeStyles } from "@material-ui/core"
import { useCity } from "../../lib/Context/CityCTX"

const useStyles = makeStyles((theme) => ({
	bread: {
		marginBottom: '32px',
		marginTop: '20px',
		[theme.breakpoints.down("1080")]: {
			marginBottom: "0px"
		}
	},
	breadActiveItem: {
		color: "#2C2C2C",
		height: '16px',
	}
}))

export default function BreadCrumbs({ data, /**product = false**/ }) {
	const classes = useStyles()

	const {city} = useCity();

	return (
		<div className={classes.bread}>
			<div className="clientPage__breadcrumbs thin">
				{data == undefined ? null : <Link href="/">
					<a className="breadCrumb light">{city}</a>
				</Link>
				}
				{data == undefined ? null : data.map((item, index) => {
					const title = item.label[0].toUpperCase() + item.label.substring(1,)
					return (
						// index == data.length - 1 && product == false ?
						// 	<a className={`breadCrumb light line ${classes.breadActiveItem}`}>{title}</a>
						// 	:
							<Link key={index + 1} href={`/search/${item.alias}`}>
								<a className={`breadCrumb light line ${index == data.length - 1 ? classes.breadActiveItem : ''}`}>{title}</a>
							</Link>
					)
				})}
				{/* {product ?
					<Link href="#">
						<a className={`breadCrumb light line ${classes.breadActiveItem}`}>{product}</a>
					</Link> : null} */}
			</div>
		</div>
	)
}