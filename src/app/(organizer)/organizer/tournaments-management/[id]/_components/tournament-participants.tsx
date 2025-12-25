"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm, useFieldArray } from "react-hook-form"
import { z } from "zod"
import { useSession } from "next-auth/react"

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Tournament } from "./single-tournament-data-type"

/* ---------------- ZOD SCHEMA ---------------- */

const playerSchema = z.object({
  fullName: z.string().min(2, "Full name is required"),
  email: z.string().email("Invalid email"),
  phone: z.string().min(6, "Phone is required"),
  seed: z.string().min(1, "Seed is required"),
})

const formSchema = z.object({
  players: z.array(playerSchema),
})

type FormValues = z.infer<typeof formSchema>

/* ---------------- COMPONENT ---------------- */

interface Props {
  data: Tournament
}

const TournamentParticipantsPage = ({ data }: Props) => {
  const { _id: tournamentId, format } = data
  const isPair = format === "Pair"

  const { data: session } = useSession()
  const token = (session?.user as { accessToken: string })?.accessToken

  /* ---------------- FORM ---------------- */

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      players: isPair
        ? [
            { fullName: "", email: "", phone: "", seed: "" },
            { fullName: "", email: "", phone: "", seed: "" },
          ]
        : [{ fullName: "", email: "", phone: "", seed: "" }],
    },
  })

  const { fields } = useFieldArray({
    control: form.control,
    name: "players",
  })

  /* ---------------- SUBMIT ---------------- */

  const onSubmit = (values: FormValues) => {
    const payload = {
      tournamentId,
      format,
      players: values.players,
    }

    console.log("SUBMIT PAYLOAD:", payload)
    console.log("TOKEN:", token)
  }

  /* ---------------- UI ---------------- */

  return (
    <div>
      <h4 className="text-lg md:text-xl font-semibold pb-6">
        Participants ({format})
      </h4>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-10">

          {fields.map((field, index) => (
            <div
              key={field.id}
              className="border border-gray-200 rounded-lg p-6"
            >
              <h5 className="font-semibold mb-4">
                Player {index + 1}
              </h5>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Full Name */}
                <FormField
                  control={form.control}
                  name={`players.${index}.fullName`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Full Name*</FormLabel>
                      <FormControl>
                        <Input placeholder="Player name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Email */}
                <FormField
                  control={form.control}
                  name={`players.${index}.email`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email*</FormLabel>
                      <FormControl>
                        <Input placeholder="Email" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Phone */}
                <FormField
                  control={form.control}
                  name={`players.${index}.phone`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Phone*</FormLabel>
                      <FormControl>
                        <Input placeholder="Phone" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {/* Seed */}
              <div className="mt-4 max-w-sm">
                <FormField
                  control={form.control}
                  name={`players.${index}.seed`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Seed*</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter seed" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
          ))}

          <Button type="submit">
            Submit Participants
          </Button>
        </form>
      </Form>
    </div>
  )
}

export default TournamentParticipantsPage
