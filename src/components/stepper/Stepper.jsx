import { useState } from "react";
import useFetchData from "../../hooks/fetchDataHook";
import DatePicker from "../datepicker/datePicker";

export default function Stepper() {
  
  const [selectedService, setSelectedService] = useState('');
  const [selectedAssistant, setSelectedAssistant] = useState('');
  const [stepper, setStepper] = useState([
    { stepId: 1, stepTitle: "Prenota Servizio", isSelected: true, serviceUrl: 'https://jsonplaceholder.typicode.com/todos', changeHandler: handleSelectedService },
    { stepId: 2, stepTitle: "Scegli Assistente", isSelected: false, serviceUrl: 'https://jsonplaceholder.typicode.com/users', changeHandler: handleSelectedAssistant },
    { stepId: 3, stepTitle: "Scegli il Giorno", isSelected: false, serviceUrl: '' },
  ]);
  
  const selectedUrlService = stepper.find(el => el.isSelected);
  const { fetchedData } = useFetchData(selectedUrlService.serviceUrl, handleNextStep);

  function handleNextStep({ stepId }) {
    setStepper((prevStepper) => {
      if (stepId+1 > stepper.length) { return prevStepper.map(el => el.stepId == 1 ? {...el, isSelected:true} : {...el, isSelected:false})}
      return prevStepper.map(el => el.stepId == stepId+1 ? {...el, isSelected:true} : {...el, isSelected:false})
    })
  }
  function handlePrevtStep({ stepId }) {
    setStepper((prevStepper) => {
      if (stepId+1 > stepper.length) { return prevStepper.map(el => el.stepId == 1 ? {...el, isSelected:true} : {...el, isSelected:false})}
      return prevStepper.map(el => el.stepId == stepId+1 ? {...el, isSelected:true} : {...el, isSelected:false})
    })
  }

  function handleGetFormData(event) {
    event.preventDefault();

    // const fd = new FormData(event.target);
    // const data = Object.fromEntries(fd.entries());
    // console.log('DATA: ', data);

    const formObject = {
      selectedService: selectedService,
      selectedAssistant: selectedAssistant
    }

    setStepper((prevState) => {
      return prevState.map((item, index) => index === 0 ? { ...item, isSelected : true } : { ...item, isSelected : false });
    })

    setSelectedService('');
    setSelectedAssistant('');
  }

  function handleSelectedService(event, item, step) {
    setSelectedService(() => item)
  }

  function handleSelectedAssistant(event, item, step) {
    setSelectedAssistant(() => item)
  }


  return (
    <>
      <section>
        {stepper.map((step) => {
          return (
             step.isSelected && <main key={step.stepId} className="flex justify-center">

             <div className="card bg-base-100 w-[45%] shadow-xl mt-[5%]">
               <div className="card-body">
                 <h2 className="card-title">{step.stepTitle}</h2>

                  <form  className="mt-4" onSubmit={handleGetFormData}> 
                    { step.stepId < stepper.length &&
                      fetchedData.slice(0, 3).map((item) => {
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
                      <button onClick={() => handlePrevtStep(step)} className="btn btn-primary">Back</button>
                      {step.stepId < stepper.length && <button onClick={() => handleNextStep(step)} className="btn btn-primary">Next</button>}
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
