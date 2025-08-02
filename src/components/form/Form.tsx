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
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useEventContext } from "../../Context/EventContext";

type FormValues = {
  title: string;
  description: string;
  location: string;
  date: string;
  organizer: string;
};

const Form: React.FC = () => {
  const { id: editId } = useParams();
  const { state } = useLocation();
  const { addEvent, events, updateEvent } = useEventContext();

  const navigate = useNavigate();
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
      date: editId ? state.event?.date : "",
      description: editId ? state.event?.description : "",
      location: editId ? state.event?.location : "",
      organizer: editId ? state.event?.organizer : "",
      title: editId ? state.event?.title : "",
      category: editId ? state.event?.category : "",
    },
  });

  const onSubmit = (data: FormValues) => {
    if (!editId) {
      const newEvent = {
        ...data,
        id: Date.now(), // use a number for id
      };

      addEvent(newEvent);
      navigate("/");
    } else {
      const updatedEvent = {
        ...data,
        id: editId,
      };

      updateEvent(updatedEvent);
      navigate("/");
    }
  };

  const handleCancelEvent = () => {
    reset();
    navigate("/");
  };
  const options = [
    { label: "Apple", value: "apple" },
    { label: "Banana", value: "banana" },
    { label: "Cherry", value: "cherry" },
  ];
  return (
    <div className="flex justify-center flex-col gap-2 items-center mt-6">
      <div className="min-w-[33vw] bg-white shadow-xl rounded-2xl ">
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
                name="category"
                control={control}
                rules={{ required: "Category is required" }}
                render={({ field, fieldState }) => (
                  <SelectField
                    label="Choose a Category"
                    name={field?.name}
                    value={field?.value}
                    onChange={field?.onChange}
                    onBlur={field?.onBlur}
                    options={options}
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

            <div className="grid grid-cols-2 gap-6 mb-6">
              <Button
                label={`${editId ? "Update" : "Add"} Event`}
                className="bg-purple-500"
                type="submit"
              />
              <Button label="Clear" onClick={handleCancelEvent} />
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Form;
