import React, { useMemo } from "react";

function useRegex(regex, source, deps) {
  const target = useMemo(() => {
    const matched = String(source)?.match(regex);
    let temp = source;
    let end = "";
    let returnValue;
    if (matched) {
      matched?.forEach((delimiter, i) => {
        const description = returnValue || [];
        const startIndex = temp?.indexOf(delimiter);
        const head = temp.slice(0, startIndex);
        end = temp.slice(startIndex + delimiter.length);
        const link = (
          <a
            href={delimiter}
            key={i}
            className="post_description_link"
            target={"_blank"}
          >
            {delimiter}
          </a>
        );
        description.push(head, link);
        temp = end;
        returnValue = description;
      });
      returnValue.push(end);
    }
    return returnValue || source;
  }, [regex, source, ...deps]);

  return target;
}

export default useRegex;
