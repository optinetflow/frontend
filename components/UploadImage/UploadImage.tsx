/* eslint-disable tailwindcss/no-custom-classname */
import { ProcessServerConfigFunction } from "filepond"
import FilePondPluginFileValidateType from 'filepond-plugin-file-validate-type';
import FilePondPluginImageExifOrientation from "filepond-plugin-image-exif-orientation"
import FilePondPluginImagePreview from "filepond-plugin-image-preview"
import React, { forwardRef } from "react"
import { FilePond, FilePondProps, registerPlugin } from "react-filepond"

import { useUploadImageMutation } from "../../graphql/mutations/uploadImage.graphql.interface"

import "filepond/dist/filepond.min.css"

import "filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css"

// Register the plugins
registerPlugin(FilePondPluginImageExifOrientation, FilePondPluginImagePreview, FilePondPluginFileValidateType)

interface Props extends FilePondProps {
  id?: string;
  label?: string;
  onChange?: (data: string | undefined) => void; 
}
export const UploadImage = forwardRef<FilePond, Props>(({ onChange, label, id, ...props }, ref) => {
  const [uploadImage] = useUploadImageMutation();
  const process: ProcessServerConfigFunction = async (fieldName, file, metadata, load, error) => {
    try {
      const upload = await uploadImage({
        variables: {
          input: {
            image: file,
          },
        },
      })
      if (upload.data?.uploadImage) {
        load(upload.data.uploadImage)
        if (onChange) onChange(upload.data.uploadImage);
      }
      if (upload.errors?.[0]) {
        error(upload.errors[0].message);
      }
    } catch (err) {
      error(err as string)
    }
  }
  return (
    <FilePond
      id={id}
      ref={ref}
      className="upload-image"
      allowMultiple={false}
      server={{ process }}
      stylePanelAspectRatio="1:1"
      name="files"
      credits={false}
      acceptedFileTypes={["image/*"]}
      labelFileProcessing="درحال آپلود"
      labelFileProcessingComplete="آپلود شد"
      labelTapToUndo="بازگشت"
      labelTapToCancel="لغو"
      onupdatefiles={() => onChange && onChange(undefined)}
      labelIdle={`
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
          <path stroke-linecap="round" stroke-linejoin="round" d="M9 8.25H7.5a2.25 2.25 0 0 0-2.25 2.25v9a2.25 2.25 0 0 0 2.25 2.25h9a2.25 2.25 0 0 0 2.25-2.25v-9a2.25 2.25 0 0 0-2.25-2.25H15m0-3-3-3m0 0-3 3m3-3V15" />
        </svg>
        <div>${label || 'تصویر را وارد کنید'}</div>
      `}
      {...props}
    />
  )
});

UploadImage.displayName = 'UploadImage';

export default UploadImage
