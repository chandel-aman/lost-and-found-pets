import MainHeader from "../components/navigation/Navigation/MainHeader";
import Pets from "../pages/Pets";
import Footer from "../section/footer/Footer";
import Hero from "../section/hero/Hero";
import LostAndFound from "../section/lost&found/LostAndFound";
import SearchBox from "../section/search/SearchBox";

import classes from "./Home.module.css";

const Home = () => {
  return (
    <div className={classes.home}>
      <Hero />
      <LostAndFound />
      <SearchBox />
      <Footer/>
    </div>
  );
};

export default Home;
