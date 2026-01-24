import { RotatingLines } from 'react-loader-spinner';

// Loader.jsx
const Loader = () => {
  return (
    <div className="flex justify-center items-center h-screen bg-white">
      <RotatingLines color="#FF7000" />
    </div>
  );
};
export default Loader;
