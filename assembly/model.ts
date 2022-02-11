import { context, u128, PersistentVector, PersistentSet } from "near-sdk-as";

/** 
 * Exporting a new class PostedMessage so it can be used outside of this file.
 */
@nearBindgen
export class PostedMessage {
  premium: boolean;
  sender: string;
  time: string;
  constructor(public text: string) {
    this.time = new Date(context.blockTimestamp/1000000).toUTCString();
    this.premium = context.attachedDeposit >= u128.from('10000000000000000000000');
    this.sender = context.sender;
  }
}
/**
 * collections.vector is a persistent collection. Any changes to it will
 * be automatically saved in the storage.
 * The parameter to the constructor needs to be unique across a single contract.
 * It will be used as a prefix to all keys required to store data in the storage.
 */
export const messages = new PersistentVector<PostedMessage>("m");

// A list of users to see who has commented already.
export const users = new PersistentSet<String>("u");
