import { Token } from "../models/token.model";

const lastState = new Map<string, Token>();

export function getLastToken(address: string) {
  return lastState.get(address);
}

export function setLastToken(token: Token) {
  lastState.set(token.address, token);
}
