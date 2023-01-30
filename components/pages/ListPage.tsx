import { useRouter } from "next/router";
import { FC } from "react";

const ListPage: FC = () => {
  const router = useRouter()

  return (
    <div>
      <div style={{display:'flex', flexDirection:'row', justifyContent: 'space-between'}}>
        <span>ListPage</span>
        <button onClick={()=>router.push("/dashboard/master-data/create")}>create item</button>
      </div>
      <table style={{border: '1px solid black'}}>
        <thead>
          <tr>
            <td>name</td>
            <td colSpan={2}>action</td>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Detail 1</td>
            <td><button onClick={()=>router.push("/dashboard/master-data/1/detail")}>see detail</button></td>
            <td><button onClick={()=>router.push("/dashboard/master-data/1/edit")}>edit detail</button></td>
          </tr>
          <tr>
            <td>Detail 2</td>
            <td><button onClick={()=>router.push("/dashboard/master-data/2/detail")}>see detail</button></td>
            <td><button onClick={()=>router.push("/dashboard/master-data/2/edit")}>edit detail</button></td>
          </tr>
        </tbody>
      </table>
    </div>
  )
}

export default ListPage