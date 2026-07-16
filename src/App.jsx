import { Home } from "./pages/Home";
import { WhyChooseUsSection } from "./pages/Choose"
import { ShoppingSteps } from "./pages/ShoppingSteps";
import { Testimonials } from "./pages/Testimonials";
import { Newsletter } from "./pages/Newsletter";
import { Footer } from "./pages/Footer";
import { CategoriesSection } from "./pages/Categories";

function App() {

  return (
    <>
      < Home />
      < CategoriesSection />
      < WhyChooseUsSection />
      < ShoppingSteps />
      < Testimonials />
      < Newsletter />
      < Footer />
    </>
  )
}

export default App
