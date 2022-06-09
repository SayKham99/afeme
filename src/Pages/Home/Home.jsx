import React from "react";

// IMPORT COMPONENTS
import Loader from "../../Components/Loader/Loader"
import Header from "../../Components/Header/Header";
import Nav from "../../Components/Nav/Nav";
import Hero from "../../Components/Hero/Hero";
import Categories from "../../Components/Categories/Categories";
import Main from "../../Components/Main/Main";
import WhyAfeme from "../../Components/WhyAfeme/WhyAfeme";
import Carousel from "../../Components/Carousel/Carousel"
import AfemePhone from "../../Components/AfemePhone/AfemePhone"
import Footer from "../../Components/Footer/Footer"

// IMPORT IMG
import Partners1 from "../../Assets/Img/partners1.jpg";
import Partners2 from "../../Assets/Img/partners2.jpg";
import Partners3 from "../../Assets/Img/partners3.jpg";
import Partners4 from "../../Assets/Img/partners4.jpg";
import Container from "../../Components/Container/Container";

function Home() {

    const data = {
        images: [Partners1, Partners2, Partners3, Partners4],
    }
    return (
        <>
            <Header />
            <Nav />
            <Hero />
            <Categories />
            <Main />
            <WhyAfeme />
            <Container>
                <Carousel data={data} type="loop"/>
            </Container>
            <AfemePhone />
            <Footer />
        </>
    )
}

export default Home;