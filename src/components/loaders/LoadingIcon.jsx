import { MoonLoader, FadeLoader } from 'react-spinners';

const LoadingIcon = () => {
    return (
      <div className={`w-full h-full py-4 flex items-center justify-center bg-opacity-95 `}>
        <MoonLoader color={'#7048EC'}  loading={true} size={30} speedMultiplier={1.5} />
      </div>
    );
  };
  
export default LoadingIcon;