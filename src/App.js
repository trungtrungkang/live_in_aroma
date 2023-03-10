import lp1 from './images/lp1.png';
import lp2 from './images/lp2.png';
import lp3 from './images/lp3.png';

function App() {
  return (
    <div className="App">
      <div>
        <img src={lp1} alt="Live In Aroma p1" />
      </div>
      <div>
        <img src={lp2} alt="Live In Aroma p2" />
      </div>
      <div>
        <img src={lp3} alt="Live In Aroma p3" />
      </div>
    </div>
  );
}

export default App;
