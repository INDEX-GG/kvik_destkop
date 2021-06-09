import Footer from "../components/Footer";
import Header from "../components/Header";
import UpPanel from "../components/UpPanel";
import Head from 'next/head';

const MainLayout = ({children , title = ''}) => {
    return (
        <>
            <Head>
                <title>KVIK {title}</title>
            </Head>
            <UpPanel />
            <Header />
            <>
                {children}
            </>
            <Footer />
        </>
    )
}

export default MainLayout;