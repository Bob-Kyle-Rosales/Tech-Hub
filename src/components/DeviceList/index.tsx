import PropTypes from 'prop-types';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './styles.css';
import { NavLink } from 'react-router-dom';
import MyButton from '../Button';
import Card from '../Card';
import { DeviceListProps, Device } from '../../interface/types';

function DeviceList({ devices }: DeviceListProps): JSX.Element {
  const renderSlides = (): JSX.Element[] =>
    devices.map((device: Device) => (
      <div key={device.id}>
        <Card className="flex-col justify-center items-center hover:opacity-90 cursor-pointer">
          <NavLink to={`/${device.type}/${device.id}`}>
            <div className="slide-content">
              <img
                src={device.thumb}
                alt={device.title}
                className="slide-image"
              />
              <h3 className="slide-title">{device.title}</h3>
              <p className="slide-price">${device.price}</p>
            </div>
            <MyButton
              variant="contained"
              style={{
                backgroundColor: '#0071E3',
                color: 'white',
                borderRadius: '10px',
                marginTop: '20px',
              }}
            >
              Learn More
            </MyButton>
          </NavLink>
        </Card>
      </div>
    ));

  return (
    <div className="Slider">
      <Slider
        dots
        slidesToShow={3}
        slidesToScroll={2}
        autoplay
        autoplaySpeed={5000}
      >
        {renderSlides()}
      </Slider>
    </div>
  );
}

DeviceList.propTypes = {
  devices: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      type: PropTypes.string.isRequired,
      thumb: PropTypes.string.isRequired,
      price: PropTypes.number.isRequired,
    }),
  ).isRequired,
};

export default DeviceList;
