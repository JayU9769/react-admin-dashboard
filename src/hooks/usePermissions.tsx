import { adminStates } from "@/store/admin/slice";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";

// Custom hook to check permissions
const usePermission = (requiredPermission: string) => {
  const [hasPermission, setHasPermission] = useState(false);
  const { auth } = useSelector(adminStates);
  console.log(auth.permissions);
  useEffect(() => {
    if (requiredPermission) {
      // Check if the required permission exists in the user's permissions array
      setHasPermission(auth.permissions.includes(requiredPermission));
    }
  }, [requiredPermission, auth.permissions]);

  return hasPermission;
};

export default usePermission;
