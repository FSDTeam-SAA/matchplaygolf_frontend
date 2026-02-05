


// "use client"

// import { zodResolver } from "@hookform/resolvers/zod"
// import { useForm } from "react-hook-form"
// import { z } from "zod"
// import { toast } from "sonner"

// import { Button } from "@/components/ui/button"
// import {
//   Form,
//   FormControl,
//   FormField,
//   FormItem,
//   FormLabel,
//   FormMessage,
// } from "@/components/ui/form"
// import { Input } from "@/components/ui/input"
// // import { Textarea } from "@/components/ui/textarea" 
// import { useSession } from "next-auth/react"
// import { useMutation, useQueryClient } from "@tanstack/react-query"
// import { useEffect } from "react"
// import { TournamentResponseData } from "./single-tournament-data-type"
// // import TiptapEditor from "@/components/ui/tiptap-editor"
// import QuillEditor from "@/components/ui/quill-editor"

// // Updated schema to match actual data structure
// const formSchema = z.object({
//   entryConditions: z.array(z.string()).length(3, "Exactly 3 entry conditions are required"),
//   range: z.array(z.string()).length(3, "Exactly 3 range values are required"),
//   rules: z.string().min(10, "Rules text must be at least 10 characters"),
// })

// type FormValues = z.infer<typeof formSchema>

// const TournamentRulesPage = (data: { data: TournamentResponseData }) => {
//   const tournamentId = (data?.data?.tournament as unknown as {_id:string})?._id;
//   console.log(data)
//   const { data: session } = useSession()
//   const token = (session?.user as { accessToken: string })?.accessToken
//   const queryClient = useQueryClient()

//   const form = useForm<FormValues>({
//     resolver: zodResolver(formSchema),
//     defaultValues: {
//       entryConditions: ["", "", ""],
//       range: ["", "", ""],
//       rules: "",
//     },
//   })

//   // Pre-fill form when data loads
//   useEffect(() => {
//     if (!data) return

//     form.reset({
//       entryConditions: (data?.data?.tournament as unknown as { entryConditions?: string[] })?.entryConditions || ["", "", ""],
//       range: (data?.data?.tournament as unknown as { range?: string[] })?.range || ["", "", ""],
//       // rules: (data?.data?.tournament as unknown as { rules?: string })?.rules || "",
//        rules: data?.data?.tournament?.rules || "",
//     })
//   }, [data, form])


//   const { mutate, isPending } = useMutation({
//     mutationKey: ["tournament-details", tournamentId],
//     mutationFn: async (values: FormValues) => {
//       const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/tournament/${tournamentId}`, {
//         method: "PUT",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${token}`,
//         },
//         body: JSON.stringify(values),
//       })
//       if (!res.ok) throw new Error("Failed to update")
//       return res.json()
//     },
//     onSuccess: (response) => {
//       if (!response?.success) {
//         toast.error(response?.message || "Something went wrong")
//         return
//       }
//       toast.success(response?.message || "Tournament updated successfully")
//       queryClient.invalidateQueries({ queryKey: ["single-tournament"] })
//     },
//     onError: () => {
//       toast.error("Failed to update tournament")
//     },
//   })

//   function onSubmit(values: FormValues) {
//     mutate(values)
//   }

//   return (
//     <div className="">
//       <Form {...form}>
//         <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
//           {/* Entry Conditions - 2 fields */}
//           <div>
//             <h3 className="text-lg font-medium text-[#343A40] mb-4">Entry Conditions</h3>
//             <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//               <FormField
//                 control={form.control}
//                 name="entryConditions.0"
//                 render={({ field }) => (
//                   <FormItem>
//                     <FormControl>
//                       <Input
//                         placeholder="e.g. Handicap Limit (Playing)"
//                         className="h-[48px] text-base"
//                         {...field}
//                       />
//                     </FormControl>
//                     <FormMessage />
//                   </FormItem>
//                 )}
//               />
//               <FormField
//                 control={form.control}
//                 name="entryConditions.1"
//                 render={({ field }) => (
//                   <FormItem>
//                     <FormControl>
//                       <Input
//                         placeholder="e.g. Every Player must have played"
//                         className="h-[48px] text-base"
//                         {...field}
//                       />
//                     </FormControl>
//                     <FormMessage />
//                   </FormItem>
//                 )}
//               />
//               <FormField
//                 control={form.control}
//                 name="entryConditions.2"
//                 render={({ field }) => (
//                   <FormItem>
//                     <FormControl>
//                       <Input
//                         placeholder="e.g. Every Player must have played"
//                         className="h-[48px] text-base"
//                         {...field}
//                       />
//                     </FormControl>
//                     <FormMessage />
//                   </FormItem>
//                 )}
//               />
//             </div>
//           </div>

