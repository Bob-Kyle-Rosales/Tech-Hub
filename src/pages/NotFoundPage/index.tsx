function NotFoundPage() {
  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="bg-slate-100 w-2/4 bg-opacity-90 py-8 px-10 my-10 rounded-lg">
        <span className="flex justify-center text-red-500 font-bold sm:text-xl md:text-8xl">
          404
        </span>
        <span className="flex justify-center text-red-500 font-bold sm:text-xl md:text-3xl mt-2">
          Page Not Found!
        </span>
        <span className="flex justify-center sm:text-sm md:text-xl mt-8">
          Oopss! The page you are accessing is unavailable.
        </span>
      </div>
    </div>
  );
}

export default NotFoundPage;
