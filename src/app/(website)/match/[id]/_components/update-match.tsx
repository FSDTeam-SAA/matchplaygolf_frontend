"use client";

import React, { useState, useEffect } from "react";
import { useParams, useSearchParams } from "next/navigation";
import { X, Upload } from "lucide-react";
import { toast } from "sonner";
import Image from "next/image";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Skeleton } from "@/components/ui/skeleton";

// Validation schema
const matchUpdateSchema = z.object({
  winner: z.string().min(1, "Please select a winner"),
  player1Score: z.string().min(1, "Score is required"),
  player2Score: z.string().min(1, "Score is required"),
  venue: z.string().optional(),
  date: z.string().optional(),
  comments: z.string().optional(),
});

type MatchUpdateFormValues = z.infer<typeof matchUpdateSchema>;

interface Player {
  _id: string;
  fullName: string;
  email: string;
  profileImage?: string;
}

interface Match {
  _id: string;
  player1Id: Player;
  player2Id: Player;
  player1Score?: number;
  player2Score?: number;
  date?: string;
  winner?: string | null;
  venue?: string;
  comments?: string;
  matchPhoto?: string[];
}

const UpdateMatch = () => {
  const searchParams = useSearchParams();
  const token = searchParams.get("token") || "";
  const { id } = useParams();
  const queryClient = useQueryClient();

  const [photos, setPhotos] = useState<File[]>([]);
  const [photoPreviews, setPhotoPreviews] = useState<string[]>([]);
  const [existingPhotos, setExistingPhotos] = useState<string[]>([]);

  // Fetch match data with TanStack Query
  const { data: match, isLoading } = useQuery({
    queryKey: ["match", id],
    queryFn: async () => {
      if (!id || !token) throw new Error("Missing credentials");

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/match/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!res.ok) {
        const error = await res.json();
        throw new Error(error?.message || "Failed to fetch match");
      }

      return res.json() as Promise<{ data: Match }>;
    },
    enabled: !!id && !!token,
  });

  // Initialize form with react-hook-form
  const form = useForm<MatchUpdateFormValues>({
    resolver: zodResolver(matchUpdateSchema),
    defaultValues: {
      winner: "",
      player1Score: "",
      player2Score: "",
      venue: "",
      comments: "",
      date: "",
    },
  });

  // Update form when match data is loaded
  useEffect(() => {
    if (match?.data) {
      const matchData = match.data;
      form.reset({
        winner: matchData.winner || "",
        player1Score: matchData.player1Score?.toString() || "",
        player2Score: matchData.player2Score?.toString() || "",
        venue: matchData.venue || "",
        comments: matchData.comments || "",
        date: matchData.date
          ? new Date(matchData.date).toISOString().slice(0, 16)
          : "",
      });
      setExistingPhotos(matchData.matchPhoto || []);
    }
  }, [match, form]);

  // Update match mutation with TanStack Query
  const updateMatchMutation = useMutation({
    mutationFn: async (formData: FormData) => {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/match/${id}`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: formData,
        }
      );

      const data = await res.json();
      if (!res.ok) throw new Error(data?.message || "Failed to update match");
      return data;
    },
    onSuccess: () => {
      toast.success("Match result saved successfully!");

      // Invalidate relevant queries
      queryClient.invalidateQueries({ queryKey: ["match", id] });
      queryClient.invalidateQueries({ queryKey: ["tournaments"] });

      // Reset form and photos
      form.reset();
      setPhotos([]);
      setPhotoPreviews([]);
      setExistingPhotos([]);
    },
    onError: (error: Error) => {
      toast.error(error.message || "Something went wrong");
    },
  });

  // Handle file uploads
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (files.length > 0) addPhotos(files);
  };

  const addPhotos = (newFiles: File[]) => {
    const validFiles = newFiles.filter((file) =>
      file.type.startsWith("image/")
    );
    setPhotos((prev) => [...prev, ...validFiles]);

    validFiles.forEach((file) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPhotoPreviews((prev) => [...prev, reader.result as string]);
      };
      reader.readAsDataURL(file);
    });
  };

  const removePhoto = (index: number) => {
    setPhotos((prev) => prev.filter((_, i) => i !== index));
    setPhotoPreviews((prev) => prev.filter((_, i) => i !== index));
  };

  const removeExistingPhoto = (index: number) => {
    setExistingPhotos((prev) => prev.filter((_, i) => i !== index));
  };

  const handleDragOver = (e: React.DragEvent) => e.preventDefault();
  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const files = Array.from(e.dataTransfer.files).filter((file) =>
      file.type.startsWith("image/")
    );
    if (files.length > 0) addPhotos(files);
  };

  // Form submission handler
  const onSubmit = (values: MatchUpdateFormValues) => {
    if (!match?.data) {
      toast.error("Match information missing");
      return;
    }

    const matchData = match.data;

    // Score validation
    const score1 = parseInt(values.player1Score);
    const score2 = parseInt(values.player2Score);

    if (values.winner === matchData.player1Id._id && score1 <= score2) {
      toast.error("Winner score must be higher than opponent");
      return;
    }

    if (values.winner === matchData.player2Id._id && score2 <= score1) {
      toast.error("Winner score must be higher than opponent");
      return;
    }

    // Prepare FormData
    const formData = new FormData();
    formData.append("player1Score", values.player1Score);
    formData.append("player2Score", values.player2Score);
    formData.append("winner", values.winner);
    formData.append("status", "completed");

    if (values.venue) formData.append("venue", values.venue);
    if (values.date)
      formData.append("date", new Date(values.date).toISOString());
    if (values.comments) formData.append("comments", values.comments);

    photos.forEach((photo) => formData.append("matchPhotos", photo));

    if (existingPhotos.length > 0) {
      formData.append("existingPhotos", JSON.stringify(existingPhotos));
    }

    updateMatchMutation.mutate(formData);
  };

  if (isLoading) {
    return (
      <div className="p-8 max-w-3xl mx-auto">
        <Skeleton className="h-12 w-64 mb-8 mx-auto" />
        <div className="space-y-6">
          <Skeleton className="h-32 w-full" />
          <Skeleton className="h-32 w-full" />
          <Skeleton className="h-32 w-full" />
        </div>
      </div>
    );
  }

  const matchData = match?.data;

  return (
    <div className="p-8 max-w-3xl mx-auto">
      <Card>
        <CardHeader>
          <CardTitle className="text-3xl font-bold text-center">
            Update Match Result
          </CardTitle>
          <CardDescription className="text-center">
            Update the match details between {matchData?.player1Id?.fullName}{" "}
            and {matchData?.player2Id?.fullName}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              {/* Winner Selection - Fixed RadioGroup */}
              <FormField
                control={form.control}
                name="winner"
                render={({ field }) => (
                  <FormItem className="space-y-3">
                    <FormLabel>Select Winner *</FormLabel>
                    <FormControl>
                      <RadioGroup
                        onValueChange={field.onChange}
                        value={field.value}
                        className="grid grid-cols-1 md:grid-cols-2 gap-4"
                      >
                        {[matchData?.player1Id, matchData?.player2Id].map(
                          (player) => (
                            <FormItem
                              key={player?._id}
                              className="flex items-center space-x-3 space-y-0"
                            >
                              <FormControl>
                                <RadioGroupItem value={player?._id || ""} />
                              </FormControl>
                              <FormLabel className="font-normal cursor-pointer flex-1">
                                <div className="p-4 border-2 rounded-lg hover:bg-accent transition-all data-[state=checked]:border-primary data-[state=checked]:bg-primary/5">
                                  <div>
                                    <span>{player?.fullName}</span>
                                  </div>
                                </div>
                              </FormLabel>
                            </FormItem>
                          )
                        )}
                      </RadioGroup>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Scores */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="player1Score"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        {matchData?.player1Id?.fullName} Score *
                      </FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          min={0}
                          {...field}
                          className="text-center"
                          placeholder="Score"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="player2Score"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        {matchData?.player2Id?.fullName} Score *
                      </FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          min={0}
                          {...field}
                          className="text-center"
                          placeholder="Score"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {/* Location & Date */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="venue"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Location</FormLabel>
                      <FormControl>
                        <Input placeholder="Match venue" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="date"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Date & Time</FormLabel>
                      <FormControl>
                        <Input type="datetime-local" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {/* Comments */}
              <FormField
                control={form.control}
                name="comments"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Match Comments</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Share match highlights and moments..."
                        rows={3}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Photos Section */}
              <div>
                {/* Existing Photos */}
                {existingPhotos.length > 0 && (
                  <div className="mb-6">
                    <h1>Existing Photos</h1>
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 mt-2">
                      {existingPhotos.map((photo, idx) => (
                        <div key={idx} className="relative group">
                          <div className="aspect-square relative overflow-hidden rounded-lg">
                            <Image
                              src={photo}
                              alt={`Existing ${idx + 1}`}
                              fill
                              className="object-cover"
                              sizes="(max-width: 768px) 50vw, 33vw"
                            />
                          </div>
                          <Button
                            type="button"
                            size="icon"
                            variant="destructive"
                            className="absolute top-2 right-2 size-6 opacity-0 group-hover:opacity-100 transition-opacity"
                            onClick={() => removeExistingPhoto(idx)}
                          >
                            <X size={14} />
                          </Button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* New Photos */}
                <div className="mb-6">
                  <h1>New Photos</h1>
                  {photoPreviews.length > 0 && (
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 mt-2 mb-4">
                      {photoPreviews.map((preview, idx) => (
                        <div key={idx} className="relative group">
                          <div className="aspect-square relative overflow-hidden rounded-lg">
                            <Image
                              src={preview}
                              alt={`Preview ${idx + 1}`}
                              fill
                              className="object-cover"
                              sizes="(max-width: 768px) 50vw, 33vw"
                            />
                          </div>
                          <Button
                            type="button"
                            size="icon"
                            variant="destructive"
                            className="absolute top-2 right-2 size-6 opacity-0 group-hover:opacity-100 transition-opacity"
                            onClick={() => removePhoto(idx)}
                          >
                            <X size={14} />
                          </Button>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* File Upload Area */}
                  <div
                    onDragOver={handleDragOver}
                    onDrop={handleDrop}
                    className="border-2 border-dashed rounded-lg p-8 text-center hover:border-primary transition-colors cursor-pointer"
                  >
                    <Upload
                      className="mx-auto text-muted-foreground mb-3"
                      size={40}
                    />
                    <p className="mb-2">
                      Drag & drop files here or click to browse
                    </p>
                    <input
                      type="file"
                      multiple
                      accept="image/*"
                      className="hidden"
                      id="photos-upload"
                      onChange={handleFileChange}
                    />
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() =>
                        document.getElementById("photos-upload")?.click()
                      }
                    >
                      Browse Files
                    </Button>
                    {photoPreviews.length > 0 && (
                      <p className="mt-3 text-sm text-muted-foreground">
                        {photoPreviews.length} new photo(s) selected
                      </p>
                    )}
                  </div>
                </div>
              </div>

              {/* Submit Button */}
              <Button
                type="submit"
                className="w-full"
                size="lg"
                disabled={updateMatchMutation.isPending}
              >
                {updateMatchMutation.isPending ? (
                  <>
                    <span className="animate-spin mr-2">⟳</span>
                    Saving...
                  </>
                ) : (
                  "Save Match Result"
                )}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
};

export default UpdateMatch;