//           {/* Range - 2 fields */}
//           <div>
//             <h3 className="text-lg font-medium text-[#343A40] mb-4">Range</h3>
//             <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//               <FormField
//                 control={form.control}
//                 name="range.0"
//                 render={({ field }) => (
//                   <FormItem>
//                     <FormControl>
//                       <Input
//                         placeholder="e.g. 24 for Men / 36 for Ladies"
//                         className="h-[48px] text-base"
//                         {...field}
//                       />
//                     </FormControl>
//                     <FormMessage />
//                   </FormItem>
//                 )}
//               />
//               <FormField
//                 control={form.control}
//                 name="range.1"
//                 render={({ field }) => (
//                   <FormItem>
//                     <FormControl>
//                       <Input
//                         placeholder="e.g. 8 rounds in 12 Months"
//                         className="h-[48px] text-base"
//                         {...field}
//                       />
//                     </FormControl>
//                     <FormMessage />
//                   </FormItem>
//                 )}
//               />
//               <FormField
//                 control={form.control}
//                 name="range.2"
//                 render={({ field }) => (
//                   <FormItem>
//                     <FormControl>
//                       <Input
//                         placeholder="e.g. 8 rounds in 12 Months"
//                         className="h-[48px] text-base"
//                         {...field}
//                       />
//                     </FormControl>
//                     <FormMessage />
//                   </FormItem>
//                 )}
//               />
//               <div /> {/* Empty cell for alignment */}
//             </div>
//           </div>

//           {/* Rules Text */}
//           <FormField
//             control={form.control}
//             name="rules"
//             render={({ field }) => (
//               <FormItem>
//                 <FormLabel className="text-base text-[#343A40] leading-[150%] font-medium">
//                   Rules Text
//                 </FormLabel>
//                 {/* <FormControl>
//                   <TiptapEditor
//                     id="rules"
//                     value={field.value}
//                     onChange={field.onChange}
//                     placeholder="Enter the full rules text here..."
//                   />
//                 </FormControl> */}

//                 <FormControl className="h-[347px]">
//                     <QuillEditor
//                       id="rules"
//                       value={field.value}
//                       onChange={field.onChange}
//                     />
//                   </FormControl>
//                 <FormMessage />
//               </FormItem>
//             )}
//           />
//           {/* <FormField
//             control={form.control}
//             name="rules"
//             render={({ field }) => (
//               <FormItem>
//                 <FormLabel className="text-base text-[#343A40] leading-[150%] font-medium">
//                   Rules Text
//                 </FormLabel>
//                 <FormControl>
//                   <Textarea
//                     placeholder="Enter the full rules text here..."
//                     className="min-h-[200px] resize-none"
//                     {...field}
//                   />
                
//                 </FormControl>
//                 <FormMessage />
//               </FormItem>
//             )}
//           /> */}

//           {/* Buttons */}
//           <div className="flex justify-end gap-6 pt-6">
//             <Button
//               type="button"
//               variant="outline"
//               onClick={() => form.reset()}
//               className="h-[49px] text-[#F2415A] text-lg font-medium leading-[150%] border-[1px] border-[#F2415A] rounded-[8px] py-3 px-16"
//             >
//               Cancel
//             </Button>
//             <Button
//               disabled={isPending}
//               type="submit"
//               className="h-[49px] bg-gradient-to-b from-[#DF1020] to-[#310000]
//                 hover:from-[#310000] hover:to-[#DF1020]
//                 transition-all duration-300 text-[#F7F8FA] font-bold text-lg leading-[120%] rounded-[8px] px-20"
//             >
//               {isPending ? "Saving..." : "Add"}
//             </Button>
//           </div>
//         </form>
//       </Form>
//     </div>
//   )
// }

// export default TournamentRulesPage




