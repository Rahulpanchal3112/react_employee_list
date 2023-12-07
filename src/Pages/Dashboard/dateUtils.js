import { setFilter } from "../../Redux/reducers/employeeFiterSlice";
import { setListFilter } from "../../Redux/reducers/employeelistDataSlice";

export const setglobalState = (
  userSelected_date,
  Employee_selected_data,
  dispatch
) => {
  const Getdata = localStorage.getItem("employeeDataState");
  let data = JSON.parse(Getdata);
  const date = userSelected_date;
  const user = Employee_selected_data?.user;
  const filterdata = data?.filter((item) => {
    return user === item?.user;
  });
  if (filterdata.length > 0) {
    dispatch(setFilter(filterdata[0]));
  }
  const Datewise_filter_issues = {
    ...filterdata[0],
    Issues: filterdata[0]?.Issues.filter((issue) => issue.Date === date),
  };

  dispatch(setListFilter(Datewise_filter_issues));
};
