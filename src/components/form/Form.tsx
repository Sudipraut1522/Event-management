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
import { toast } from "react-toastify";

type FormValues = {
  title: string;
  description: string;
  venue: string;
  date: string;
  organizer: string;
  category: string;
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
      venue: editId ? state.event?.venue : "",
      organizer: editId ? state.event?.organizer : "",
      title: editId ? state.event?.title : "",
      category: editId ? state.event?.category : "",
    },
  });

  const onSubmit = (data: FormValues) => {
    const isConflict = events.some(
      (event) =>
        event?.venue === data.venue &&
        event?.date.slice(0, 10) === data.date.slice(0, 10) &&
        event?.id !== Number(editId)
    );
    console.log(data.date.slice(0, 10), data.venue, "isConflict");

    if (isConflict) {
      toast.error(
        "Another event is already scheduled at this location and date."
      );
      return; // stop submission
    }

    if (!editId) {
      const newEvent = {
        ...data,
        id: Date.now(),
      };

      addEvent(newEvent);
      toast.success("Event Added Successfully");
      navigate("/");
    } else {
      const updatedEvent = {
        ...data,
        id: Number(editId),
      };

      updateEvent(updatedEvent);
      toast.success("Event Updated Successfully");
      navigate("/");
    }
  };

  const handleCancelEvent = () => {
    reset();
  };
  const options = [
    { label: "Meeting", value: "meeting" },
    { label: "Conference", value: "Conference" },
    { label: "WorkShop", value: "WorkShop" },
  ];

  function getMinDateTime() {
    const now = new Date();
    const pad = (n: number) => String(n).padStart(2, "0");

    return `${now.getFullYear()}-${pad(now.getMonth() + 1)}-${pad(
      now.getDate()
    )}T${pad(now.getHours())}:${pad(now.getMinutes())}`;
  }

  return (
    <div className="flex justify-center flex-col gap-2 items-center mt-6">
      <div className="min-w-[33vw] bg-white shadow-xl rounded-2xl ">
        <div className="flex justify-center gap-2 bg-purple-500 py-4 rounded-md">
          <Calendar className="text-white" />
          <h1 className="text-lg font-semibold text-white">
            {editId ? "Update " : "Create"}Event
          </h1>
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
                label="Venue"
                name="venue"
                register={register}
                placeholder="Enter event Venue"
                error={errors?.venue?.message}
              />
              <InputField
                label="Date & Time"
                name="date"
                type="datetime-local"
                register={register}
                placeholder="Select date and time"
                error={errors?.date?.message}
                min={getMinDateTime()}
              />

              <Controller
                name="category"
                control={control}
                rules={{ required: "Category is required" }}
                render={({ field }) => (
                  <SelectField
                    label="Choose a Category"
                    name={field?.name}
                    value={field?.value}
                    onChange={field?.onChange}
                    onBlur={field?.onBlur}
                    options={options}
                    error={errors?.category?.message}
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
