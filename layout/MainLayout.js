import Footer from "../components/Footer";
import Header from "../components/Header";
import Head from 'next/head';

const MainLayout = ({ children, title = '', footer }) => {
    return (
        <>
            <Head>
                <title>KVIK {title}</title>
            </Head>
            <Header />
            <>
                {children}
            </>
            {!footer && <Footer />}
        </>
    )
}

export default MainLayout;