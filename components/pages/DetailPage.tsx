import { useRouter } from "next/router";
import { FC, useEffect } from "react";
import { context } from "../../store";

const DetailPage: FC = () => {
  const ctx = context()
  const router = useRouter()

  const slugListener = () => {
    console.log(ctx.state.currentSlug)
  }

  useEffect(slugListener, [ctx.state.currentSlug])
  return (
    <div>
      DetailPage
      <div>open console to see active slug value</div>
    </div>
  )
}

export default DetailPage