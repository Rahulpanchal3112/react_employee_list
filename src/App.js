import { useEffect, useState } from "react";
import Dashboard from "./Pages/Dashboard";
import { setEmployees } from "./Redux/reducers/employeeDataSlice";
import { useDispatch } from "react-redux";
import User from "./Api/EmployeeData";

function App() {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  useEffect(() => {
    const GetlocalstorageData = localStorage.getItem("employeeDataState");
    if (GetlocalstorageData !== null) {
      dispatch(setEmployees(JSON.parse(GetlocalstorageData)));
      setLoading(true);
    } else {
      const serializedState = JSON.stringify(User);
      localStorage.setItem("employeeDataState", serializedState);

      test();
    }
  }, [dispatch]);

  const test = () => {
    const Getdata = localStorage.getItem("employeeDataState");
    dispatch(setEmployees(JSON.parse(Getdata)));
    setLoading(true);
  };

  console.log(loading, "loading");

  return <>{loading && <Dashboard />}</>;
}

export default App;
