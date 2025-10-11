import { FormEventHandler } from "react"


const url = "http://localhost:8081/images/upload"

interface ImageUploadProps {
    allowMultiple: boolean
}

export function ImageUpload({
    allowMultiple = false
}: ImageUploadProps) {

    async function handleSubmit(e ) {
        //e.preventDefault()
        return

        const formData = new FormData(e.target)
        const imageFiles = formData.get("images")

        const headers = new Headers({
            'Content-type': 'multipart/form-data'
        })

        const res = await fetch(url, {
            method: "POST",
            headers,
            body: imageFiles,
            
        })


    }

    return (
        <>
        {/* <form method="post" onSubmit={handleSubmit} encType="multipart/form-data"> */}
        <form method="post" action={url} onSubmit={handleSubmit} encType="multipart/form-data">

        <label htmlFor="rb-upload">Upload some images</label>
        <input id="rb-upload" type="file" name="images" accept="image/png image/jpeg" multiple={allowMultiple}/>
        <button>Submit</button>
        </form>
        </>

    )
}

