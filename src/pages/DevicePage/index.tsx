import { useParams, useNavigate } from 'react-router-dom';
import { useState } from 'react';

import Swal from 'sweetalert2';
import MyButton from '../../components/Button';
import IncrementDecrementBtn from '../../components/IncDecButton';
import CustomAccordion from '../../components/Accordion';

import useDeviceById from '../../hooks/useDeviceById';
import useCart from '../../hooks/useCart';
import useUserStore from '../../hooks/useUser';

import { Product } from '../../interface/types';

function DevicePage({ device }: { device: 'iPad' | 'iPhone' | 'Mac' }) {
  const { id } = useParams<{ id?: string }>();
  const { data, isLoading, error } = useDeviceById(device, id || '');

  // Access the first (and only) object in the array
  const deviceData = data?.[0];

  const { addCart } = useCart();
  const { user } = useUserStore();
  const navigate = useNavigate();

  const [selectedColor, setSelectedColor] = useState<string>('');
  const [selectedStorage, setSelectedStorage] = useState<{
    size: string;
    add_price: string;
  }>();

  const [quantity, setQuantity] = useState<number>(0);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    navigate('/notfound');
    return null;
  }

  if (!data || data.length === 0) {
    navigate('/');
    return null;
  }

  // Processing data from db
  const getGallery = () => {
    if (!data || data.length === 0) return null;

    const validJSONString = data[0].gallery.replace(/'/g, '"');
    const galleryArray = JSON.parse(validJSONString);
    return galleryArray;
  };

  const getProcessor = () => {
    if (!data || data.length === 0) return null;

    const validJSONString = data[0].processor.replace(/'/g, '"');
    const processorArray = JSON.parse(validJSONString);
    return processorArray;
  };

  // Render
  const renderColors = () => {
    const validJSONString = deviceData.color.replace(/'/g, '"');
    const colorsArray = JSON.parse(validJSONString);
    if (selectedColor === '') {
      setSelectedColor(colorsArray[0]);
    }

    return (
      <div>
        {colorsArray.map((color: string) => (
          <MyButton
            style={{
              backgroundColor: color === selectedColor ? '#0071E3' : 'white',
              fontSize: '10px',
              margin: '10px',
              width: '140px',
            }}
            onClick={() => setSelectedColor(color)}
          >
            {color}
          </MyButton>
        ))}
      </div>
    );
  };

  const renderStorage = () => {
    if (!data || data.length === 0) return null;

    const validJSONString = data[0].storage.replace(/'/g, '"');
    const storageArray = JSON.parse(validJSONString);
    if (!selectedStorage) {
      setSelectedStorage(storageArray[0]);
    }

    return (
      <div>
        {storageArray.map((storage: { size: string; add_price: string }) => (
          <MyButton
            key={storage.size}
            style={{
              backgroundColor:
                storage.size === selectedStorage?.size ? '#0071E3' : 'white', // Change background color based on selection
              fontSize: '12px',
              margin: '10px',
              width: '140px',
            }}
            onClick={() => setSelectedStorage(storage)}
          >
            {storage.size} - ${storage.add_price}
          </MyButton>
        ))}
      </div>
    );
  };

  const renderDetailAccordion = () => {
    return (
      <div className="mx-6">
        <p className="font-medium">
          Memory: <span className="font-normal">{deviceData.memory}</span>
        </p>
        <p className="font-medium">
          OS: <span className="font-normal">{deviceData.operating_system}</span>
        </p>
        <p className="font-medium">
          Chip: <span className="font-normal">{getProcessor().chip}</span>
        </p>
        <p className="font-medium ">
          CPU: <span className="font-normal">{getProcessor().cpu}</span>
        </p>
        <p className="font-medium">
          GPU: <span className="font-normal">{getProcessor().gpu}</span>
        </p>
      </div>
    );
  };

  // add cart
  const handleAddProduct = () => {
    // selects default if none picked:
    // add_price=0, size=256GB
    const total =
      (parseInt(deviceData.price, 10) +
        parseInt(selectedStorage?.add_price || '0', 10)) *
      quantity;

    const product: Product = {
      id: deviceData.id,
      orderid: 0,
      name: deviceData.title,
      thumbnail: deviceData.thumb,
      color: selectedColor,
      storage: selectedStorage?.size || '256GB',
      quantity,
      price: total,
    };

    if (user) {
      addCart(product, user);
      Swal.fire({
        title: 'Added to Cart',
        text: 'Check your cart to finalize!',
        icon: 'success',
        confirmButtonText: 'Confirm',
      }).then(() => {
        navigate('/');
      });
    } else {
      navigate('/login');
    }
  };

  return (
    <div className="mt-40 mb-20 py-2 sm:mx-10 md:mx-40 ">
      <div className="sm:mx-10 md:flex mx-10">
        {/* left portion */}
        <div className="w-10/12 h-full">
          <div className="flex justify-center items-center mr-20 md:flex-col  ">
            <img
              src={deviceData.thumb}
              alt={deviceData.title}
              className="h-auto max-w-lg rounded-lg mr-4"
            />
            <div className="flex my-10">
              <img
                src={getGallery()[1]}
                alt={deviceData.title}
                className="h-fit w-1/2 rounded-lg mr-4"
              />
              <img
                src={getGallery()[2]}
                alt={deviceData.title}
                className="h-fit w-1/2 rounded-lg mr-4"
              />
            </div>
            <img
              src={getGallery()[3]}
              alt={deviceData.title}
              className="h-auto max-w-lg rounded-lg mr-4"
            />
          </div>
        </div>

        {/* right portion */}
        <div className="mt-10 ">
          <p className="text-4xl font-medium">{deviceData.title}</p>
          <p className="text-sm ">SKU: {deviceData.number}</p>
          <br />
          <br />
          <p className="text-4xl font-medium">${deviceData.price}</p>
          <div className="mt-8">{renderColors()}</div>
          <p className="text-4xl font-medium ">Storage</p>
          <div className="mt-4 mb-8">{renderStorage()}</div>
          <CustomAccordion title="Details">
            {renderDetailAccordion()}
          </CustomAccordion>
          <CustomAccordion title="Shipping Details">
            <p>
              Please note that delivery times may vary based on your location.
              For Metro Manila, please allow up to 2-3 business days for
              delivery after payment confirmation. For provincial deliveries,
              kindly expect delivery within 8-15 business days following payment
              confirmation.
            </p>
          </CustomAccordion>

          <p className="my-8 text-4xl font-medium">Quantity</p>
          <div className="border-2 inline-block">
            <IncrementDecrementBtn
              minValue={1}
              maxValue={10}
              onChange={(value) => setQuantity(value)}
            />
          </div>

          <div className="my-8">
            <MyButton
              variant="contained"
              style={{
                backgroundColor: '#0071E3',
                color: 'white',
                borderRadius: '20px',
                marginTop: '20px',
                width: '10rem',
                height: '3rem',
              }}
              onClick={handleAddProduct}
            >
              Add to cart
            </MyButton>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DevicePage;
