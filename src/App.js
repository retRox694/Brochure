import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Navbar from "./Components/Navbar/Navbar";
import Slider from "./Components/Slider/Slider";
import FormComponent from "./Components/Forms/Forms";
import DisplayCards from "./Components/displayCards/DisplayCards";
import Popup from "./Components/popupVideo/Popup";
import Footer from "./Components/Footer/Footer";

function App() {
  return (
    <div className="App">
      <Navbar />
      <Slider />
      <div className="container">
        <DisplayCards />
        <FormComponent />
        <Popup />
      </div>
      <Footer/>
    </div>
  );
}

export default App;
