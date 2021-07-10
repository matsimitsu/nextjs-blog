import Appsignal from "@appsignal/javascript";

const appsignal = new Appsignal({
  key: "840e135a-2edf-47fe-9e5e-fa46aabf0c2c",
  uri: "https://error-tracker.staging.lol/collect",
  revision: process.env.VERCEL_GIT_COMMIT_SHA || process.env.NEXT_PUBLIC_VERCEL_GIT_COMMIT_SHA
});

export function monitorWithAppSignal(func, req, res) {
  const span = appsignal.createSpan((span) => {
    span.setAction(req.headers["x-matched-path"])
    span.setNamespace("functions")
    span.setParams(req.query)
    return span
  })
  try{
    func(req, res, span)
  } catch(error) {
    span.setError(error)
    appsignal.send(span)
    throw (error)
  }
}

export default appsignal
