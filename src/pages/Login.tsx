import { Card, Flexbox, Heading, Button, TextField } from "@synevix/react-widget";
import { useState } from "react";
import { useHistory } from "react-router-dom";
import { style } from "typestyle";
import { ILogin } from "../interface";

const Login = () => {
  const [state, setState] = useState<ILogin>({} as ILogin);
  //const [error,] = useState<ILogin>({} as ILogin);
  const history = useHistory();

  const onLoginSubmit = () => {
    console.log(state);
    history.push("/v1/dashboard");
    //TODO: database.store(state);
  };

  return (
    <Flexbox
      alignContent={"center"}
      justifyContent={"center"}
      className={flexStyling}
    >
      <Card className={[cardStyling, 'border'].join(' ')}>
        <Heading type={"H4"} text={"Sign in"} className={'font-bold text-base text-gray-800 uppercase text-center my-4'} />

        <TextField
          type={"text"}
          placeholder={"Email"}
          value={state.email}
          className={'w-full my-4'}
          onValueChange={(e) => setState({ ...state, email: e.target.value })}
        />

        <TextField
          type={"password"}
          placeholder={"Password"}
          value={state.password}
          className={'w-full my-4'}
          onValueChange={(e) => setState({ ...state, password: e.target.value })}
        />
        <Button
          text={"Login"}
          className={'w-full text-white p-2 font-bold my-4'}
          bgColor={"pink"} 
          onClick={() => onLoginSubmit()}
        />

      </Card>
    </Flexbox>
  );
};

const flexStyling = style({
  background: "#fff",
  height: "100vh",
});

const cardStyling = style({
  width: "350px",
  maxWidth: "350px",
});




export default Login;
