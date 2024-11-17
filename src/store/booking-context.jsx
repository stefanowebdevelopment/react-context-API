import { createContext, useState, useReducer } from "react";
import useFetchData from "../hooks/fetchDataHook";
import { useNavigate } from "react-router-dom";

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

function bookingReducer(state, action) {

  if(action.type === 'ADD_SELECTED_SERVICE') {
    return state.item; 
  }

  return state;
}

export default function BookingContextProvider({ children }) {

  const [selectedServiceState, selectedServiceDispatch] = useReducer(bookingReducer, "");

  // const [selectedService, setSelectedService] = useState("");
  const [selectedAssistant, setSelectedAssistant] = useState("");
  const [formDataState, setFormDataState] = useState({});
  const [stepper, setStepper] = useState([
    { stepId: 1, stepTitle: "Prenota Servizio", isSelected: true, serviceUrl: 'https://jsonplaceholder.typicode.com/todos', changeHandler: handleSelectedService },
    { stepId: 2, stepTitle: "Scegli Assistente", isSelected: false, serviceUrl: 'https://jsonplaceholder.typicode.com/users', changeHandler: handleSelectedAssistant },
    { stepId: 3, stepTitle: "Scegli il Giorno", isSelected: false, serviceUrl: '' },
  ]);
  
  const selectedUrlService = stepper.find(el => el.isSelected);
  const { fetchedData } = useFetchData(selectedUrlService.serviceUrl, handleNextStep);
  
  const navigate = useNavigate();

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
      selectedService: selectedServiceState,
      selectedAssistant: selectedAssistant
    }

    setStepper((prevState) => {
      return prevState.map((item, index) => index === 0 ? { ...item, isSelected : true } : { ...item, isSelected : false });
    })

    // setSelectedService('');
    selectedServiceDispatch('');
    setSelectedAssistant('');

    setFormDataState((prevState) => {
      return formObject;
    });

     navigate('/summary');
  }

  function handleSelectedService(event, item, step) {
    // setSelectedService(() => item);
    selectedServiceDispatch({
      type:  'ADD_SELECTED_SERVICE',
      payload: item
    });
  }
  function handleSelectedAssistant(event, item, step) {
    setSelectedAssistant(() => item)
  }

  const ctxValue = {
    stepper: stepper,
    fetchedData: fetchedData,
    formData: [selectedServiceState, selectedAssistant],
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
