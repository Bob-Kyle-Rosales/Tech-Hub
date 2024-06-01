import { IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import useCart from '../../hooks/useCart';
import Card from '../../components/Card';

function CartPage() {
  const { cart, removeCart } = useCart();

  const renderCartList = () => {
    return (
      <>
        {cart.map((product) => (
          <Card
            key={product.id}
            className="mx-10 my-5 border border-gray-300 shadow-md w-11/12"
          >
            <div className="flex w-full ml-10">
              <img
                src={product.thumbnail}
                alt={product.name}
                className="h-40 w-40 rounded-lg mr-4"
              />
              <div className="mx-10">
                <p className="text-3xl font-normal">{product.name}</p>
                <p>Color: {product.color}</p>
                <p>Storage: {product.storage}</p>
                <p>Quantity: {product.quantity}</p>
                <p>Price: ${product.price}</p>
              </div>
            </div>

            <div className=" flex items-center justify-center">
              <IconButton
                className="w-fit h-fit"
                onClick={() => removeCart(product)}
              >
                <DeleteIcon />
              </IconButton>
            </div>
          </Card>
        ))}
      </>
    );
  };

  const noCartMessage = () => {
    return (
      <div className="flex justify-center items-center m-10">
        <p className="text-slate-500">
          No added products. You may browse apple devices that suits to your
          liking
        </p>
      </div>
    );
  };

  return (
    <div className="w-screen mt-44 flex justify-center items-center">
      <Card className="flex flex-col items-center justify-center border border-gray-300 shadow-md w-1/2">
        <p className="text-4xl font-normal mb-2">Your Cart</p>

        <div className="m-4 w-full  ">
          {cart.length > 0 ? renderCartList() : noCartMessage()}
        </div>
      </Card>
    </div>
  );
}

export default CartPage;
