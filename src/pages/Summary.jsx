import { useContext } from 'react';
import { BookingContext } from '../store/booking-context.jsx';
import { useNavigate } from 'react-router-dom';


export default function SummaryPage() {

  const bookingCtx = useContext(BookingContext);
  const navigate = useNavigate();

  function goToHome() {
    navigate('/');
  }

  return(
    <>
      <p>Summary Page Component Works!</p>

      <section className='m-5'>
        <button onClick={() => goToHome()} className="btn btn-primary">Back</button>
      </section>

      <div className='p-5' style={{ border: '2px solid red' }}>
        {JSON.stringify(bookingCtx.formDataState)}
      </div>
    </>
  );
}