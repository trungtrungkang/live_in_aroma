import lp1 from './images/lp1_1.png';
import lp2 from './images/lp2.png';
import lp3 from './images/lp3.png';
import qrcodeImage from './images/qrcode_registration_form.png';

function App() {
  return (
    <div>
      <div className="App">
        <div>
          <img src={lp1} alt="Live In Aroma p1" />
        </div>
        <div>
          <img src={lp2} alt="Live In Aroma p2" />
        </div>
        <div>
          <img src={lp3} alt="Live In Aroma p3" />
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', 'justifyContent': 'center', fontWeight: 'bold', gap: 8, padding: 15 }}>
        <div style={{ color: '#ffdf58', fontSize: '2em' }}>ĐỊA CHỈ ĐĂNG KÝ / BOOKING:</div>
        <div style={{ color: 'white', fontSize: '1.5em' }}>Hotlines: 0944422361 / 0398689831</div>
        <div style={{ color: 'white', fontSize: '1.5em' }}>
          <span>Fanpage: </span>
          <a href='https://facebook.com/coffeeandtea.aroma' style={{ color: 'white' }} target='_blank'>facebook.com/coffeeandtea.aroma</a>
        </div>
        <div style={{ color: 'white', fontSize: '1.5em' }}>
          <div>
            <span>Địa chỉ booking: </span>
            <a href='https://docs.google.com/forms/d/e/1FAIpQLSd-9AD_FzLN_rQONQftDAtbknLFOAZSDK5HSu3R6tClttw_cQ/viewform' style={{ color: 'white' }} target='_blank'>Bấm vào đây để đăng ký</a>
          </div>
          <div style={{ marginTop: 8 }}>Hoặc quét mã QR tại đây:</div>
          <div style={{ paddingTop: 8 }}>
            <img src={qrcodeImage} alt="QRCode Registration Form" style={{ width: 100, height: 'auto' }} />
          </div>
        </div>
      </div>
        </div>
      </div>
    </div>
  );
}

export default App;
