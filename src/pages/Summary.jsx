import { useContext } from 'react';
import { BookingContext } from '../store/booking-context.jsx';


export default function SummaryPage() {

  const bookingCtx = useContext(BookingContext);

  return(
    <>
      <p>Summary Page Component Works!</p>
      <div className='p-5' style={{ border: '2px solid red' }}>
        {JSON.stringify(bookingCtx)}
      </div>
    </>
  );
}