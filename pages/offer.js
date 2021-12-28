import policyJson from '../components/json/policy.json';
import PolicyContent from "../components/PolicyContent";
import { NextSeo } from "next-seo";
import { createSEOProps } from "#lib/seo";

const seoProps = createSEOProps({ 
	title: "Политика",
	link: "/offer"
});

function Offer() {
	const { policy } = policyJson

	return (<>
		<NextSeo {...seoProps} />
		<div className='offer'>
			<div className='offerPage'>
				<div className='offerPage__policy'>
					{policy.map((item, index) => <PolicyContent key={index} policy={item} id={index + 1} />)}
				</div>
			</div>
		</div>
	</>
	)
}

export default Offer