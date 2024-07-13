import Auth from '../components/Auth';
import ProductDescription from '../components/ProductDescription';

export default function Signup() {
  return (
    <div className='grid grid-cols-1 md:grid-cols-2 bg-slate-100 md:bg-white'>
      <Auth type='signin' />
      <ProductDescription />
    </div>
  );
}
