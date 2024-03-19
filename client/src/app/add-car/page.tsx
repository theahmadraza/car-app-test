"use client";
import { useState, useEffect } from "react";
import { ChangeEvent } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import { PhotoIcon, XCircleIcon } from "@heroicons/react/24/solid";
import ProtectedRoute from "@/components/ProtectedRoutes";

import { Formik, Form, Field, ErrorMessage, FormikHelpers } from "formik";
import * as Yup from "yup";

interface FormValues {
  carModel: string;
  price: number;
  phoneNumber: string;
  city: string;
  maxPictures: number;
  pictures: File[];
}

const initialValues: FormValues = {
  carModel: "",
  price: 0,
  phoneNumber: "",
  city: "",
  maxPictures: 1,
  pictures: [],
};

const CarInformationValidationSchema = Yup.object({
  carModel: Yup.string()
    .min(3, "Must be at least 3 characters")
    .required("Required"),
  price: Yup.number().min(0, "Must be a positive number").required("Required"),
  phoneNumber: Yup.string()
    .matches(/^\d{11}$/, "Must be exactly 11 digits")
    .required("Required"),
  city: Yup.string().required("Required"),
  maxPictures: Yup.number()
    .min(1, "Must be at least 1")
    .max(10, "Cannot exceed 10")
    .required("Required"),
  pictures: Yup.array().max(
    initialValues.maxPictures,
    `You can upload maximum of ${initialValues.maxPictures} pictures`
  ),
});

