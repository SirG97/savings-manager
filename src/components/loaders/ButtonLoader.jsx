import { MoonLoader, } from 'react-spinners';

const ButtonLoader = ({size}) => {
    return (
      <div className={`px-2 mt-1 inline bg-opacity-95 `}>
        <MoonLoader color={'#ffff00'}  loading={true} size={12} speedMultiplier={1.5} />
      </div>
    );
  };
  
export default ButtonLoader;