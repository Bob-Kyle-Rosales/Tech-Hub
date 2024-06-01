import iphone from '../../assets/Iphone.mp4';
import DeviceList from '../../components/DeviceList';
import useDevices from '../../hooks/useDevice';

function IphonePage() {
  const { data, isLoading, error } = useDevices('iPhone');

  if (isLoading || !data) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error</div>;
  }

  // Filter and map the data to include only specific properties
  const filteredData = data.map((device) => ({
    type: device.type,
    thumb: device.thumb,
    id: device.id,
    title: device.title,
    price: device.price,
  }));

  return (
    <div className="m-10">
      <video className="rounded-lg" src={iphone} controls autoPlay loop muted />
      <h1 className="my-20 text-6xl"> Explore iPhone</h1>
      <DeviceList devices={filteredData} />
    </div>
  );
}

export default IphonePage;
