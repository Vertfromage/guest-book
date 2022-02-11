import { context } from 'near-sdk-core';
import { PostedMessage, messages, users } from './model';

// --- contract code goes below

// The maximum number of latest messages the contract returns.
const MESSAGE_LIMIT = 10;

/**
 * Adds a new message under the name of the sender's account id.\
 * NOTE: This is a change method. Which means it will modify the state.\
 * But right now we don't distinguish them with annotations yet.
 */
export function addMessage(text: string): void {
  // Checking if user has already posted a message
  if(!users.has(context.sender)){
  // Creating a new message and populating fields with our data
  const message = new PostedMessage(text);
  // Adding the message to end of the the persistent collection
  messages.push(message);
  users.add(context.sender);
  }
}

/**
 * Returns an array of last N messages.\
 * NOTE: This is a view method. Which means it should NOT modify the state.
 * NOTE: Sorted by most recent first.
 */
export function getMessages(): PostedMessage[] {
  const numMessages = min(MESSAGE_LIMIT, messages.length);
  const startIndex = messages.length-1;
  const result = new Array<PostedMessage>(numMessages);
  for(let i = 0; i < numMessages; i++) {
    result[i] = messages[startIndex-i];
  }
  return result;
}
