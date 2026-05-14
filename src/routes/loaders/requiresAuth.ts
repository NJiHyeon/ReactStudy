interface Context {
  request: Request
}

export async function requiresAuth({ request }: Context) {
  request.url //http:://localhost.5175/movies
}
