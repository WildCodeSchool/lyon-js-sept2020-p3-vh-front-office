import Loader from 'react-loader-spinner';

const SpinnerLoader = () => {
  return (
    <div
      style={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
      }}
    >
      <Loader type="Circles" color="#8c0226" height={100} width={100} />
    </div>
  );
};

export default SpinnerLoader;
