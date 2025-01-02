import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Navbar from "./Components/Navbar/Navbar";
import Slider from "./Components/Slider/Slider";
import FormComponent from "./Components/Forms/Forms";
import Popup from "./Components/popupVideo/Popup";
import Footer from "./Components/Footer/Footer";
import DisplayCards from "./Components/displayCards/DisplayCards";
import Passion from "./Components/Passion/Passion";

function App() {
  return (
    <div className="App">
      <Navbar />
      <Slider />
      <div className="container">
        <DisplayCards/>
        <Passion/>
        <Popup />
        <FormComponent />
      </div>
      <Footer />
      
    </div>
  );
}

export default App;
