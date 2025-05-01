"use client";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import Image from "next/image";
import Link from "next/link";
import { toast } from "sonner";
import CustomFormField from "./CustomFormField";
import { useRouter } from "next/navigation";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/firebase/client";
import { signIn, signUp } from "@/lib/actions/auth.actions";

const authFormSchema = (type: FormType) => {
  return z.object({
    name: type === "sign-up" ? z.string().min(3) : z.string().optional(),
    email: z.string().email(),
    password: z.string().min(3),
  });
};

const AuthForm = ({ type }: { type: FormType }) => {
  const router = useRouter();
  const isSignIn = type === "sign-in";

  const formSchema = authFormSchema(type);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    console.log("AUTH FORM SUBMIT");

    try {
      // * Sign up
      if (type === "sign-up") { 
        const {name, email, password} = values;
        const userCredentials = await createUserWithEmailAndPassword(auth, email, password); // Autenticates user

        const result = await signUp({ // Sign in user
          uid: userCredentials.user.uid,
          name: name!,
          email: email!,
          password: password
        })

        if (!result?.success) {
          toast.error(result?.message);
          return
        }

        toast.success('Account created successfully. Please sign in')
        router.push('/sign-in')
      } 
      // * Sign In
      else {
        const { email, password}  = values
        const userCredentials = await signInWithEmailAndPassword(auth, email, password);

        const idToken = await userCredentials.user.getIdToken();

        if(!idToken) {
          toast.error('Sign in failed.')
          return
        }

        await signIn({ email, idToken });
        toast.success('Sign in successfully.')
        router.push('/')
      }
    } catch (error) {
      console.log("[AuthForm] onSubmit Error: ", error);
      toast.error(`There was an error: ${error}`);
    }
  }

  return (
    <div className="card-border lg:min-w-[566px]">
      <div className="flex flex-col gap-6 card py-14 px-10">
        <div className="flex flex-row gap-2 justify-center">
          <Image src="/logo.svg" alt="logo" height={32} width={38} />
          <h2>PrepWise</h2>
        </div>
        <h3>Practice job interview with AI</h3>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="w-full space-y-6 mt-4 form"
          >
            {/* Name */}
            {!isSignIn && (
              <CustomFormField
              control={form.control}
              name="name"
                label="Name"
                placeholder="Your name"
              />
            )}

            {/* Email */}
            <CustomFormField
              control={form.control}
              name="email"
              label="Email"
              placeholder="Your Email"
              type="email"
            />

            {/* Password */}
            <CustomFormField
              control={form.control}
              name="password"
              label="Password"
              placeholder="Enter Your Password"
              type="password"
            />

            <Button type="submit" className="btn">
              {isSignIn ? "Sign In" : " Create an Account"}
            </Button>
          </form>
        </Form>

        <p className="text-center">
          {isSignIn ? "No account yet?" : "Have an account already?"}
          <Link
            href={!isSignIn ? "/sign-in" : "/sign-up"}
            className="font-bold text-user-primary ml-1"
          >
            {!isSignIn ? "Sign In" : "Sign Up"}
          </Link>
        </p>
      </div>
    </div>
  );
};

export default AuthForm;
