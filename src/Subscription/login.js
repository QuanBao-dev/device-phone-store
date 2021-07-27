import { loginHandling$, userStream } from "../Epics/User";

export const loginSubscription = (
  loginButtonRef,
  emailRef,
  passwordRef,
  checkboxRef,
  setErrorForm,
  history
) => {
  return loginHandling$(
    loginButtonRef,
    emailRef,
    passwordRef,
    checkboxRef
  ).subscribe((result) => {
    if (!result.error) {
      setErrorForm(null);
      history.replace("/");
      userStream.updateData({
        triggerFetchUser: !userStream.currentState().triggerFetchUser,
      });
    } else {
      if (typeof result.error === "string") setErrorForm(result.error);
    }
  });
};
