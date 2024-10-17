import { createContext, useState } from "react";
import useFetchData from "../hooks/fetchDataHook";

// STEP 1 => CONTEXT SETUP // TODO to update
export const BookingContext = createContext({
  stepper: [],
  fetchedData: [],
  formData: [],
  formDataState: {},
  handleSelectedService: () => {},
  handleSelectedAssistant: () => {},
  handleGetFormData: () => {},
  handleNextStep: () => {},
});

export default function BookingContextProvider({ children }) {

  const [selectedService, setSelectedService] = useState("");
  const [selectedAssistant, setSelectedAssistant] = useState("");
  const [formDataState, setFormDataState] = useState({});
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

    const formObject = {
      selectedService: selectedService,
      selectedAssistant: selectedAssistant
    }

    setStepper((prevState) => {
      return prevState.map((item, index) => index === 0 ? { ...item, isSelected : true } : { ...item, isSelected : false });
    })

    setSelectedService('');
    setSelectedAssistant('');

    setFormDataState((prevState) => {
      return formObject;
    })
  }

  function handleSelectedService(event, item, step) {
    setSelectedService(() => item)
  }
  function handleSelectedAssistant(event, item, step) {
    setSelectedAssistant(() => item)
  }

  const ctxValue = {
    stepper: stepper,
    fetchedData: fetchedData,
    formData: [selectedService, selectedAssistant],
    formDataState: formDataState,
    handleSelectedService: handleSelectedService,
    handleSelectedAssistant: handleSelectedAssistant,
    handleGetFormData: handleGetFormData,
    handleNextStep: handleNextStep
  };

  return <BookingContext.Provider value={ctxValue}>
    {children}
  </BookingContext.Provider>
}
