import './App.css';
import RoutesAdmin from './routes/RoutesAdmin';
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "../node_modules/font-awesome/css/font-awesome.min.css";
import "../node_modules/bootstrap/dist/js/bootstrap.bundle.min";
import "@fontsource/open-sans";
import 'mapbox-gl/dist/mapbox-gl.css';

function App() {
  return (
    <div className="App">
      <RoutesAdmin />
    </div>
  );
}

export default App;
