export const TOOLS_CONFIG = [
  {
    type: "function",
    function: {
      description: "Get the current weather in a given location.",
      name: "get_weather",
      parameters: {
        type: "object",
        properties: {
          location: {
            type: "string",
            description: "The city and department, e.g. Marseille, 13",
          },
          unit: {
            type: "string",
            enum: ["celsius", "fahrenheit"],
          },
        },
        required: ["location"],
      },
    },
  },
]

function get_weather({ location, unit = "celsius" }: { location: string; unit: "celsius" | "fahrenheit" }) {
  console.log(location, unit)
  return { temperature: 21.6 }
}

export const TOOLS_MAPPING = { get_weather: get_weather }
