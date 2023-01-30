import { useRouter } from "next/router"
import { FC, useEffect } from "react"
import { context } from "../../store"

const CreatePage: FC = () => {
  const ctx = context()
  const router = useRouter()

  const isEditMode = router.asPath.includes("edit")

  const slugListener = () => {
    console.log(ctx.state.currentSlug)
  }

  useEffect(slugListener, [ctx.state.currentSlug])

  return (
    <div>
      {isEditMode ? 'Edit Page' : 'Create Page'}
      <div>open console to see active slug value</div>
    </div>
  )
}

export default CreatePage