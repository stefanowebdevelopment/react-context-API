
import { useContext } from "react";
import { BookingContext } from "../../store/booking-context";
import DatePicker from "../datepicker/datePicker";

export default function Stepper() {
  
  const bookingCtx = useContext(BookingContext);
  
  return (
    <>
      <section>
        {bookingCtx.stepper.map((step) => {
          return (
             step.isSelected && <main key={step.stepId} className="flex justify-center">

             <div className="card bg-base-100 w-[45%] shadow-xl mt-[5%]">
               <div className="card-body">
                 <h2 className="card-title">{step.stepTitle}</h2>

                  <form  className="mt-4" onSubmit={bookingCtx.handleGetFormData}> 
                    { step.stepId < stepper.length &&
                      bookingCtx.fetchedData.slice(0, 3).map((item) => {
                        return(
                          <div key={item.id} className="form-control">
                            <label className="label cursor-pointer text-left">
                              { item.name && <span className="label-text">{item.name}</span> }
                              { item.title && <span className="label-text">{item.title}</span> }
                              <input onChange={(event) => step.changeHandler(event, item, step)} type="radio" name={step.stepId} className="radio checked:bg-secondary"/>
                            </label>
                          </div>
                        )
                      })
                    }

                    {
                      step.stepId === 3 && <DatePicker />
                    }

                  <section className="flex justify-between items-center mt-[5%]">
                    <div className="card-actions">
                      <div className="badge badge-secondary p-4">{step.stepId}</div>
                    </div>
                    <div className="card-actions ">
                      <button onClick={() => bookingCtx.handlePrevtStep(step)} className="btn btn-primary">Back</button>
                      {step.stepId < stepper.length && <button onClick={() => bookingCtx.handleNextStep(step)} className="btn btn-primary">Next</button>}
                      {step.stepId === stepper.length && <button type="submit" className="btn btn-primary">Submit</button>}
                    </div>
                  </section>
                  
                  </form>

                 
               </div>
             </div>
           </main>
          );
        })}

          {/* <div style={{ border: '2px solid red' }} className="p-5 m-[5%]">
          { JSON.stringify(selectedService) }
          { JSON.stringify(selectedAssistant) }
          </div> */}

      </section>
    </>
  );
}