export default function AddCar() {
  const [files, setFiles] = useState<File[]>([]);
  const [imagePreview, setImagePreview] = useState<string[]>([]);

  const handleImageUpload = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (e.target.files && e.target.files.length > 0) {
      const fileReader = new FileReader();
      let file = e.target.files[0];
      const copyFileImage = [...files];
      copyFileImage.push(e.target.files[0]);
      setFiles(copyFileImage);
      fileReader.onloadend = () => {
        if (fileReader.result && typeof fileReader.result === "string") {
          const copyImagePreview = [...imagePreview];
          copyImagePreview.push(fileReader.result);

          setImagePreview(copyImagePreview);
        }
      };

      fileReader.readAsDataURL(file);
    }
  };

  function deleteFile(index: number) {
    const filteredImagePreview = imagePreview.filter((_, idx) => idx !== index);
    const filteredFiles = files.filter((_, idx) => idx !== index);
    setImagePreview(filteredImagePreview);
    setFiles(filteredFiles);
  }

  const onSubmit = async (
    values: FormValues,
    { resetForm }: FormikHelpers<FormValues>
  ) => {
    const { carModel, price, phoneNumber, city, maxPictures } = values;

    let formData = new FormData();

    [...files].forEach((image) => {
      formData.append("pictures", image);
    });
    let userInfo;
    if (typeof window !== "undefined") {
      const userInfoString = localStorage.getItem("user");
       userInfo = userInfoString ? JSON.parse(userInfoString) : null;
    }
    formData.append("userId", userInfo?.userId);
    formData.append("carModel", carModel);
    formData.append("price", price.toString());
    formData.append("phoneNumber", phoneNumber);
    formData.append("city", city);
    formData.append("maxPictures", maxPictures.toString());

    try {
      const url = `https://car-app-test-backend.vercel.app/product/add-product`;

      const data = await axios.post(url, formData, {
        headers: {
          authorization: `Bearer ${userInfo.token}`,
          "Content-Type": "multipart/form-data",
        },
      });
      toast.success("Car Information added Successfully!");
    } catch (err: any) {
      toast.error("Car Information not Saved");
    }

    resetForm();
    setFiles([]);
    setImagePreview([]);
  };

  return (
    <ProtectedRoute>
      <div className="flex flex-1 flex-col items-center justify-center px-6 py-12 lg:px-8">
        <Formik
          initialValues={initialValues}
          validationSchema={CarInformationValidationSchema}
          onSubmit={onSubmit}
        >
          {({ values }) => (
            <Form className=" w-8/12">
              <div className="space-y-12">
                <div className="border-b border-white/10 pb-12">
                  <h2 className="text-base font-semibold leading-7 text-white">
                    Add Car Information
                  </h2>
                  <div className="border-b border-white/10 pb-12">
                    <div className="mt-10 grid gap-x-6 gap-y-8 grid-cols-12">
                      <div className="sm:col-span-6">
                        <label
                          htmlFor="price"
                          className="block text-sm font-medium leading-6 text-white"
                        >
                          Price
                        </label>
                        <div className="mt-2">
                          <Field
                            className="block w-full px-2 rounded-md border-0 bg-white/5 py-1.5 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"
                            id="price"
                            name="price"
                          />
                          <ErrorMessage
                            className="text-xs text-red-600 mt-1"
                            name="price"
                            component="div"
                          />
                        </div>
                      </div>

                      <div className="col-span-6">
                        <label
                          htmlFor="carModel"
                          className="block text-sm font-medium leading-6 text-white"
                        >
                          Model
                        </label>
                        <div className="mt-2">
                          <Field
                            type="text"
                            id="carModel"
                            name="carModel"
                            className="block w-full px-2 rounded-md border-0 bg-white/5 py-1.5 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"
                          />
                          <ErrorMessage
                            className="text-xs text-red-600 mt-1"
                            name="carModel"
                            component="div"
                          />
                        </div>
                      </div>

                      <div className="sm:col-span-6">
                        <label
                          htmlFor="email"
                          className="block text-sm font-medium leading-6 text-white"
                        >
                          Phone Number
                        </label>
                        <div className="mt-2">
                          <Field
                            className="block w-full px-2 rounded-md border-0 bg-white/5 py-1.5 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"
                            type="text"
                            id="phoneNumber"
                            name="phoneNumber"
                          />
                          <ErrorMessage
                            className="text-xs text-red-600 mt-1"
                            name="phoneNumber"
                            component="div"
                          />
                        </div>
                      </div>
                      <div className="col-span-6">
                        <label
                          htmlFor="city"
                          className="block text-sm font-medium leading-6 text-white"
                        >
                          City
                        </label>
                        <div className="mt-2">
                          <Field
                            className="block w-full px-2 rounded-md border-0 bg-white/5 py-1.5 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"
                            type="text"
                            id="city"
                            name="city"
                          />
                          <ErrorMessage
                            className="text-xs text-red-600 mt-1"
                            name="city"
                            component="div"
                          />
                        </div>
                      </div>
                      <div className="col-span-12">
                        <label
                          htmlFor="country"
                          className="block text-sm font-medium leading-6 text-white"
                        >
                          Select Number of Pictures
                        </label>
                        <div className="mt-2">
                          <Field
                            className="block w-full rounded-md border-0 bg-white/5 py-2.5 px-2 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6 [&_*]:text-black"
                            as="select"
                            id="maxPictures"
                            name="maxPictures"
                          >
                            {[...Array(10)].map((_, index) => (
                              <option key={index} value={index + 1}>
                                {index + 1}
                              </option>
                            ))}
                          </Field>
                          <ErrorMessage
                            className="text-xs text-red-600 mt-1"
                            name="maxPictures"
                            component="div"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="mt-10">
                    {imagePreview.length > 0 && (
                      <div className="flex flex-wrap justify-center gap-4 rounded-lg border border-dashed border-white/25 p-3">
                        {imagePreview.length > 0 &&
                          imagePreview.map((file, index) => {
                            return (
                              <div
                                className="flex rounded-lg border border-dashed border-white/25 p-1 w-24 h-auto relative"
                                key={index}
                              >
                                <img src={file} className="w-full max-w-none" />
                                <XCircleIcon
                                  className="mx-auto w-4 h-14 absolute right-[-10px] cursor-pointer top-[-28px] text-red-600"
                                  aria-hidden="true"
                                  onClick={() => deleteFile(index)}
                                />
                              </div>
                            );
                          })}
                      </div>
                    )}

                    <div className="col-span-full mt-4">
                      <label
                        htmlFor="cover-photo"
                        className="block text-sm font-medium leading-6 text-white"
                      >
                        Upload Car Pictures
                      </label>
                      <div className="">
                        <div className="text-center">
                          <div className="mt-4 flex items-center justify-center flex-col text-sm leading-6 text-gray-400">
                            <PhotoIcon
                              className="mx-auto h-12 w-12 text-gray-500"
                              aria-hidden="true"
                            />
                            <label
                              htmlFor="pictures"
                              className="relative cursor-pointer px-2 rounded-md bg-gray-900 font-semibold text-white focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 focus-within:ring-offset-gray-900 hover:text-indigo-500"
                            >
                              Upload File
                              <input
                                id="pictures"
                                name="pictures"
                                accept="image/*"
                                type="file"
                                disabled={values.maxPictures == files.length}
                                onChange={handleImageUpload}
                                className={`sr-only`}
                              />
                            </label>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-6 flex items-center justify-end gap-x-6">
                <button
                  type="submit"
                  className="rounded-md bg-indigo-500 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
                >
                  Save
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </ProtectedRoute>
  );
}
