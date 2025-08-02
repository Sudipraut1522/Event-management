// src/components/form/Form.tsx
import React from "react";
import { Controller, useForm } from "react-hook-form";
import { Calendar } from "lucide-react";
import { InputField } from "../ui/InputField";
import { Button } from "../ui/Button";
import { zodResolver } from "@hookform/resolvers/zod";
import { eventSchema } from "../../Schema/EventFormSchema";
import Textarea from "../ui/TextArea";
import { SelectField } from "../ui/SelectField";

type FormValues = {
  title: string;
  description: string;
  location: string;
  date: string;
  organizer: string;
};

const Form: React.FC = () => {
  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = useForm<FormValues>({
    mode: "onChange",
    resolver: zodResolver(eventSchema),
    defaultValues: {
      date: "",
      description: "",
      location: "",
      organizer: "",
      title: "",
    },
  });

  const onSubmit = (data: FormValues) => {
    console.log("Form Submitted:", data);

    const existingEvents = JSON.parse(localStorage?.getItem("events") || "[]");
    const newEvent = {
      ...data,
      id: Date.now(),
    };
    const updatedEvents = [...existingEvents, newEvent];
    localStorage.setItem("events", JSON.stringify(updatedEvents));
    reset();
  };

  const handleCancelEvent = () => {
    reset();
  };
  const options = [
    { label: "Apple", value: "apple" },
    { label: "Banana", value: "banana" },
    { label: "Cherry", value: "cherry" },
  ];
  return (
    <div className="flex justify-center flex-col gap-2 items-center mt-6">
      <div className="min-w-[33vw] bg-white shadow-xl py-4">
        <div className="flex justify-center gap-2 bg-purple-500 py-4 rounded-md">
          <Calendar className="text-white" />
          <h1 className="text-lg font-semibold text-white">Create New Event</h1>
        </div>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flex flex-col gap-3 px-8 mt-4">
            <InputField
              label="Event Title"
              name="title"
              register={register}
              placeholder="Enter event title"
              error={errors?.title?.message}
            />
            <Textarea
              label="Event Description"
              name="description"
              register={register}
              placeholder="Enter event description"
              error={errors?.description?.message}
              rows={2}
            />
            <div className="grid grid-rows-3 gap-4">
              <InputField
                label="Location"
                name="location"
                register={register}
                placeholder="Enter event location"
                error={errors?.location?.message}
              />
              <InputField
                label="Date"
                name="date"
                type="date"
                register={register}
                placeholder="Select date"
                error={errors?.date?.message}
              />
              <Controller
                name="fruit"
                control={control}
                rules={{ required: "Fruit is required" }}
                render={({ field, fieldState }) => (
                  <SelectField
                    label="Choose a fruit"
                    name={field?.name}
                    value={field?.value}
                    onChange={field?.onChange}
                    onBlur={field?.onBlur}
                    options={options}
                    error={fieldState.error?.message}
                  />
                )}
              />

              <InputField
                label="Organizer"
                name="organizer"
                register={register}
                placeholder="Enter organizer's name"
                error={errors?.organizer?.message}
              />
            </div>

            <div className="grid grid-cols-2 gap-6 mb-2">
              <Button
                label="Create Event"
                className="bg-purple-500"
                type="submit"
              />
              <Button label="Cancel Event" onClick={handleCancelEvent} />
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Form;
