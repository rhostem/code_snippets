import React from "react";

/**
 * 문자열에 개행 문자가 있으면 JSX에서 줄바꿈이 되도록 처리한다.
 * https://codesandbox.io/s/w6jv6yjnv5
 * @param {sstring } text
 */
const addNewLine = (text = "") => {
  const lines = text.toString().split(/\\r\\n|\r\n|\r|\\r|\n|\\n/g) || [];

  return lines.map((partial, i) => (
    <span key={i}>
      {partial}
      {i !== lines.length - 1 ? <br /> : null}
    </span>
  ));
};

export default addNewLine;

export function newlineToLineBreak(str = "") {
  if (typeof str === "string") {
    return str.replace(/(?:\r\n|\r|\n)/g, "<br />");
  } else {
    return str;
  }
}
