function assert(b: boolean, msg: string) {
  if (!b) {
    throw new Error(msg);
  }
}

class UnexpectedFirstCharacter extends Error {
  constructor(token: Token) {
    super(`unexpected first character: ${token.value}`);
  }
}

type ParseFn = (tokens: Token[]) => unknown;

function parseString(tokens: Token[]): string {
  assert(
    tokens[0].type === "quotation-mark",
    "First token must be quotation-mark."
  );
  assert(
    tokens.slice(-1)[0].type === "quotation-mark",
    "Last token must be quotation-mark."
  );

  return tokens
    .slice(1, -1)
    .map(({ value: char }) => char)
    .join("");
}

function throwUnexpectedFirstTokenError(tokens: Token[]): never {
  throw new UnexpectedFirstCharacter(tokens[0]);
}

const firstTokenToParseFn = {
  "quotation-mark": parseString,
  value: throwUnexpectedFirstTokenError,
} as const satisfies {
  [k in TokenType]: ParseFn;
};

export function parse(s: string): unknown {
  if (s.length === 0) return "";

  const tokens = tokenize(s);
  const parseFn = firstTokenToParseFn[tokens[0].type];
  return parseFn(tokens);
}

type TokenType = "quotation-mark" | "value";

type Token = {
  type: TokenType;
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
