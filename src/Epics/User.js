import userStore from "../Store/User";

export const userStream = userStore;

export const searchSubmit = (inputRef, selectRef, history) => {
  if (
    ![inputRef.current.value.trim(), selectRef.current.value.trim()].includes(
      ""
    )
  ) {
    history.push(
      "/shop/page/1?category=" +
        selectRef.current.value.trim().replace(/ /g, "-") +
        "&key=" +
        inputRef.current.value.trim().replace(/ /g, "-")
    );
    selectRef.current.value = "";
    inputRef.current.value = "";
    return;
  }
  if (inputRef.current.value.trim() !== "") {
    history.push(
      "/shop/page/1?key=" + inputRef.current.value.trim().replace(/ /g, "-")
    );
    selectRef.current.value = "";
    inputRef.current.value = "";
    return;
  }
  if (selectRef.current.value.trim() !== "") {
    history.push(
      "/shop/page/1?category=" +
        selectRef.current.value.trim().replace(/ /g, "-")
    );
  }
  selectRef.current.value = "";
  inputRef.current.value = "";
}