import './App.css';
import PokemonGallery from './components/PokemonGallery';
import { PokemonProvider } from '../contexts/PokemonContext';


const App = () => {
  return (
    <div className="App">
      <h1>Pokémon App</h1>
      <PokemonProvider>
        <PokemonGallery />
      </PokemonProvider>
    </div>
  );
};

export default App;
