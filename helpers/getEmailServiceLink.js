function getEmailServiceLink(env) {
  switch (env) {
    case "development":
      return "http://localhost:3000/"

    case "test":
      return "http://localhost:5000/"

    case "production":
      return "http://herocu/"

    default:
      return "http://localhost:3000/"
  }
}

export default getEmailServiceLink
