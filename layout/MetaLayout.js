import Head from "next/head";

const MetaLayout = ({children, title = "" }) => {

	return (
	  <>
		<Head>
		  <title>KVIK {title}</title>
		</Head>
		  {children}
	  </>
	);
  };
  
  export default MetaLayout;