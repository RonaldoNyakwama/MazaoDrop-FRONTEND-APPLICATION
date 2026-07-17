import { Home } from "./pages/Home";
import { WhyChooseUsSection } from "./pages/Choose"
import { ShoppingSteps } from "./pages/ShoppingSteps";
import { Testimonials } from "./pages/Testimonials";
import { Newsletter } from "./pages/Newsletter";
import { Footer } from "./pages/Footer";
import { CategoriesSection } from "./pages/Categories";
import { HandpickedProducts } from "./pages/HandpickedProducts";
import { Navbar } from "./components/Navbar";

function App() {

  return (
    <>
      < Navbar />
      < Home />
      < CategoriesSection />
      < HandpickedProducts />
      < WhyChooseUsSection />
      < ShoppingSteps />
      < Testimonials />
      < Newsletter />
      < Footer />
    </>
  )
}

export default App
