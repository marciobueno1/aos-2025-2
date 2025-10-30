console.log(
  "process.env.DEBUG_LOGS",
  process.env.DEBUG_LOGS,
  process.env.DEBUG_LOGS === "true"
);
// Overrides the console object to add a debug method that only logs when DEBUG_LOGS is true
if (process.env.DEBUG_LOGS === "true") {
  console.debug = (...args) => {
    console.log(...args);
  };
} else {
  console.debug = () => {};
}

console.log("console.debug in logger", console.debug);
