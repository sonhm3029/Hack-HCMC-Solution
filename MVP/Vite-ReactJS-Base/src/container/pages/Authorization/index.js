import { RouteName } from "@/routes/constants";

const Authorization = ({ permissions, children }) => {
  let isAllowed = true;

  if (isAllowed) {
    return children;
  } else {
    window.location.href = RouteName.PERMISSION_NOT_ALLOWED;
  }
};

export default Authorization;
