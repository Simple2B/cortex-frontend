import { useDispatch } from "react-redux";
import { bindActionCreators } from "redux";
import { actionsCreator } from "../redux/actions";

export const useActions = () => {
  const dispatch = useDispatch();
  return bindActionCreators(actionsCreator, dispatch);
};
