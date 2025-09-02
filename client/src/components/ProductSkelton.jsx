export const ProductSkeleton = () => {
  return (
    <div className="flex flex-col overflow-hidden animate-pulse">
      <div className="bg-gray-300 h-[70%] w-full"></div>
      <div className="flex flex-col md:flex-row justify-between h-[30%] p-3">
        <div className="flex-1 space-y-2">
          <div className="h-4 bg-gray-300 w-3/4"></div>
          <div className="h-3 bg-gray-200 w-1/2"></div>
        </div>
        <div className="flex flex-col justify-center items-center space-y-2">
          <div className="h-4 w-12 bg-gray-300"></div>
          <div className="h-6 w-16 bg-primary rounded-md"></div>
        </div>
      </div>
    </div>
  );
};
