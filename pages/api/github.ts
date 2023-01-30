import { Octokit } from "@octokit/core"
import type { NextApiRequest, NextApiResponse } from 'next'

type Data = {
  name: string
}

// export default function handler(
//   req: NextApiRequest,
//   res: NextApiResponse<Data>
// ) {
//   res.status(200).json({ name: 'John Doe' })
// }

export default async (req: NextApiRequest, res: NextApiResponse) => {
    const octokit = new Octokit({ auth: process.env.GITHUB_AUTH_TOKEN });

    const user = await octokit.request("GET /search/repositories?q=ardiansyah&sort=repositories&order=desc&per_page=15&page=1", {})

    res.status(200).json(user.data)
}
