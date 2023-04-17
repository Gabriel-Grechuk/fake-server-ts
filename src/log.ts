export function info(...messages: any) {
  console.log("[ %cINFO", "color: green", "]", ...messages);
}
export function warning(...messages: any) {
  console.log("[ %cWARNING", "color: orange", "]", ...messages);
}

export function error(...messages: any) {
  console.log("[ %cERROR", "color: red", "]", ...messages);
}
