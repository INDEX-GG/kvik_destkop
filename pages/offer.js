import MetaLayout from "../layout/MetaLayout";
import policyJson from '../components/json/policy.json';
import PolicyContent from "../components/PolicyContent";

function Offer() {

	const {policy} = policyJson

	return (
		<div className='offer'>
		 	<MetaLayout title={'Палитика'}>
				<div className='offerPage'>
					<div className='offerPage__policy'>
						{policy.map((item, index) => <PolicyContent key={index} policy={item} id={index + 1}/>)}
					</div>
				</div>
			</MetaLayout>
		</div>
	)
}

export default Offer