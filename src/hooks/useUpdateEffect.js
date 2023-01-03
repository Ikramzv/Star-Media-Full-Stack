import { useEffect, useState } from "react";

function useUpdateEffect(cb, dependencies) {
  const [firstRender, setFirstRender] = useState(true);
  useEffect(() => {
    setFirstRender(false);
    if (!firstRender) {
      return cb(); // clean up;
    }
  }, dependencies);
}

export default useUpdateEffect;
