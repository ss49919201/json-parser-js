export function parse(s: string): unknown {
  const tokens = tokenize(s);

  let state;
  let value = "";
  for (const token of tokens) {
    s: switch (token.type) {
      case "quotation-mark":
        if (state === "start-string") {
          return value;
        }

        state = "start-string";
        break s;
      case "value":
        value += token.value;
        break s;
    }
  }
}

type Token = {
  type: "quotation-mark" | "value";
  value: string;
};

function tokenize(s: string): Token[] {
  const chars = s.split("");

  return chars.map((char) => {
    switch (char) {
      case `"`:
        return {
          type: "quotation-mark",
          value: `"`,
        };
      default:
        return {
          type: "value",
          value: char,
        };
    }
  });
}
