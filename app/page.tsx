"use client";

import { login } from "@/actions/user/actions";
import { Button, Input, Label } from "@/components/ui";
import { Loader2 } from "lucide-react";
import { useActionState, useState } from "react";

type SubmitButtonProps = {
  id: string;
  password: string;
};

const SubmitButton = ({ id, password }: SubmitButtonProps) => {
  return (
    <Button
      variant="default"
      className="w-full h-full justify-center mt-5"
      disabled={!id || !password}
    >
      Login
    </Button>
  );
};

const LoginPage = () => {
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const [state, loginAction, isPending] = useActionState(login, undefined);

  return (
    <div className="flex justify-center items-center h-screen w-screen">
      <form
        id="loginForm"
        action={loginAction}
        className={`border-gray-400 border-2 rounded-xl p-7 mb-24 relative`}
      >
        {isPending && (
          <Loader2 className="animate-spin absolute top-[45%] left-[47%]" />
        )}
        <div className={`${isPending ? "blur-sm" : "blur-none"}`}>
          <div className="flex flex-col justify-center items-center mb-8">
            <span className="font-black text-xl">Sign In</span>
            <span>PruServices Adaption</span>
          </div>
          <div className="grid w-full max-w-sm items-center gap-1.5 mb-5">
            <Label htmlFor="number" className="font-semibold">
              ID Number
            </Label>
            <Input
              type="number"
              id="userId"
              name="userId"
              placeholder="User ID"
              className="[appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
              onChange={e => setId(e.target.value)}
              disabled={isPending ? true : false}
            />
            {state?.errors?.userId && (
              <span className="font-normal text-red-800">
                {state?.errors?.userId}
              </span>
            )}
          </div>
          <div className="grid w-full max-w-sm items-center gap-1.5">
            <Label htmlFor="password" className="font-semibold">
              Password
            </Label>
            <Input
              type="password"
              id="password"
              name="password"
              placeholder="Password"
              onChange={e => setPassword(e.target.value)}
              disabled={isPending ? true : false}
            />
            {state?.errors?.password && (
              <span className="font-normal text-red-800">
                {state?.errors?.password}
              </span>
            )}
            {state?.error && (
              <span className="font-normal text-red-800">{state?.error}</span>
            )}
          </div>
          <SubmitButton id={id} password={password} />
        </div>
      </form>
    </div>
  );
};

export default LoginPage;