"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { toast } from "sonner"
import { useEffect } from "react"
import { useSession } from "next-auth/react"
import { useMutation, useQueryClient } from "@tanstack/react-query"

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
import QuillEditor from "@/components/ui/quill-editor"
import { TournamentResponseData } from "./single-tournament-data-type"

/* ---------------- SCHEMA ---------------- */

const formSchema = z.object({
  entryConditions: z.array(z.string()).length(3),
  range: z.array(z.string()).length(3),
  rules: z.string().min(10, "Rules text must be at least 10 characters"),
})

type FormValues = z.infer<typeof formSchema>

/* ---------------- UTILS ---------------- */

const normalizeRules = (rules: unknown): string => {
  if (typeof rules === "string") return rules
  if (Array.isArray(rules)) return rules.join("")
  return ""
}

/* ---------------- PAGE ---------------- */

const TournamentRulesPage = ({ data }: { data: TournamentResponseData }) => {
  const tournament = data?.tournament
  const tournamentId = tournament?._id

  const { data: session } = useSession()
  const token = (session?.user as { accessToken: string })?.accessToken
  const queryClient = useQueryClient()

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      entryConditions: ["", "", ""],
      range: ["", "", ""],
      rules: "",
    },
  })

  /* ---------- SAFE RESET FROM API ---------- */
  useEffect(() => {
    if (!tournament) return

    form.reset({
      entryConditions: Array.isArray(tournament.entryConditions)
        ? tournament.entryConditions
        : ["", "", ""],

      range: Array.isArray(tournament.range)
        ? tournament.range
        : ["", "", ""],

      rules: normalizeRules(tournament.rules),
    })
  }, [tournament, form])

  /* ---------- MUTATION ---------- */
  const { mutate, isPending } = useMutation({
    mutationKey: ["tournament-details", tournamentId],
    mutationFn: async (values: FormValues) => {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/tournament/${tournamentId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            ...values,
            rules: [values.rules], // 🔥 keep backend format
          }),
        }
      )

      if (!res.ok) throw new Error("Update failed")
      return res.json()
    },
    onSuccess: () => {
      toast.success("Tournament updated successfully")
      queryClient.invalidateQueries({ queryKey: ["single-tournament"] })
    },
    onError: () => {
      toast.error("Failed to update tournament")
    },
  })

  const onSubmit = (values: FormValues) => {
    mutate(values)
  }

  /* ---------------- UI ---------------- */

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">

        {/* ENTRY CONDITIONS */}
        <div>
          <h3 className="text-lg font-medium mb-4">Entry Conditions</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[0, 1, 2].map((i) => (
              <FormField
                key={i}
                control={form.control}
                name={`entryConditions.${i}`}
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input placeholder="Enter Entry conditions" {...field} className="h-[48px]" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            ))}
          </div>
        </div>

        {/* RANGE */}
        <div>
          <h3 className="text-lg font-medium mb-4">Range</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[0, 1, 2].map((i) => (
              <FormField
                key={i}
                control={form.control}
                name={`range.${i}`}
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input placeholder="Enter Range" {...field} className="h-[48px]" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            ))}
          </div>
        </div>

        {/* RULES */}
        <FormField
          control={form.control}
          name="rules"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-lg font-medium mb-4">Rules Text</FormLabel>
              <FormControl>
                <QuillEditor
                  id="rules"
                  value={field.value}
                  onChange={field.onChange}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* BUTTONS */}
        {/* <div className="flex justify-end gap-4">
          <Button type="submit" disabled={isPending}>
            {isPending ? "Saving..." : "Save"}
          </Button>
        </div> */}

         {/* Buttons */}
           <div className="flex justify-end gap-6 pt-6">
             <Button
              type="button"
              variant="outline"
              onClick={() => form.reset()}
              className="h-[49px] text-[#F2415A] text-lg font-medium leading-[150%] border-[1px] border-[#F2415A] rounded-[8px] py-3 px-16"
            >
              Cancel
            </Button>
            <Button
              disabled={isPending}
              type="submit"
              className="h-[49px] bg-gradient-to-b from-[#DF1020] to-[#310000]
                hover:from-[#310000] hover:to-[#DF1020]
                transition-all duration-300 text-[#F7F8FA] font-bold text-lg leading-[120%] rounded-[8px] px-20"
            >
              {isPending ? "Saving..." : "Add"}
            </Button>
          </div>

      </form>
    </Form>
  )
}

export default TournamentRulesPage
