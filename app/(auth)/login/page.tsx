"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Typography2xl, TypographyList } from "@/components/ui/typography";
import { useToast } from "@/components/ui/use-toast";
import { ReloadIcon } from "@radix-ui/react-icons";
import { useState } from "react";
import { Eye } from "lucide-react";

export default function Page() {
    const { toast } = useToast();
    const [showPassword, setShowPassword] = useState(false);
    const form = useForm<any>({
        defaultValues: {
            usernameOrEmail: "",
            password: "",
        },
    });
    async function onSubmit(values: any) {
        console.log("first")
    }

    return (
        <div className="w-full space-y-16 text-base">
            <div className="space-y-3 text-center">
                <Typography2xl className="">Login</Typography2xl>
                <TypographyList className="text-[#6D6D6D]">Iniciar session</TypographyList>
            </div>
            <div className="space-y-10">
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-10 bg-white">
                        <div className="space-y-8">
                            <FormField
                                control={form.control}
                                name="usernameOrEmail"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Usuario</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Username" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="password"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Password</FormLabel>
                                        <FormControl>
                                            <div className="relative">
                                                <Input
                                                    type={showPassword ? 'text' : 'password'}
                                                    placeholder="Password"
                                                    {...field}
                                                    className="pr-10"
                                                    icon={<Eye
                                                        size={20}
                                                        onClick={() => setShowPassword(!showPassword)}
                                                        className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer"
                                                    />}
                                                />

                                            </div>
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />


                        </div>
                        <Button type="submit" size={"lg"} className="w-full  text-white" disabled={form.formState.isSubmitting}>
                            {form.formState.isSubmitting && <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />} Continuar
                        </Button>
                    </form>
                </Form>

            </div>
        </div>
    );
}
