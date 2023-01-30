import { NextPage } from "next"
import { useRouter } from "next/router"
import dashboardRoutes, { DashboardRoute, Roles } from "../../routes"
import { ParsedUrlQuery } from 'querystring'
import { useEffect, useMemo } from "react"
import { context } from "../../store"

const Dashboard: NextPage = () => {
  const ctx = context()
  const router = useRouter()

  // getting role from decrypt jwt
  const currentRole = Roles.ADMIN

  // this directory
  const parentSlug = "/dashboard"

  const routeArr = router.asPath.split('/').filter(path => path)

  const leftSidebarRenderer = (routes: Array<DashboardRoute>) => {
    const redirectToPage = (route: DashboardRoute) => {
      router.push(parentSlug + route.url)
    }
    const listItemRenderer = (route: DashboardRoute,index: number) => {
      if(route.isSidebarRendered && route.roles.find(role => role === currentRole)) return (
        <li key={index}>
          <button onClick={()=>redirectToPage(route)}>{route.title}</button>
          {route.childrens && leftSidebarRenderer(route.childrens)}
        </li>
      )
    }
    return (
      <ul>
        {routes.map((route,index) => listItemRenderer(route,index))}
      </ul>
    )
  }

  const findSelectedMenu = () => {
    let tempMenus: Array<DashboardRoute> = []

    const recursiveFunc = (menus: Array<DashboardRoute>, parentUrl?: string) => {
      menus.forEach(menu => {
        tempMenus.push({
          ...menu,
          parentUrl
        })
        if(menu.childrens && menu.childrens.length > 0) recursiveFunc(menu.childrens, parentSlug + menu.url)
      })
    }
    recursiveFunc(dashboardRoutes)

    tempMenus = tempMenus.sort((a,b)=>{
      if(a>b) return 1
      else return -1
    })

    return tempMenus.find((menu) => {
      const splitUrl = (parentSlug + menu.url)
        .split('/')
        .filter(u => u)
      const isMatch = splitUrl.every((u, index) => {
        if(u.includes(":")) return true
        else return u === routeArr[index]
      })
      
      if(routeArr.length === splitUrl.length && isMatch && menu.roles.find(role => role === currentRole)) return true
      else return false
    })
  }

  const routeSelected = useMemo(()=>findSelectedMenu(), [router.asPath])

  const routeSelectedListener = () => {
    if(routeSelected) {
      let slug: ParsedUrlQuery = {}

      const selectedArr = (parentSlug + routeSelected.url).split('/').filter(u => u)

      selectedArr.forEach((selected, index) => {
        if(selected.includes(":")) slug = {...slug, [selected.replace(/\:/g,"")]: routeArr[index]}
      })

      ctx.dispatch({
        currentSlug: slug
      })
    }
    else ctx.dispatch({
      currentSlug: undefined
    })
  }

  useEffect(routeSelectedListener, [routeSelected])

  return (
    <div style={{display:'flex', flexDirection: 'row'}}>
      {/* LEFT SIDEBAR */}
      {leftSidebarRenderer(dashboardRoutes)}
      {/* CONTENT */}
      <div style={{padding: 10}}>
        {routeSelected?.component || "404 Not Found!"}
      </div>
    </div>
  )
}

export default Dashboard